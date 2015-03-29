'use strict';
angular
    .module('app', [
        'ui.router',
        'templates',
        'app.home',
        'app.profile'
    ])
    .config(config)
    .controller('AppCtrl', appCtrl);

function config($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}
config.$inject = ['$locationProvider'];

function appCtrl() {

}
