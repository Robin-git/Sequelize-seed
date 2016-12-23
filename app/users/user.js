'use strict';

angular.module('app.users', ['ngRoute'])

  .config(function ($routeProvider) {
    $routeProvider.when('/users', {
      templateUrl: 'users/user.html',
      controller: 'userController as userCtrl'
    });
  })

  .controller('userController', function (userFact, $scope) {
    var ctrl = this;

    ctrl.init = function () {
      userFact.getUsers().then(function (users) {
        ctrl.users = users.data;
      });
    };
    ctrl.init();

    console.log(ctrl);

    ctrl.submitUser = function () {
      if (ctrl.formUser.$valid) {
        userFact.postUser(ctrl.formUser).then(function (users) {
          ctrl.init();
        });
      } else {
        throw "Le formulaire n'est pas valid !";
      }
    };

  })

  .factory('userFact', function ($http) {
    return {
      getUsers: function () {
        return $http.get('http://localhost:8080/api/user').then(function successCallback(response) {
          return response;
        }, function errorCallback(response) {
          throw response;
        });
      },
      getUser: function (id) {
        return $http.get('http://localhost:8080/api/user/' + id).then(function successCallback(response) {
          return response;
        }, function errorCallback(response) {
          throw response;
        });
      },
      postUser: function (user) {
        return $http.post('http://localhost:8080/api/user', user).then(function successCallback(response) {
          return response;
        }, function errorCallback(response) {
          throw response;
        });
      }
    }
  });
