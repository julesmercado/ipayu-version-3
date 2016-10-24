

(function () {

	'use strict';

	var modules = [];

	angular
		.module('directive.menu', modules)
		.directive('menu', MenuDrctv)


	// MenuDrctv.$inject = ['$scope', '$rootScope', 'flags'];

	function MenuDrctv() {

		return {
			restrict: 'E',
			templateUrl: 'templates/menu.html'
		}

	}


})();