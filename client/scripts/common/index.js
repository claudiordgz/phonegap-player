'use strict';
require('angular-ui-router');
require('angular-ionic');
require('famous-angular');
require('ngCordova');

var modulename = 'common';

module.exports = function(namespace) {

    var fullname = namespace + '.' + modulename;

    var angular = require('angular');
    var app = angular.module(fullname, ['ui.router', 'ionic', 'famous.angular', 'ngCordova']);
    // inject:folders start
    require('./controllers')(app);
    // inject:folders end

    app.config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('home');
            $stateProvider.state('home', {
                url: '/home',
                template: require('./views/home.html')
            });
        }
    ]);

    return app;
};