'use strict';

const db = require('../db/users.js')

module.exports.signup = (request, response) => {
	db.save(request.body.username, request.body.password, request.body.name, request.body.token, response)
}