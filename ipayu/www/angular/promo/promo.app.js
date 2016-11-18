
var modules = [];
var promoModule = angular.module('app.promos', modules)
	
promoModule.config(Config)

Config.$inject = ['$stateProvider'];
function Config($stateProvider) {

	$stateProvider
        .state('promolanding', {
            url: '/promolanding',
            templateUrl: 'templates/promos/promolanding.html',
            controller: 'promoLandingCtrl',
            cache: false
        })
        .state('promosolopage', {
            url: '/promosolopage',
            templateUrl: 'templates/promos/promo-solo-page.html',
            controller: 'promoSoloCtrl',
            cache: false
        })
        .state('promolist', {
            url: '/promolist',
            templateUrl: 'templates/promos/promolist.html',
            controller: 'promoListCtrl',
            cache: false
        })
        .state('searchallpromos', {
            url: '/searchallpromos',
            templateUrl: 'templates/promos/search-all-promos.html',
            controller: 'allPromoSearchCtrl',
            cache: false
        })
}