

// User Cards
walletModule.directive('routeMycard', Mycard)					//	state = mymallcards OR myshopcards
walletModule.directive('routeMycouponcard', Mycouponcard)		//	state = mycouponcards
walletModule.directive('routeMystampcard', Mystampcard)			//	state = mystampcards

// Search Card
walletModule.directive('routeCardSearch', CardSearch)			//	state = mallsearch OR shopsearch OR couponsearch OR stampsearch
walletModule.directive('routeAllCardSearch', AllCardSearch)		//	state = allmallsearch OR allshopsearch
walletModule.directive('routeAllAssetCards', AllAssetCards)		//	state = allmallsearch OR allshopsearch

// Card Info
walletModule.directive('routeCardInfo', CardInfo)				// state = mallcardinfo OR shopcardinfo

// Card Info
walletModule.directive('routeCardHistory', CardHistory)     // state = couponhistory OR stamphistory


// User Cards
Mycard.$inject = ['$state', '$rootScope', 'preloaderMethod', 'accountData', 'wallet', 'walletData'];
function Mycard($state, $rootScope, preloaderMethod, accountData, wallet, walletData) {
	return {
	    restrict: 'A',
	    link: function(scope, element, attrs, ctrl) {
	    	element.bind('click', function () {

	    		var	type = attrs.routeMycard,
	    			route = (type == 'mall')? 'mymallcards':'myshopcards',
	    			ipayu_info = accountData.getUser();

	    		if($rootScope.showOffline){
					$state.go(route);
	    		}
	    		else{
	    			$rootScope.doLoading = true;
	    			wallet.getUserCards({'ipayu_id'	: ipayu_info.ipayu_id, 'type'	: type})
	    				.then(function (resolve) {
	    					if(resolve){
		    					var u = walletData.setUserCards(resolve[0].data.data.all, type);
		    					var f = walletData.setFrequentUserCards(resolve[0].data.data.frequently, type);
		    					var l = walletData.setLastUserCards(resolve[0].data.data.last_used, type);
								$state.go(route);
								preloaderMethod.preloadImage([u, f, l]);
	    					}
	    					else{$rootScope.doLoading = false;}
	    				})
	    		}
	    	})
	    }
	  }
}

Mycouponcard.$inject = ['$state', '$rootScope', 'coupon', 'couponData', 'preloaderMethod', 'accountData'];
function Mycouponcard($state, $rootScope, coupon, couponData, preloaderMethod, accountData) {
	return {
	    restrict: 'A',
	    link: function(scope, element, attrs, ctrl) {
	    	element.bind('click', function () {
	    		var ipayu_info = accountData.getUser();
	    		if($rootScope.showOffline){
					$state.go('mycouponcards');
	    		}
	    		else{
	    			$rootScope.doLoading = true;
	    			coupon.getUserCoupons(ipayu_info.ipayu_id)
	    				.then(function (resolve) {
                        console.log(resolve)
	    					if(resolve){
			                	var m = couponData.setUserCoupons(resolve[0].data.data.allcoupons);
			                	var f = couponData.setFeaturedCoupons(resolve[0].data.data.featuredcoupons);
			                	var u = couponData.setUsedCoupons(resolve[0].data.data.usedcoupons);
								$state.go('mycouponcards');
								preloaderMethod.preloadImage([m, f, u]);
	    					}
	    					else{$rootScope.doLoading = false;}
	    				})
	    		}
	    	})
	    }
	  }
}

Mystampcard.$inject = ['$state', '$rootScope', 'stamp', 'stampData', 'preloaderMethod', 'accountData'];
function Mystampcard($state, $rootScope, stamp, stampData, preloaderMethod, accountData) {
	return {
	    restrict: 'A',
	    link: function(scope, element, attrs, ctrl) {
	    	element.bind('click', function () {
				var ipayu_info = accountData.getUser();
	    		if($rootScope.showOffline){
					$state.go('mystampcards');
	    		}
	    		else{
	    			$rootScope.doLoading = true;
	    			stamp.getUserStamps(ipayu_info.ipayu_id)
	    				.then(function (resolve) {
                        console.log(resolve)
	    					if(resolve){
			                	var m = stampData.setUserStamps(resolve[0].data.data.allstamps);
			                	var f = stampData.setFeaturedStamps(resolve[0].data.data.featuredstamps);
			                	var u = stampData.setUsedStamps(resolve[0].data.data.usedstamps);
								$state.go('mystampcards');
								preloaderMethod.preloadImage([m, u, f]);
	    					}
	    					else{$rootScope.doLoading = false;}
	    				})
	    		}
	    	})
	    }
	  }
}


// Search Card
CardSearch.$inject = ['$state', '$rootScope', 'preloaderMethod', 'wallet', 'walletData', 'customService'];
function CardSearch($state, $rootScope, preloaderMethod, wallet, walletData, customService) {
	return {
	    restrict: 'A',
	    link: function(scope, element, attrs, ctrl) {
	    	element.bind('click', function () {

	    		var	type = attrs.routeCardSearch,
                    route = '';
                
                switch(type) {
                    case 'mall':
                        route = 'mallsearch'; break;
                    case 'shop':
                        route = 'shopsearch'; break;
                    case 'coupon':
                        route = 'couponsearch';
                        type = '';
                        break;
                    case 'stamp':
                        route = 'stampsearch';
                        type = '';
                        break;
                    default:
                        alert('undefined type');
                        return;
                }

	    		if($rootScope.showOffline){
	    			customService.alert('No internet connection', 'Oops!', 'Ok');
	    		}
	    		else{
	    			$rootScope.doLoading = true;
	    			wallet.getAllHasCardAssets(type)
	    					.then(function (resolve) {
								var f = walletData.setAssetsFeatured(resolve[0].data.data.featured)
								var n = walletData.setAssetsNonFeatured(resolve[0].data.data.not_featured)
								var c = walletData.setCategories(resolve[1].data.data)
	    						$state.go(route);
								preloaderMethod.preloadImage([f, n, c]);
	    					})
	    		}
	    	})
	    }
	  }
}



AllCardSearch.$inject = ['$state', '$rootScope', 'preloaderMethod', 'wallet', 'walletData', 'customService', 'accountData'];
function AllCardSearch($state, $rootScope, preloaderMethod, wallet, walletData, customService, accountData) {
	return {
	    restrict: 'A',
	    link: function(scope, element, attrs, ctrl) {
	    	element.bind('click', function () {
	    		var user = accountData.getUser(),
	    			type = attrs.routeAllCardSearch,
	    			route = '';
                
                switch(type) {
                    case 'mall':
                        route = 'allmallsearch'; break;
                    case 'shop':
                        route = 'allshopsearch'; break;
                    case 'coupon':
                        route = 'allcouponsearch'; break;
                    case 'stamp':
                        route = 'allstampsearch'; break;
                    default:
                        alert('undefined type'); return;
                }

	    		if($rootScope.showOffline){
	    			customService.alert('No internet connection', 'Oops!', 'Ok');
	    		}
	    		else{
	    			$rootScope.doLoading = true;
	    			wallet.getAllCardAvailable(user.ipayu_id, type)
	    					.then(function (resolve) {
	    						if(resolve){
	    							var a = walletData.setAllAvailableCards(resolve[0].data.data);
	    							$state.go(route);
									preloaderMethod.preloadImage([a]);
	    						}
	    						else{$rootScope.doLoading = false;}
								console.log(resolve);
	    					})
	    		}
	    	})
	    }
	  }
}


AllAssetCards.$inject = ['$state', '$rootScope', 'preloaderMethod', 'wallet', 'customService', 'accountData', 'walletData'];
function AllAssetCards($state, $rootScope, preloaderMethod, wallet, customService, accountData, walletData) {
	return {
	    restrict: 'A',
	    link: function(scope, element, attrs, ctrl) {
	    	element.bind('click', function () {
	    		var user = accountData.getUser(),
	    			card = JSON.parse(attrs.routeAllAssetCards),
                    type = attrs.type,
	    			route = '';
                
                switch(type) {
                    case 'mall':
                        route = 'allmallsearch'; break;
                    case 'shop':
                        route = 'allshopsearch'; break;
                    case 'coupon':
                        route = 'allcouponsearch';
                        break;
                    case 'stamp':
                        route = 'allstampsearch';
                        break;
                    default:
                        alert('undefined type');
                        return;
                }

	    		if($rootScope.showOffline){
	    			customService.alert('No internet connection', 'Oops!', 'Ok');
	    		}
	    		else{
	    			$rootScope.doLoading = true;
	    			wallet.getAllCardAvailableInEstablishment(user.ipayu_id, card.asset_info_id, type)
	    					.then(function (resolve) {
	    						if(resolve){
	    							var a = walletData.setAllAvailableCards(resolve[0].data.data);
	    							$state.go(route);
									preloaderMethod.preloadImage([a]);
	    						}
	    						else{$rootScope.doLoading = false;}
								console.log(resolve);
	    					})
	    		}
	    	})
	    }
	  }
}

// Card Info
CardInfo.$inject = ['$state', '$rootScope', 'walletData'];
function CardInfo($state, $rootScope, walletData) {
	return {
	    restrict: 'A',
	    link: function(scope, element, attrs, ctrl) {
	    	element.bind('click', function () {

	    		var data= JSON.parse(attrs.routeCardInfo),
	    			route   = (attrs.cardType == 'mall')? 'mallcardinfo':'shopcardinfo',
	    			cards 	= walletData.getUserCards(attrs.cardType),
    				key 	= Object.keys(cards).filter(function(key){return (cards[key].card_id == data.card_id)}),
    				card 	= cards[key];

				walletData.setCardInfo(card)
				$state.go(route);

	    	})
	    }
	  }
}

// Coupon History
CardHistory.$inject = ['$state'];
function CardHistory ($state) {
    return {
        restrict:   'A',
        link:   function (scope, element, attrs, ctrl) {
            element.bind('click', function () {
                var type = attrs.routeCardHistory,
                    route = '';
                switch(type){
                    case 'coupon':
                        route = 'couponhistory'; break;
                    case 'stamp':
                        route = 'stamphistory'; break;
                    default:
                        alert('Undefined type'); break;
                }
                $state.go(route);
            })
        }
    }
}


