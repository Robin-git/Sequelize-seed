"use strict";

var Sequelize = require('sequelize');
var Faker = require('Faker');
var _ = require('lodash');
var sequelizeConfig = require('./config');
var Models = require('./models');

var sequelize = new Sequelize(sequelizeConfig.db.name, sequelizeConfig.db.user, sequelizeConfig.db.pass, {
  host: sequelizeConfig.host,
  dialect: sequelizeConfig.dialect,
  pool: sequelizeConfig.pool,
  port: sequelizeConfig.port
});

sequelize
  .authenticate()
  .then(function (err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

Models.forEach(function(element) {
  element.model = sequelize.import('./models/' + element.file);
  Models[element.name] = element.model;
});

sequelize.sync({ force: true }).then(function () {
  return Models.User.create({
    username: Faker.Internet.userName(),
    firstname: Faker.Name.firstName(),
    lastname: Faker.Name.lastName(),
    email: Faker.Internet.email(),
    passwd: Faker.Name.lastName()
  });
});

module.exports = sequelize;
