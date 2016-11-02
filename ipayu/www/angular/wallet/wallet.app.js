

var walletModule = angular.module('app.wallet', [])

walletModule.config(Config)


Config.$inject = ['$stateProvider'];

function Config($stateProvider) {

	$stateProvider
    // mall cards
        .state('mymallcards', {
            url: '/mymallcards',
            templateUrl: 'templates/wallet/mall/my-mall-cards.html',
            controller: 'myMallCardCtrl'
        })
        .state('mymallcardsviewall', {
            url: '/mymallcardsviewall',
            templateUrl: 'templates/wallet/mall/my-mall-cards-va.html',
            controller: 'myMallCardViewCtrl'
        })
        .state('mallsearch', {
            url: '/mallsearch',
            templateUrl: 'templates/wallet/mall/mall-search.html',
            controller: 'mallCardSearch'
        })
        .state('allmallsearch', {
            url: '/allmallsearch',
            templateUrl: 'templates/wallet/mall/mall-all-cards.html',
            controller: 'allMallCardSearch'
        })
        .state('mallcardinfo', {
            url: '/mallcardinfo',
            templateUrl: 'templates/wallet/mall/mall-card-info.html',
            controller: 'mallCardInfoCtrl'
        })

    // shop cards
        .state('myshopcards', {
            url: '/myshopcards',
            templateUrl: 'templates/wallet/shop/my-shop-cards.html',
            controller: 'myShopCardCtrl'
        })
        .state('myshopcardsviewall', {
            url: '/myshopcardsviewall',
            templateUrl: 'templates/wallet/shop/my-shop-cards-va.html',
            controller: 'myShopCardViewCtrl'
        })

    // coupon cards
        .state('mycouponcards', {
            url: '/mycouponcards',
            templateUrl: 'templates/wallet/coupon/my-coupon-cards.html',
            controller: 'myCouponCtrl'
        })

    // stamp cards
        .state('mystampcards', {
            url: '/mystampcards',
            templateUrl: 'templates/wallet/stamp/my-stamp-cards.html',
            controller: 'myMallCardCtrl'
        })

}
