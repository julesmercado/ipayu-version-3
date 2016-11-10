var modules = [ 'app.wallet' , 'ngCordova' ];
var promos = angular.module('app.promos', modules)
	
promos.config(Config)


Config.$inject = ['$stateProvider'];

function Config($stateProvider) {

	$stateProvider
        .state('promolanding', {
            url: '/promoLanding',
            templateUrl: 'templates/promos/promolanding.html',
            controller: 'shopCardSearchCtrl',
            cache: false
        })
        .state('promo-solo-page', {
            url: '/promo-solo-page',
            templateUrl: 'templates/promos/promo-solo-page.html',
            controller: '',
            cache: false
        })
        .state('promolist', {
            url: '/promolist',
            templateUrl: 'templates/promos/promolist.html',
            controller: '',
            cache: false
        })
        .state('search-all-promos', {
            url: '/search-all-promos',
            templateUrl: 'templates/promos/search-all-promos.html',
            controller: '',
            cache: false
        })
}