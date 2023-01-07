const moment = require('moment');

const createStory = (title = "", description = "", duration = 0, skills = [], difficulty = 'Medium') => {
    const useSkills      = skills.length > 0 ? skills.join(', ') : 'None';
    const useDuration    = moment.duration(duration, 'months').humanize();
    const useTitle       = htmlWrapper(title, 'h1');
    const useDescription = htmlWrapper(description, 'p');

    return {
        title: useTitle,
        description: useDescription,
        duration: useDuration,
        skills: useSkills,
        difficulty,
        attachments: [],
        author: 'Tai Lin'
    }
}

const htmlWrapper = (text, tag) => {
    return `<${tag}>${text}</${tag}>`;
}

module.exports = { createStory };