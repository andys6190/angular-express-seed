'use strict';
angular.module('app.profile', [])
    .config(config)
    .controller('ProfileCtrl', profileCtrl);

function config($stateProvider) {
    $stateProvider.state('profile', {
        url: '/profile',
        views: {
            main: {
                controller: 'ProfileCtrl as vm',
                templateUrl: 'profile/profile.tpl.html'
            }
        },
        resolve: {
        }
    });
}

function profileCtrl() {
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
