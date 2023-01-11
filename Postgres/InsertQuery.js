const { config } = require('./Connect');

const pgp = require('pg-promise')({
    capSQL: true,
});

const pg = pgp(config);

const { selectCustomQuery } = require('./GetQuery');

const getPKeys = async (schema) => {
    const pKeys = await selectCustomQuery(`SELECT c.column_name, c.data_type
    FROM information_schema.table_constraints tc 
    JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_name) 
    JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema
      AND tc.table_name = c.table_name AND ccu.column_name = c.column_name
    WHERE constraint_type = 'PRIMARY KEY' and tc.table_name = $1`, [schema]);
    return {
        [schema]: pKeys.map((row) => row.column_name)
    }
};

const insertQuery = async (id, schema, fieldArray, values, upsert = false, consoleLog = false, pKeys = {}) => {
    let deadlocks = [];
    try {
        const cs = new pgp.helpers.ColumnSet(fieldArray, { table: schema });
        const formattedValues = values.map((row) => {
            const output = {};
            row.forEach((rowValue, index) => { output[fieldArray[index]] = rowValue; });
            return output;
        });
        let upsertString = '';
        if (upsert) {
            const usePKeys = await getPKeys(schema);
            const usePKey  = usePKeys[schema];
            upsertString   = (`ON CONFLICT (${usePKey.join(',')}) DO UPDATE SET ` + cs.assignColumns({ from: 'EXCLUDED', skip: usePKey }));
        }
        const query = pgp.helpers.insert(formattedValues, cs) + upsertString;
        await pg.none(query);
        consoleLog && console.log('INSERT: AWS RDS |', id, new Date());
    } catch (err) {
        console.log(err)
        process.env.ENVIRONMENT !== 'PROD' && console.log(err.message);
        if (!err.message) { return console.log('INSERT: AWS RDS |', id, new Date(), '| ERROR: Unknown error encountered'); }
        if (err.message.includes('deadlock detected')) {
            deadlocks.push(id);
            setTimeout(() => { insertQuery(id, schema, fieldArray, values, upsert, consoleLog) }, 10000);
        } else {
            console.log('INSERT: AWS RDS |', id, new Date(), '| ERROR:', err.message);
        }
    }
};

module.exports = { insertQuery };