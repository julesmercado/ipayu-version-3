

(function () {

	'use strict';

	var modules = ['controller.mymallcard'];

	angular
		.module('app.wallet', modules)
		.config(Config)


	Config.$inject = ['$stateProvider'];

	function Config($stateProvider) {

		$stateProvider
	        .state('mymallcards', {
	            url: '/mymallcards',
	            templateUrl: 'templates/wallet/my-mall-cards.html',
	            controller: 'myMallCardCtrl'
	        })
	        .state('myshopcards', {
	            url: '/myshopcards',
	            templateUrl: 'templates/wallet/my-mall-cards.html',
	            controller: 'myMallCardCtrl'
	        })

	}

})();