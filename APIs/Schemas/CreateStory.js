const moment = require('moment');

const createStory = (title = "", description = "", duration = 0, skills = [], difficulty = 'Medium') => {
    const useDuration    = moment.duration(duration, 'days').humanize();

    return {
        title: title,
        description: description,
        duration: useDuration,
        skills: skills,
        difficulty,
        author: 'Tai Lin'
    }
}

module.exports = { createStory };