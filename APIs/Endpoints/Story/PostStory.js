const { createStory } = require('../../Schemas/CreateStory');
const { insertQuery } = require('../../../Postgres/InsertQuery');
const moment = require('moment');

const postStory = async (req, res) => {
    let { title, description, duration, skills, difficulty, author } = req.body;
    const storySlug = title.replace(/ /g, '-').toLowerCase();
    const storyId = `${storySlug}-${Date.now()}`;

    let story = createStory(title, description, duration, skills, difficulty, author);
    story = { ...story, date: moment().toDate() };

    if (!story) { return res.status(400).send('Invalid Story'); }
    insertQuery(storyId, 'story', Object.keys(story), [Object.values(story)], true).then(() => {
        return res.status(200).send('Story Created');
    }).catch((err) => {
        return res.status(500).send({
            message: 'Error creating story',
            error: err
        });
    })
};

const getStory = async (req, res) => {
    return res.status(200).send([])
};

module.exports.postStory = postStory;
module.exports.getStory  = getStory;