
var express = require('express');
var router = express.Router();
var xssFilters = require('xss-filters');

router.get('/', function(req, res, next){
    var token = xssFilters.inHTMLData(req.query.token);
    if (token === "undefined") {
        res.send("No token found <a href='/'>Back to Home</a>");
        return;
    } else {
        res.render("../views/register", {
            token: token
        });
    }
})

module.exports = router;

