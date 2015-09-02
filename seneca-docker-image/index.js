'use strict';

var seneca = module.exports = require('seneca')();
seneca.use(process.env.SENECA_SERVICE_DIR);
