'use strict';

// Create a seneca instance.
var seneca = module.exports = require('seneca')();
// Load the seneca plugin from the inheriting image.
seneca.use(process.env.SENECA_SERVICE_DIR);
