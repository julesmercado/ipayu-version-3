

(function () {

	'user strict';

	var modules = [];

	angular
		.module('controller.mymallcard', modules)
		.controller('myMallCardCtrl', MyMallCardCtrl)


	MyMallCardCtrl.$inject = ['$scope'];

	function MyMallCardCtrl($scope) {
		console.log("hi");
	}


})();