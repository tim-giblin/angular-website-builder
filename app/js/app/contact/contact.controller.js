(function() {
	'use strict';

	angular
		.module('website')
		.controller('ContactController', ContactController);

	ContactController.$inject = ['common'];

	/* @ngInject */
	function ContactController(common) {
		var vm = this;
		vm.title = 'ContactController';
		activate();

		////////////////

		function activate() {
			common.activateController([], 'ContactController');
		}
	}
})();