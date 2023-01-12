const { selectCustomQuery } = require('../../../Postgres/GetQuery');

const getStory = async (req, res) => {
    let query = await selectCustomQuery(`SELECT * FROM story`, []);
    return res.status(200).send(query || []);
};

module.exports.getStory  = getStory;