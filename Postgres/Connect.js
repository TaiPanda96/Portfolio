const { Pool, types } = require('pg');
types.setTypeParser(1700, function (val) {
  return parseFloat(val);
});

const pgp = require('pg-promise')({
  capSQL: true,
});

const config = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.PORT,
}

const pool  = new Pool(config);
const pg    = pgp(config);

// Export the pool and pg
module.exports = { pool, pg, pgp }; 