(function() {
	'use strict';

	angular
		.module('website')
		.controller('AboutController', AboutController);

	AboutController.$inject = ['common'];

	/* @ngInject */
	function AboutController(common) {
		var vm = this;
		vm.title = 'AboutController';
		activate();

		////////////////

		function activate() {
			common.activateController([], 'AboutController');
		}
	}
})();