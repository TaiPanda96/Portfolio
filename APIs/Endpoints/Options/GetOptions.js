const moment = require('moment');
const { selectCustomQuery } = require('../../../Postgres/GetQuery');

const getOptions = async (req, res) => {
    let { symbol, expiration } = req.query;
    let query = await selectCustomQuery('SELECT * FROM options WHERE symbol = $1 AND expiration >= $2', [symbol, moment(expiration, 'YYYY-MM-DD').toDate()]);
    return res.status(200).send(query || []);
};

const getPricedOptions = async (req, res) => {
    let { symbol, expiration } = req.query;
    let query = await selectCustomQuery('SELECT * FROM priced_options WHERE symbol = $1 AND expiration >= $2 AND bid > 0 AND ask > 0', [symbol, moment(expiration, 'YYYY-MM-DD').toDate()]);
    return res.status(200).send(query || [])
};

module.exports.getOptions = getOptions;
module.exports.getPricedOptions = getPricedOptions;