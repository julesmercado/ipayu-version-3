


var modules = [];
var mallInfo = angular.module('app.mallinfo', modules)
	
mallInfo.config(Config)


Config.$inject = ['$stateProvider'];

function Config($stateProvider) {

	$stateProvider
        .state('mallInfoLanding', {
            url: '/mall-info',
            templateUrl: 'templates/mall-info/mall-info-landing.html',
            controller: 'mallinfolanding',
            cache: false
        })
        .state('mallEvents', {
            url: '/mall-events/:mallId',
            templateUrl: 'templates/mall-info/mall-info-events.html/',
            controller: 'mallInfoEvents',
            cache: false
        })
        .state('mallDirectories', {
            url: '/mall-directories',
            templateUrl: 'templates/mall-info/mall-info-directories.html/',
            controller: 'mallInfoDirectories',
            cache: false
        })
        .state('shopDirectories', {
            url: '/shop-directories/:mallId',
            templateUrl: 'templates/mall-info/mall-info-shop-directories.html/',
            controller: 'mallInfoShopDirectories',
            cache: false
        })
        .state('shopInMallInfo', {
            url: '/shopInMallInfo/:shopId',
            templateUrl: 'templates/mall-info/mall-info-shop-info.html',
            controller: 'shopInfo',
            cache: false
        })
}