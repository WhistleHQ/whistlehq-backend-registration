'use strict';

const site = require('./site');
const oauth2 = require('./oauth2');
const user = require('./user');
const client = require('./client');
const getToken = require('./getToken');

module.exports = {
  site,
  getToken,
  oauth2,
  user,
  client,
};
