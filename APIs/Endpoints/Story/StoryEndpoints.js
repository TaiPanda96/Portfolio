const storyRouter  = require('express').Router();
const { postStory } = require('./PostStory');
// Post a story
storyRouter.post('/create-story', postStory);

const { getStory } = require('./GetStory');
storyRouter.get('/get-story', getStory);

module.exports = storyRouter;