const { pool } = require('./Connect');

const selectCustomQuery = (sqlStatement, variablesToPass = [] ) => new Promise((resolve, reject) => {
    const createSQL = (sqlStatement, variablesToPass) => {
        return {
            text: sqlStatement,
            values: variablesToPass
        }
    }
    sql = createSQL(sqlStatement, variablesToPass);

    console.log(sqlStatement)
    try {
        pool.query(sql, (err, res) => {
          if (err) {
            console.log(err)
            resolve([]);
          } else {
            resolve(res.rows.map(el => el));
          }
        });
      } catch (err) {
        console.log(err)
        resolve([]);
      }
});

module.exports.selectCustomQuery = selectCustomQuery;