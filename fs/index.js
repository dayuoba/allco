const _fs = require('fs');
const utils = require('../utils')
const fsModules = Object.keys(_fs);
const fs = module.exports = {}; 
fs.name = 'fs';

fsModules.forEach(module => fs[module] = utils.allco(_fs[module]));

