'use strict';

const token = require('../db/signup_token.js');
const sg = require('../signup/mailer.js')
var freeDomains = require('../free_email_domains.json');
var xssFilters = require('xss-filters');

function emailExtractor(text) {
	const cleanText = xssFilters.inHTMLData(text);
	return cleanText.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
}

function checkFreeDomain(domain_str) {
	// if domain is found the in free domain table, return true, otherwise return false
	return Boolean(freeDomains[domain_str]);
}

module.exports.getToken = (request, response) => {
	//check for emails
	if (request.body.emails) {
		const emails = emailExtractor(request.body.emails);
		const url = request.body.url_name;
		if (emails.length < 1) {
			response.send('We need valid emails');
		} else {
			//check domains of all emails, they must be some.
			var setDomain = false;

			// check the parts after the @
			let foundDomain = emails[0].split('@')[1]
			let blacklisted = checkFreeDomain(foundDomain)

			if (!setDomain) {
				//This should happen the first time
				if (blacklisted) {
					response.send('The email domain you entered, <b>' + foundDomain + '</b> has been blocked. Try again with different domain.')
					return;
				}
				setDomain = foundDomain
			} else if (setDomain != foundDomain) {
				//Send error and exit
				response.send('All the mails need to be from the same domain');
				return;
			}

			//Get token from firebase
			token.generateToken(setDomain, tok => {
				const prom = sg.massMailer(url, emails, tok);
				//see if successful, then send appropriate response.
				prom.then(() => {
					response.send('Check your inbox');
				}).catch(error => {
					response.send('Something went wrong.');
				})
			})

		}

	} else {
		response.send('Today has been cancelled, go to sleep');
	}
}