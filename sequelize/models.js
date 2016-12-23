"use strict";

const fs = require('fs');

String.prototype.ucfirst = function()
{
    return this.charAt(0).toUpperCase() + this.substr(1);
}

module.exports = function () {
    var list = [];
    var model = {};
    fs.readdirSync('./sequelize/models').forEach(function (file) {
        var ModuleName = file.replace(".js", '').ucfirst();
        model.name = ModuleName;
        model.file = file;
        list.push(model);
    });
    return list;
}();