(function() {
    'use strict';

    angular
        .module('website')
        .directive('spinner', spinner);

    spinner.$inject = ['common'];

    /* @ngInject */
    function spinner(common) {
        // Usage:
        //	<div spinner class='loader"'></div>
        // Creates:
        //	A new Spinner
        var directive = {
            link: link,
            restrict: 'A',
        };
        return directive;

        function link(scope, element, attrs) {
 		
 		var elem = fetchPreloaderBg(element, '.preloader__bg');
            scope.$watch(function() { return common.isBusy; }, function (newVal, oldVal) {
            	
               		if (newVal) {
               			element.addClass('preloader--show');
               			element.removeClass('preloader--hide');
               			elem.addClass('preloader__bg--show');
               			elem.removeClass('preloader__bg--hide');
               		} else {
               			element.addClass('preloader--hide');
               			element.removeClass('preloader--show');
               			elem.removeClass('preloader__bg--show');
               			elem.addClass('preloader__bg--hide');

               		}
            }, true);
        }

        function fetchPreloaderBg(element, className) {
        	var elem = element[0].querySelector(className);
        	return angular.element(elem);
        }
    }

})();