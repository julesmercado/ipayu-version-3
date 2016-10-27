

var walletModule = angular.module('app.wallet', [])

walletModule.config(Config)


Config.$inject = ['$stateProvider'];

function Config($stateProvider) {

	$stateProvider
        .state('mymallcards', {
            url: '/mymallcards',
            templateUrl: 'templates/wallet/mall/my-mall-cards.html',
            controller: 'myMallCardCtrl'
        })
        .state('myshopcards', {
            url: '/myshopcards',
            templateUrl: 'templates/wallet/shop/my-shop-cards.html',
            controller: 'myShopCardCtrl'
        })
        .state('mycouponcards', {
            url: '/mycouponcards',
            templateUrl: 'templates/wallet/coupon/my-coupon-cards.html',
            controller: 'myCouponCtrl'
        })
        .state('mystampcards', {
            url: '/mystampcards',
            templateUrl: 'templates/wallet/stamp/my-stamp-cards.html',
            controller: 'myMallCardCtrl'
        })

}
