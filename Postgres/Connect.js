const { Pool, types } = require('pg');
types.setTypeParser(1700, function (val) {
  return parseFloat(val);
});

const config = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.PORT,
}

const pool  = new Pool(config);
// Export the pool and pg
module.exports = { pool, config }; 
