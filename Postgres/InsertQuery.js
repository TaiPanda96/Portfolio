const { pgp } = require('./Connect');

const insertQuery = async (id, schema, fieldArray, values, upsert = false, consoleLog = false) => {
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
            const usePKeys = await getPKeys();
            const usePKey = usePKeys[schema];
            upsertString = (`ON CONFLICT ${usePKey} DO UPDATE SET ` + cs.assignColumns({ from: 'EXCLUDED', skip: usePKey }));
        }
        const query = pgp.helpers.insert(formattedValues, cs) + upsertString;
        await postgres.none(query);
        consoleLog && console.log('INSERT: AWS RDS |', id, new Date());
    } catch (err) {
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