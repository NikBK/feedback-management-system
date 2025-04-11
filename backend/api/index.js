const app = require('../app');
const serverless = require('serverless-http');
console.log('started');
module.exports.handler = serverless(app);
