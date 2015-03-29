'use strict';
angular
    .module('app', [
        'ui.router',
        'templates',
        'app.home'
    ])
    .config(config)
    .controller('AppCtrl', appCtrl);

function config($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}

function appCtrl() {

}
