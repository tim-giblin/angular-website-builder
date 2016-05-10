(function() {
	'use strict';

	angular
		.module('website')
		.constant('config', {
			title: 'Angular Website Builder',
			headerClass: 'pageheader',
			events: {
				spinnerToggle: 'spinner.toggle',
				controllerActivateSuccess: 'controller.activateSuccess'
			}
		});
})();