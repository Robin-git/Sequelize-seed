"use strict";

var config = {
    db: {
        name: "sequelize-lab",
        user: "root",
        pass: "root"
    },
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    port: 8889
}

module.exports = config;