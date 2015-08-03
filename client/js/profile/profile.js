'use strict';
(function() {
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
                user: getUser
            }
        });
    }
    config.$inject = ['$stateProvider'];

    function getUser($http) {
        return $http.get('/api/user');
    }
    getUser.$inject = ['$http'];

    function profileCtrl(user) {
        var vm = this;

        vm.user = user.data;
    }
    profileCtrl.$inject = ['user'];
})();
