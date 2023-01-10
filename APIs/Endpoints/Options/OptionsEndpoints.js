const optionsRouter  = require('express').Router();
const { getOptions, getPricedOptions } = require('./GetOptions');
optionsRouter.get('/get-options', getOptions);
optionsRouter.get('/get-priced-options', getPricedOptions);

module.exports = optionsRouter;