"use strict";

// server.js

// set up ========================
var express = require('express');
var app = express();                              // create our app w/ express
var morgan = require('morgan');                   // log requests to the console (express4)
var bodyParser = require('body-parser');          // pull information from HTML POST (express4)
var methodOverride = require('method-override');  // simulate DELETE and PUT (express4)
var db = require('./sequelize/main');

// configuration =================

app.use(express.static(__dirname + '/app'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");

app.get('/api/user', function (req, res) {
  db.models.user.findAll().then(function (users) {
    res.send(users);
  });
});

app.get('/api/user/:id', function (req, res) {
  if (req.params.id) {
    db.models.user.findById(req.params.id).then(function (users) {
      res.send(users);
    });
  } else {
    throw "Id is required for search a user...";
  }

});

app.post('/api/user', function (req, res) {
  console.log(req.body);
});