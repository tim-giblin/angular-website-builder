(function() {
	'use strict';

	angular
		.module('website')
		.directive('logo', logo);

	logo.$inject = ['$state', 'config'];

	/* @ngInject */
	function logo($state, config) {

		var directive = {
			link: link,
			restrict: 'E'
		};
		return directive;

		function link(scope, element, attrs) {
			var render = function() {
				var tag = $state.current.name === 'home' ? 'h1' : 'span';
				element.html('<' + tag + ' class="'+config.headerClass+'__logo">' + config.title + '</' + tag + '>');
			};

			scope.$watch(function() {
				return $state.current;
			}, function(newVal, oldVal) {
				if (!newVal) {
					return;
				}
				render();
			});
		}
	}

})();