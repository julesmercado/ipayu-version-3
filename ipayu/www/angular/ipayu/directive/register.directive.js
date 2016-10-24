

(function () {

	'use strict';

	var modules = [];

	angular
		.module('directive.register', modules)
		.directive('registration', RegisterDrctv)


	// RegisterDrctv.$inject = ['$scope', '$rootScope', 'flags'];

	function RegisterDrctv() {

		return {
		    restrict: 'A',
		    scope: '',
		    link: function(scope, element, attrs, ctrl) {
		    	
		    }
		  }

	}


})();