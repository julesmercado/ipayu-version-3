

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

// Redeem History
walletModule.directive('routeRedeemHistory', RedeemHistory)     // state = redeemhistory
walletModule.directive('routeItemLocation', ItemLocation)     // state = itemlocation


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
	    					console.log( resolve )
	    					if(resolve){
		    					var u = walletData.userCards(type,[]);/*resolve[0].data.data.all ||*/
		    					var f = walletData.frequentUserCards(type, []); /*resolve[0].data.data.frequently ||*/
		    					var l = walletData.lastUserCards(type, []); /*resolve[0].data.data.last_used || */
								$state.go(route);
								preloaderMethod.preloadImage([u || [], f || [], l || []]);
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
			                	var m = couponData.userCoupons(resolve[0].data.data.allcoupons || []);
			                	var f = couponData.featuredCoupons(resolve[0].data.data.featuredcoupons || []);
			                	var u = couponData.usedCoupons(resolve[0].data.data.usedcoupons || []);
								$state.go('mycouponcards');
								preloaderMethod.preloadImage([m || [], f || [], u || []]);
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
			                	var m = stampData.userStamps(resolve[0].data.data.allstamps || []);
			                	var f = stampData.featuredStamps(resolve[0].data.data.featuredstamps || []);
			                	var u = stampData.usedStamps(resolve[0].data.data.usedstamps || []);
								$state.go('mystampcards');
								preloaderMethod.preloadImage([m || [], u || [], f || []]);
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
                        route = 'couponsearch';  type = ''; break;
                    case 'stamp':
                        route = 'stampsearch'; type = ''; break;
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
								var f = walletData.assetsFeatured(type, resolve[0].data.data.featured || [])
								var n = walletData.assetsNonFeatured(type, resolve[0].data.data.not_featured || [])
								var c = walletData.categories(resolve[1].data.data || [])
	    						$state.go(route);
								preloaderMethod.preloadImage([f || [], n || [], c || []]);
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
                                    console.log(resolve)
                                    var a = walletData.allAvailableCards(type, resolve[0].data.data || []);
                                    $state.go(route);
                                    preloaderMethod.preloadImage([a || []]);
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
	    			wallet.getAllCardAvailableInEstablishment(user.ipayu_id, card.asset_info_id, type)
	    					.then(function (resolve) {
	    						if(resolve){
	    							var a = walletData.allAvailableCards(type, resolve[0].data.data || []);
	    							$state.go(route);
									preloaderMethod.preloadImage([a || []]);
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
CardInfo.$inject = ['$state', '$rootScope', 'walletData', 'accountData', 'wallet', 'preloaderMethod'];
function CardInfo($state, $rootScope, walletData, accountData, wallet, preloaderMethod) {
	return {
	    restrict: 'A',
	    link: function(scope, element, attrs, ctrl) {
	    	element.bind('click', function () {

	    		var ipayu_info 	= accountData.getUser(),
                    data= JSON.parse(attrs.routeCardInfo),
	    			route   = (attrs.cardType == 'mall')? 'mallcardinfo':'shopcardinfo',
	    			cards 	= walletData.userCards(attrs.cardType),
    				key 	= Object.keys(cards).filter(function(key){return (cards[key].card_id == data.card_id)}),
    				card 	= cards[key];

				walletData.cardInfo(attrs.cardType, card)
                
                if(!$rootScope.showOffline){
                    $rootScope.doLoading = true;
                    wallet.getUserCards({'ipayu_id'	: ipayu_info.ipayu_id, 'type'	: card.card_type})
                        .then(function(resolve){
                            if(resolve){
                            	
                                var u = walletData.userCards(attrs.cardType, resolve[0].data.data.all, card.card_type);
                                var f =walletData.frequentUserCards(attrs.cardType, resolve[0].data.data.frequently, card.card_type);
                                var l =walletData.lastUserCards(attrs.cardType, resolve[0].data.data.last_used, card.card_type);

			                    $state.transitionTo(route, {}, { 
			                      reload: true, inherit: false, notify: true
			                    });

                                preloaderMethod.preloadImage([u || [], f || [], l || []]);
                            }
                        })
                }
                else{
                    $state.transitionTo(route, {}, { 
                      reload: true, inherit: false, notify: true
                    });
                }

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

// Redeem History
RedeemHistory.$inject = ['$state', '$rootScope', 'customService', 'accountData', 'wallet', 'walletData', 'preloaderMethod'];
function RedeemHistory ($state, $rootScope, customService, accountData, wallet, walletData, preloaderMethod) {
    return {
        restrict:   'A',
        link:   function (scope, element, attrs, ctrl) {
            element.bind('click', function () {
                
	    		var user = accountData.getUser();
                
	    		if($rootScope.showOffline){
                    $state.go('redeemhistory');
	    		}
                else{
                    $rootScope.doLoading = true;
                    wallet.redeemHistory({'ipayu_id' : user.ipayu_id})
                        .then(function(resolve){
                            if(resolve){
                                var r = walletData.redeemHistory(resolve[0].data.data);
                                preloaderMethod.preloadImage([r || []]);
                                $state.go('redeemhistory');
                            }
                        })
                }
                
                
            })
        }
    }
}


// Item Location
ItemLocation.$inject = ['$state', 'wallet', 'walletData', '$rootScope'];
function ItemLocation ($state, wallet, walletData, $rootScope) {
    return {
        restrict:   'A',
        link: function (scope, element, attrs, ctrl) {
            element.bind('click', function () {
                var asset_id = attrs.routeItemLocation,
                    item = JSON.parse(attrs.item);
                walletData.itemInfo(item);
                if($rootScope.showOffline){
                    customService.alert('No internet connection', 'Oops!', 'Ok');
                }
                else{
                    wallet.redeemBranches({'asset_info_id':asset_id})
                            .then(function(resolve){
                                if(resolve){
                                    var a = walletData.itemLocation('', resolve[0].data.data);
                                    $state.go('itemlocation', {'id':item.redeemable_id})
                                }
                            })
                }
            })
        }
    }
}


