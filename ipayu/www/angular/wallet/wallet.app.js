

var walletModule = angular.module('app.wallet', [])

walletModule.config(Config)


Config.$inject = ['$stateProvider'];

function Config($stateProvider) {

	$stateProvider
    // mall cards
        .state('mymallcards', {
            url: '/mymallcards',
            templateUrl: 'templates/wallet/mall/my-mall-cards.html',
            controller: 'myMallCardCtrl',
            card_type:'mallcard'
        })
        .state('mymallcardsviewall', {
            url: '/mymallcardsviewall',
            templateUrl: 'templates/wallet/mall/my-mall-cards-va.html',
            controller: 'myMallCardViewCtrl',
            card_type:'mallcard'
        })
        .state('mallsearch', {
            url: '/mallsearch',
            templateUrl: 'templates/wallet/mall/mall-search.html',
            controller: 'mallCardSearchCtrl',
            card_type:'mallcard'
        })
        .state('allmallsearch', {
            url: '/allmallsearch',
            templateUrl: 'templates/wallet/mall/mall-all-cards.html',
            controller: 'allMallCardSearchCtrl',
            card_type:'mallcard'
        })
        .state('mallcardinfo', {
            url: '/mallcardinfo',
            templateUrl: 'templates/wallet/mall/mall-card-info.html',
            controller: 'mallCardInfoCtrl',
            card_type:'mallcard',
            cache: false
        })
        .state('addmallcard', {
            url: '/addmallcard',
            templateUrl: 'templates/wallet/mall/add-mall-card.html',
            controller: 'addMallCardCtrl',
            card_type:'mallcard',
            cache: false
        })

    // shop cards
        .state('myshopcards', {
            url: '/myshopcards',
            templateUrl: 'templates/wallet/shop/my-shop-cards.html',
            controller: 'myShopCardCtrl',
            card_type:'shopcard'
        })
        .state('myshopcardsviewall', {
            url: '/myshopcardsviewall',
            templateUrl: 'templates/wallet/shop/my-shop-cards-va.html',
            controller: 'myShopCardViewCtrl',
            card_type:'shopcard'
        })
        .state('shopsearch', {
            url: '/shopsearch',
            templateUrl: 'templates/wallet/shop/shop-search.html',
            controller: 'shopCardSearchCtrl',
            card_type:'shopcard'
        })
        .state('allshopsearch', {
            url: '/allshopsearch',
            templateUrl: 'templates/wallet/shop/shop-all-cards.html',
            controller: 'allShopCardSearchCtrl',
            card_type:'shopcard'
        })
        .state('shopcardinfo', {
            url: '/shopcardinfo',
            templateUrl: 'templates/wallet/shop/shop-card-info.html',
            controller: 'shopCardInfoCtrl',
            card_type:'shopcard',
            cache: false
        })
        .state('addshopcard', {
            url: '/addshopcard',
            templateUrl: 'templates/wallet/shop/add-shop-card.html',
            controller: 'addShopCardCtrl',
            card_type:'shopcard',
            cache: false
        })

    // coupon cards
        .state('mycouponcards', {
            url: '/mycouponcards',
            templateUrl: 'templates/wallet/coupon/my-coupon-cards.html',
            controller: 'myCouponCtrl',
            card_type:'couponcard'
        })
        .state('coupongroup', {
            url: '/coupongroup/{name}',
            templateUrl: 'templates/wallet/coupon/coupon-group.html',
            controller: 'couponGroupCtrl',
            card_type:'couponcard'
        })
        .state('couponinfo', {
            url: '/couponinfo/{id}/{type}',
            templateUrl: 'templates/wallet/coupon/coupon-info.html',
            controller: 'couponInfoCtrl',
            card_type:'couponcard',
            cache: false
        })
        .state('couponhistory', {
            url: '/couponhistory',
            templateUrl: 'templates/wallet/coupon/coupon-history.html',
            controller: 'couponHistoryCtrl',
            card_type:'couponcard'
        })
        .state('couponsearch', {
            url: '/couponsearch',
            templateUrl: 'templates/wallet/coupon/coupon-search.html',
            controller: 'couponCardSearchCtrl',
            card_type:'couponcard'
        })
        .state('allcouponsearch', {
            url: '/allcouponsearch',
            templateUrl: 'templates/wallet/coupon/coupon-all-card.html',
            controller: 'allCouponCardSearchCtrl',
            card_type:'couponcard'
        })
        .state('addcouponcard', {
            url: '/addcouponcard',
            templateUrl: 'templates/wallet/coupon/add-coupon-card.html',
            controller: 'addCouponCardCtrl',
            card_type:'couponcard',
            cache: false
        })

    // stamp cards
        .state('mystampcards', {
            url: '/mystampcards',
            templateUrl: 'templates/wallet/stamp/my-stamp-cards.html',
            controller: 'myStampCtrl',
            card_type:'stampcard'
        })
        .state('stampinfo', {
            url: '/stampinfo/{id}/{type}',
            templateUrl: 'templates/wallet/stamp/stamp-info.html',
            controller: 'stampInfoCtrl',
            card_type:'stampcard',
            cache: false
        })
        .state('stamphistory', {
            url: '/stamphistory',
            templateUrl: 'templates/wallet/stamp/stamp-history.html',
            controller: 'stampHistoryCtrl',
            card_type:'stampcard'
        })
        .state('stampsearch', {
            url: '/stampsearch',
            templateUrl: 'templates/wallet/stamp/stamp-search.html',
            controller: 'stampCardSearchCtrl',
            card_type:'stampcard'
        })
        .state('allstampsearch', {
            url: '/allstampsearch',
            templateUrl: 'templates/wallet/stamp/stamp-all-card.html',
            controller: 'allStampCardSearchCtrl',
            card_type:'stampcard'
        })
        .state('addstampcard', {
            url: '/addstampcard',
            templateUrl: 'templates/wallet/stamp/add-stamp-card.html',
            controller: 'addStampCardCtrl',
            card_type:'stampcard',
            cache: false
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

        .state('profile', {
            url: '/profile',
            templateUrl: 'templates/profile.html',
            controller: ''
        })

         .state('changePW', {
            url: '/changePW',
            templateUrl: 'templates/change-pass.html',
            controller: ''
        })


}
