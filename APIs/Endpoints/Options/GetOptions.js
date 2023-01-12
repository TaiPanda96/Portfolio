const moment = require('moment');
const { selectCustomQuery } = require('../../../Postgres/GetQuery');

const getOptions = async (req, res) => {
    let { symbol } = req.query;
    let useExpiration = moment().toDate();
    let query = await selectCustomQuery(`
        SELECT 
            a."contractSymbol" as "contract",
            a.type,
            TO_CHAR(a.expiration, 'YYYY-MM-DD') as expiration,
            TO_CHAR(a."lastTradeDate", 'YYYY-MM-DD') as "lastTradeDate",
            a.strike,
            a."lastPrice",
            a."bid",
            a."ask",
            a."change",
            ROUND(a."impliedVolatility", 4) as "impliedVolatility",
            a."inTheMoney",
            a.volume
        FROM options a WHERE a.symbol = $1 AND a.expiration >= $2 LIMIT 10`, [symbol, useExpiration]);
    return res.status(200).send(query || []);
};

const getPricedOptions = async (req, res) => {
    let { symbol, expiration } = req.query;
    let query = await selectCustomQuery('SELECT * FROM priced_options WHERE symbol = $1 AND expiration >= $2 LIMIT 5', [symbol, moment(expiration, 'YYYY-MM-DD').toDate()]);
    return res.status(200).send(query || [])
};

module.exports.getOptions = getOptions;
module.exports.getPricedOptions = getPricedOptions;