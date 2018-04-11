'use strict';

const admin = require('./users.js').firebaseAdmin;

const tokenRef = admin.firestore().collection('tokens');

module.exports.generateToken = (domain, cb) => {
	var setData = tokenRef.add({
		'timestamp': Date.now(),
		'domain': domain
	}).then(ref => {
		if(typeof cb == "function") {
			cb(ref.id)
		}	else {
			return ref.id;
		}
	});
}