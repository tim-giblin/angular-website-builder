(function() {
	'use strict';


	angular
		.module('website')
		.controller('navigationController', navigationController);

	navigationController.$inject = ['$state','routes', 'config'];

	/* @ngInject */
	function navigationController($state, routes, config) {
		var vm = this;
		vm.title = 'navigationController';

		vm.isCurrent = isCurrent;


		activate();

		////////////////

		function activate() {
			getNavRoutes();
		}

		function getNavRoutes() {
			vm.navRoutes = routes.filter(function(r) {
				return r.config && r.config.nav;
			}).sort(function(r1,r2) {
				return r1.config.nav - r2.config.nav;
			});

		}

		function isCurrent(route) {
			
			if (!route.title || !$state.current || !$state.current.name) {
                		return '';
            	}
            	var menuName = route.title;
            	return $state.current.name.substr(0, menuName.length) === menuName ? config.headerClass+'--current' : '';
		}
	}
})();