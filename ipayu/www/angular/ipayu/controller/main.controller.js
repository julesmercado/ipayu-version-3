
mainModule.controller('mainCtrl', MainCtrl)


MainCtrl.$inject = [
                    '$rootScope', '$timeout', '$filter', 'flags', 'ngDialog', '$state', 'accountData', 'sqliteSet', 
                    'stampData', 'couponData', 'stamp', 'coupon', 'wallet', 'walletData'
                    ];
function MainCtrl($rootScope, $timeout, $filter, flags, ngDialog, $state, accountData, sqliteSet,
                    stampData, couponData, stamp, coupon, wallet, walletData) {

    var tOut;
    $rootScope.doLoading = false;
	var ipayu_info = accountData.getUser();
    function init() {
        $rootScope.headerCountries = flags.getAll();
        $rootScope.countryDisplay = flags.getCountryDisplay();
        $rootScope.countryDisplay.display = false;
        
        $rootScope.showMenu = false;
        $rootScope.hasBG = false;
        $rootScope.menuDisplayed = false;

        $rootScope.searchCountry = {
            'country' : $rootScope.countryDisplay.country
        };
    }
    init();

    $rootScope.menuSwipeLeft = function(){
        alert('Please change to toggleMenu');
    }

// Action event if state changes
    $rootScope.$on('$stateChangeSuccess', 
        function(ev, to, toParams, from, fromParams) {
            $state.previous = { route: from, routeParams: fromParams }
            ngDialog.closeAll();
            if(accountData.getUser().length == 0 && (to.name != 'login' && to.name != 'register' && to.name != 'forgot')){
                $state.go('login');
            }
            init();
    });

// Hide/Show menu
    $rootScope.toggleMenu = function(){
        $timeout.cancel(tOut);
        if(!$rootScope.menuDisplayed){
            $rootScope.menuDisplayed = true;
        }

        $rootScope.showMenu = ($rootScope.showMenu) ? false:true;
        $rootScope.hasBG = ($rootScope.hasBG) ? false:true;

        if(!$rootScope.showMenu){
            tOut = $timeout(function() {
                $rootScope.menuDisplayed = false;
            }, 900);
        }
    }

// Hide/Show country
    $rootScope.toggleShowCountry = function(){
        $rootScope.countryDisplay.display = ($rootScope.countryDisplay.display) ? false:true;
    }

// if user selects a country flag
    $rootScope.selectCountry = function(c){
        $rootScope.searchCountry.country = c.name;
        var countryDisplay = {
            'country'   : c.name,
            'flag'      : c.img,
            'name'      : c.code,
            'display'   : true
        }
        flags.setCountryDisplay(countryDisplay);
        $rootScope.countryDisplay = flags.getCountryDisplay();
    }

    $rootScope.logout = function () {
        sqliteSet.dropTable();
        localStorage.clear();
        $state.go('login');
    }

    $rootScope.readable_date = function(date){
        return $filter('date')(new Date(parseInt(date)), 'yyyy-MM-dd');
    }

    var ready_dashboard = true,
        ready_mallcard = true,
        ready_shopcard = true,
        ready_coupon = true,
        ready_stamp = true;

    setInterval(function() {

        if($rootScope.showOffline == false) {

            if($state.current.name == 'dashboard' && ready_dashboard == true){
                ready_dashboard == false;
                wallet.getTopThreeFrequent(ipayu_info.ipayu_id, true)
                .then(function(resolve){
                    ready_dashboard = true
                    if(resolve){
                        accountData.setTopThreeFrequent(resolve[0].data.data);
                        $rootScope.$broadcast('newDashboardData', resolve[0].data.data)
                    }
                })
            }

            if($state.current.card_type == 'mallcard' && ready_mallcard == true){
                ready_mallcard = false;
                wallet.getUserCards({'ipayu_id':ipayu_info.ipayu_id, 'type':'mall'}, true)
                .then(function(resolve){
                    ready_mallcard = true;
                    console.log(resolve)
                    if(resolve){
                        walletData.setUserCards(resolve[0].data.data.all, 'mall');
                        walletData.setFrequentUserCards(resolve[0].data.data.frequently, 'mall');
                        walletData.setLastUserCards(resolve[0].data.data.last_used, 'mall');
                        $rootScope.$broadcast('newMallCardData', resolve[0].data.data)
                    }
                })
            }

            if($state.current.card_type == 'shopcard' && ready_shopcard == true){
                ready_shopcard = false;
                wallet.getUserCards({'ipayu_id':ipayu_info.ipayu_id, 'type':'shop'}, true)
                .then(function(resolve){
                    ready_shopcard = true;
                    if(resolve){
                        walletData.setUserCards(resolve[0].data.data.all, 'shop');
                        walletData.setFrequentUserCards(resolve[0].data.data.frequently, 'shop');
                        walletData.setLastUserCards(resolve[0].data.data.last_used, 'shop');
                        $rootScope.$broadcast('newShopCardData', resolve[0].data.data)
                    }
                })
            }

            if($state.current.card_type == 'couponcard' && ready_coupon == true){
                ready_coupon = false;
                coupon.getUserCoupons(ipayu_info.ipayu_id, true)
                .then(function(resolve){
                    ready_coupon = true;
                    if(resolve){
                        couponData.setUserCoupons(resolve[0].data.data.allcoupons);
                        couponData.setFeaturedCoupons(resolve[0].data.data.featuredcoupons);
                        couponData.setUsedCoupons(resolve[0].data.data.usedcoupons);
                        $rootScope.$broadcast('newCouponData', resolve[0].data.data)
                    }
                })
            }

            if($state.current.card_type == 'stampcard' && ready_stamp == true){
                ready_stamp = false;
                stamp.getUserStamps(ipayu_info.ipayu_id, true)
                .then(function(resolve){
                    ready_stamp = true;
                    if(resolve){
                        stampData.setUserStamps(resolve[0].data.data.allstamps);
                        stampData.setFeaturedStamps(resolve[0].data.data.featuredstamps);
                        stampData.setUsedStamps(resolve[0].data.data.usedstamps);
                        $rootScope.$broadcast('newStampData', resolve[0].data.data)
                    }
                })
            }
        }

    }, 2000);

}
