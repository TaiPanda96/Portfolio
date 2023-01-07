const router = require('express').Router();

const storyRouter = require('./Story/StoryEndpoints');
router.use('/story', storyRouter);


module.exports = router;

