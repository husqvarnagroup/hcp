'use strict';

const fs = require('fs');
const TifCompiler = require('./tif-compiler');
fs.writeFile("tif-test.ts",TifCompiler(require('./tif-test.json')));