(function() {
	'use strict';

	angular
		.module('website')
		.run(runBlock);

	runBlock.$inject = ['$rootScope','$state', 'common', 'config'];

	/* @ngInject */
	function runBlock($rootScope, $state, common, config) {
		var events = config.events;

		$rootScope.$on('$stateChangeSuccess', function(e, to) {
			
			if (to && angular.isDefined(to.pageMeta.title)) {
				$rootScope.pageTitle = to.pageMeta.title + ' | '+config.title;
			}

			if (to && angular.isDefined(to.pageMeta.description)) {
				$rootScope.pageDescription = to.pageMeta.description;
			}
		});

		function toggleSpinner(on) { common.isBusy = on; }

		$rootScope.$on('$stateChangeStart',
            	function (event, next, current) { toggleSpinner(true); }
        	);

		$rootScope.$on(events.controllerActivateSuccess,
           	function (event, data) { toggleSpinner(false); }
        	);

		$rootScope.$on(events.spinnerToggle,
            	function (event, data) { toggleSpinner(data.show); }
        	);
	}
})();