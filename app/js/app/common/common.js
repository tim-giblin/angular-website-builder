(function() {
    'use strict';

    angular
        .module('common', [])
        .factory('common', common);

    common.$inject = ['$rootScope', '$q', '$timeout', 'config'];

    /* @ngInject */
    function common($rootScope, $q, $timeout, config) {
        var service = {
            // angular dependencies
            $broadcast: $broadcast,
            $q: $q,
            $timeout: $timeout,
            // generic
            activateController: activateController,
            isBusy: true
        };
        return service;

        ////////////////

        function $broadcast() {
            return $rootScope.$broadcast.apply($rootScope, arguments);
        }

        function activateController(promises, controllerId) {
            if (promises.length < 1) {
               promises.push(addFakePromise());
            }
            return $q.all(promises).then(function (eventArgs) {
                var data = { controllerId: controllerId };
                $broadcast(config.events.controllerActivateSuccess, data);
            });
        }

        function addFakePromise() {
            return $timeout(function() {
            },1000);
        }
    }
})();