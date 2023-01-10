require('dotenv').config();
const express    = require("express");
const bodyParser = require('body-parser');
const cron       = require('node-cron');
const fileUpload = require('express-fileupload');

// Define Express App + Port #
const app  = express();
const PORT = 8000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
    let error = reason.stack.split("\n").map(e => e.trim()) || [];
    console.log(error);
});

let server = app.listen(PORT, (server) => { console.log(`Server is running on port ${PORT}.`)});

server.keepAliveTimeout = 65000;
server.headersTimeout   = 66000;

// Define Routes    
const routes = require('./APIs/Endpoints/Routes');
app.use('/api', routes);

// Connection to Postgres
const { pool } = require('./Postgres/Connect');
// Test Connection
pool.connect((err, client, release) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Postgres Connected!");
        // SELECT NOW() AS "theTime";
        client.query('SELECT NOW() AS "theTime"', (err, result) => {
            if (err) { console.log(err) }
            else { console.log(`The current time is: ${result.rows[0].theTime}`) }
        })
    }
});
