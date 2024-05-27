/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var aplicacionMundial = angular.module('aplicacionMundial', []);

aplicacionMundial.directive('toolbar', function (AuthService) {
    return {
        restrict: 'E',
        templateUrl: 'partials/toolbar.html',
        controller: function ($scope) {
            this.tab = 0;
            this.selectTab = function (setTab) {
                this.tab = setTab;
            };
            this.isSelected = function (tabParam) {
                return this.tab === tabParam;
            };
            $scope.getLoggedInAddress = function () {
                return AuthService.getLoggedInAddress();
            };
        },
        controllerAs: 'toolbar'
    };
});

aplicacionMundial.service('AuthService', function () {
    var loggedInAddress = '';

    return {
        getLoggedInAddress: function () {
            return loggedInAddress;
        },
        setLoggedInAddress: function (address) {
            loggedInAddress = address;
        }
    };
});



aplicacionMundial.directive('competitorInfo', function () {
    return{
        restrict: 'E',
        templateUrl: 'partials/competitor-info.html',
        controller: 'getCompetitors'
    };
});
aplicacionMundial.controller("getCompetitors", function ($http, $scope) {
    $http.get('http://localhost:8080/backend/getAllUsr').
            success(function (data, status, headers, config) {
                $scope.competitors = data;
            }).
            error(function (data, status, headers, config) {
            });
});

aplicacionMundial.directive('competitorForm', function () {
    return{
        restrict: 'E',
        templateUrl: 'partials/competitor-form.html',
        controller: 'competitorCtrl'
    };
});
aplicacionMundial.controller("competitorCtrl", function ($http, $scope) {
    $scope.addCompetitor = function () {
        console.log('name');
        $http.post('http://localhost:8080/backend/registerUser',
                JSON.stringify($scope.competitor)).success(function (data, headers) {
            $scope.competitor = {};
            $scope.toolbar.selectTab(2);
        });
    };
});

aplicacionMundial.directive('logIn', function () {
    return{
        restrict: 'E',
        templateUrl: 'partials/log-in.html',
        controller: 'logInCtrl'
    };
});
aplicacionMundial.controller("logInCtrl", function ($http, $scope, AuthService) {
    $scope.loggedInAddress = ''; // Variable para almacenar el address del usuario que ha iniciado sesión
    $scope.loginError = ''; // Variable para almacenar el mensaje de error

    $scope.login = function () {
        console.log('login');
        $http.post('http://localhost:8080/backend/login', $scope.loginn, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            console.log('Login successful:', response.data.address);
            AuthService.setLoggedInAddress(response.data.address);
            $scope.loginn = {};
            $scope.toolbar.selectTab(2);
        }, function (error) {
            console.error('encuetra esto:', error.data);
            $scope.loginError = 'Error al iniciar sesión. Por favor, verifica tus credenciales.';
        });
    };
});

aplicacionMundial.directive('conductorForm', function () {
    return{
        restrict: 'E',
        templateUrl: 'partials/competitor-form.html',
        controller: 'competitorCtrl'
    };
});
aplicacionMundial.controller("conductorCtrl", function ($http, $scope) {
    $scope.addCompetitor = function () {
        console.log('name');
        $http.post('http://localhost:8080/backend/registerConductor',
                JSON.stringify($scope.competitor)).success(function (data, headers) {
            $scope.competitor = {};
            $scope.toolbar.selectTab(2);
        });
    };
});





