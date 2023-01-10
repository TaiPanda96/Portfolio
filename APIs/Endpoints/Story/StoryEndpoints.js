const storyRouter  = require('express').Router();
const { postStory, getStory } = require('./PostStory');
// Post a story
storyRouter.post('/create-story', postStory);
storyRouter.get('/get-story', getStory);

module.exports = storyRouter;