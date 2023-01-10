const router = require('express').Router();

const storyRouter = require('./Story/StoryEndpoints');
const optionsRouter = require('./Options/OptionsEndpoints');
router.use('/story', storyRouter);
router.use('/options', optionsRouter);

module.exports = router;

