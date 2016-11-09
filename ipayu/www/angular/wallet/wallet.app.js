

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
            controller: 'mallCardSearchCtrl'
        })
        .state('allmallsearch', {
            url: '/allmallsearch',
            templateUrl: 'templates/wallet/mall/mall-all-cards.html',
            controller: 'allMallCardSearchCtrl'
        })
        .state('mallcardinfo', {
            url: '/mallcardinfo',
            templateUrl: 'templates/wallet/mall/mall-card-info.html',
            controller: 'mallCardInfoCtrl'
        })
        .state('addmallcard', {
            url: '/addmallcard',
            templateUrl: 'templates/wallet/mall/add-mall-card.html',
            controller: 'addMallCardCtrl'
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
        .state('shopsearch', {
            url: '/shopsearch',
            templateUrl: 'templates/wallet/shop/shop-search.html',
            controller: 'shopCardSearchCtrl'
        })
        .state('allshopsearch', {
            url: '/allshopsearch',
            templateUrl: 'templates/wallet/shop/shop-all-cards.html',
            controller: 'allShopCardSearchCtrl'
        })
        .state('shopcardinfo', {
            url: '/shopcardinfo',
            templateUrl: 'templates/wallet/shop/shop-card-info.html',
            controller: 'shopCardInfoCtrl'
        })
        .state('addshopcard', {
            url: '/addshopcard',
            templateUrl: 'templates/wallet/shop/add-shop-card.html',
            controller: 'addShopCardCtrl'
        })

    // coupon cards
        .state('mycouponcards', {
            url: '/mycouponcards',
            templateUrl: 'templates/wallet/coupon/my-coupon-cards.html',
            controller: 'myCouponCtrl'
        })
        .state('coupongroup', {
            url: '/coupongroup/{name}',
            templateUrl: 'templates/wallet/coupon/coupon-group.html',
            controller: 'couponGroupCtrl'
        })
        .state('couponinfo', {
            url: '/couponinfo/{id}/{type}',
            templateUrl: 'templates/wallet/coupon/coupon-info.html',
            controller: 'couponInfoCtrl'
        })
        .state('couponhistory', {
            url: '/couponhistory',
            templateUrl: 'templates/wallet/coupon/coupon-history.html',
            controller: 'couponHistoryCtrl'
        })
        .state('couponsearch', {
            url: '/couponsearch',
            templateUrl: 'templates/wallet/coupon/coupon-search.html',
            controller: 'couponCardSearchCtrl'
        })
        .state('allcouponsearch', {
            url: '/allcouponsearch',
            templateUrl: 'templates/wallet/coupon/coupon-all-card.html',
            controller: 'allCouponCardSearchCtrl'
        })
        .state('addcouponcard', {
            url: '/addcouponcard',
            templateUrl: 'templates/wallet/coupon/add-coupon-card.html',
            controller: 'addCouponCardCtrl'
        })

    // stamp cards
        .state('mystampcards', {
            url: '/mystampcards',
            templateUrl: 'templates/wallet/stamp/my-stamp-cards.html',
            controller: 'myStampCtrl'
        })
        .state('stampinfo', {
            url: '/stampinfo/{id}/{type}',
            templateUrl: 'templates/wallet/stamp/stamp-info.html',
            controller: 'stampInfoCtrl'
        })
        .state('stamphistory', {
            url: '/stamphistory',
            templateUrl: 'templates/wallet/stamp/stamp-history.html',
            controller: 'stampHistoryCtrl'
        })
        .state('stampsearch', {
            url: '/stampsearch',
            templateUrl: 'templates/wallet/stamp/stamp-search.html',
            controller: 'stampCardSearchCtrl'
        })
        .state('allstampsearch', {
            url: '/allstampsearch',
            templateUrl: 'templates/wallet/stamp/stamp-all-card.html',
            controller: 'allStampCardSearchCtrl'
        })
        .state('addstampcard', {
            url: '/addstampcard',
            templateUrl: 'templates/wallet/stamp/add-stamp-card.html',
            controller: 'addStampCardCtrl'
        })
    
        // redeem history
        .state('redeemhistory', {
            url: '/redeemhistory',
            templateUrl: 'templates/wallet/redeem-history/items-history.html',
            controller: 'redeemHistoryCtrl'
        })
        .state('itemlocation', {
            url: '/itemlocation/{id}',
            templateUrl: 'templates/wallet/redeem-history/item-location.html',
            controller: 'itemLocationCtrl'
        })

}
