'use strict';

var admin = require('firebase-admin');
var serviceAccount = require(null); // add firebase key here
var xssFilters = require('xss-filters');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports.firebaseAdmin = admin

const scrypt = require("scrypt");
const scryptParameters = scrypt.paramsSync(2.0);

const docRef = admin.firestore().collection('userdata');
const tokenRef = admin.firestore().collection('tokens');

module.exports.findById = (id, done) => {
  var accRef = docRef.doc(id);
  accRef.get().then(r=> {
      try{
        var data = r.data();
        data.id = r.id
        return done(null, data);
      } catch(err) {
        return done(new Error('User Not Found 1'));
      }
  })
};

module.exports.findByUsername = (username, done) => {
  var queryRef = docRef.where('username', '==', username);
  queryRef.get().then(doc => {
    var data = null;
    doc.forEach(r => {
      data = r.data();
      data.id = r.id
    })
    if(data) {
      return done(null, data);
    } else {
      return done(new Error('User Not Found 2'));
    }

  })
};

module.exports.save = (username, password, name, token, response) => {
  //check if token exists
  try {
    var token = tokenRef.doc(xssFilters.inHTMLData(token));
    token.get().then(r => {

        var data = r.data();

        //check if timestamp is within 2hours
        if(data && data.timestamp && Date.now() - data.timestamp > 0 && Date.now() - data.timestamp < 7200000) {
          scrypt.kdf(xssFilters.inHTMLData(password), scryptParameters, function(err, result){
            var setData = docRef.add({
              'username': xssFilters.inHTMLData(username),
              'password': result,
              'name': xssFilters.inHTMLData(name),
              'domain': data.domain
            });
          });
          response.send("worked!");
        } else {
          response.send("Request expired, try again");
        }
    }, err => {
      response.send("Incorrect token");
    })
  } catch (err) {
    response.send("Something went wrong");
  }
}
