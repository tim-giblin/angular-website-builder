(function() {
	'use strict';

	angular
		.module('website')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['common'];

	/* @ngInject */
	function HomeController(common) {
		var vm = this;
		vm.title = 'HomeController';

		activate();

		////////////////

		function activate() {
			common.activateController([], 'HomeController');
		}
	}
})();