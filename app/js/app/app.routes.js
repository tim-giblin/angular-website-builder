(function() {
	'use strict';

	angular
		.module('website')
		.config(routes)
		.constant('routes', getRoutes());

	routes.$inject = ['$locationProvider', '$stateProvider', 'routes', '$urlRouterProvider'];

	/* @ngInject */
	function routes($locationProvider, $stateProvider, routes, $urlRouterProvider) {
		/*$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});*/

		routes.forEach(function(r) {
			$stateProvider
				.state(r.title, r.config);
		});



		$urlRouterProvider.otherwise('/');
	}

	function getRoutes() {
		return [{
			title: 'home',
			config: {
				url: '/',
				templateUrl: 'home/home.html',
				controller: 'HomeController as home',
				pageMeta: {
					title: 'Home',
					description: 'This is the homepage'
				},
				nav: true
			}
		}, {
			title: 'about',
			config: {
				url: '/about',
				templateUrl: 'about/about.html',
				controller: 'AboutController as about',
				pageMeta: {
					title: 'About',
					description: ''
				},
				nav: true
			}
		}, {
			title: 'contact',
			config: {
				url: '/contact',
				templateUrl: 'contact/contact.html',
				controller: 'ContactController as contact',
				pageMeta: {
					title: 'Contact',
					description: ''
				},
				nav: true
			}
		}];
	}
})();