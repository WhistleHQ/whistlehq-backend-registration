'use strict';

const passport = require('passport');
const login = require('connect-ensure-login');
const signup = require('./signup.js')

module.exports.index = (request, response) => response.render('default')

module.exports.loginForm = (request, response) => {
  //console.log(request.query.token)
  response.render('login');
};

module.exports.login = passport.authenticate('local', { successReturnToOrRedirect: '/', failureRedirect: '/login' });

module.exports.signup = signup.signup;

module.exports.logout = (request, response) => {
  request.logout();
  response.redirect('/');
};

module.exports.account = [
  login.ensureLoggedIn(),
  (request, response) => {response.render('account', { user: request.user })},
];
