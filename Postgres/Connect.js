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
    port: process.env.DB_PORT,
}

// Signer Options for AWS
const signerOptions = {
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
  },
  // This is the region instance
  region: 'us-east-1d',
  hostname: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER
};

const pool  = new Pool(config);
const pg    = pgp(signerOptions);

// Export the pool and pg
module.exports = { pool, pg, pgp };