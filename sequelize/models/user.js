"use strict";

module.exports = function(sequelize, DataTypes) {
  return sequelize.define("user", {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    passwd: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
      getterMethods: {
        fullName: function() {
          return (this.firstname + ' ' + this.lastname);
        }
      }
    });
};
