const optionsRouter  = require('express').Router();
const { getOptions, getPricedOptions } = require('./GetOptions');
optionsRouter.use('/get-options', getOptions);
optionsRouter.use('/get-priced-options', getPricedOptions);