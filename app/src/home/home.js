'use strict';
angular.module('app.home', [])
    .config(config)
    .controller('HomeCtrl', homeCtrl);

function config($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        views: {
            main: {
                controller: 'HomeCtrl as vm',
                templateUrl: 'home/home.tpl.html'
            }
        },
        resolve: {
        }
    });
}
config.$inject = ['$stateProvider'];

function homeCtrl() {
    var vm = this;
    vm.errors = [
        {
            message: 'hello'
        },
        {
            message: 'world'
        }
    ];
}
