

// User Cards
walletModule.directive('routeMycard', Mycard)					//	state = mymallcards OR myshopcards
walletModule.directive('routeMycouponcard', Mycouponcard)		//	state = mycouponcards
walletModule.directive('routeMystampcard', Mystampcard)			//	state = mystampcards

// Search Card
walletModule.directive('routeCardSearch', CardSearch)			//	state = mallsearch OR shopsearch
walletModule.directive('routeAllCardSearch', AllCardSearch)		//	state = allmallsearch OR allshopsearch
walletModule.directive('routeAllAssetCards', AllAssetCards)		//	state = allmallsearch OR allshopsearch

// Card Info
walletModule.directive('routeCardInfo', CardInfo)				// state = mallcardinfo OR shopcardinfo



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

Mycouponcard.$inject = ['$state', '$rootScope'];
function Mycouponcard($state, $rootScope) {
	return {
	    restrict: 'A',
	    link: function(scope, element, attrs, ctrl) {
	    	element.bind('click', function () {
				$state.go('mycouponcards');
	    	})
	    }
	  }
}

Mystampcard.$inject = ['$state', '$rootScope'];
function Mystampcard($state, $rootScope) {
	return {
	    restrict: 'A',
	    link: function(scope, element, attrs, ctrl) {
	    	element.bind('click', function () {
				$state.go('mystampcards');
	    	})
	    }
	  }
}


// Search Card
CardSearch.$inject = ['$state', '$rootScope', 'preloaderMethod', 'wallet', 'mallCardData', 'customService'];
function CardSearch($state, $rootScope, preloaderMethod, wallet, mallCardData, customService) {
	return {
	    restrict: 'A',
	    link: function(scope, element, attrs, ctrl) {
	    	element.bind('click', function () {

	    		var	type = attrs.routeCardSearch,
	    			route = (type == 'mall')? 'mallsearch':'shopsearch';

	    		if($rootScope.showOffline){
	    			customService.alert('No internet connection', 'Oops!', 'Ok');
	    		}
	    		else{
	    			$rootScope.doLoading = true;
	    			wallet.getAllHasCardAssets(type)
	    					.then(function (resolve) {
								console.log(resolve);
								var f = mallCardData.setAssetsFeatured(resolve[0].data.data.featured)
								var n = mallCardData.setAssetsNonFeatured(resolve[0].data.data.not_featured)
	    						$state.go(route);
								preloaderMethod.preloadImage([f, n]);
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
	    			route = (type == 'mall')?'allmallsearch':'allshopsearch';

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
	    			route = (card.type == 'mall')? 'allmallsearch':'allshopsearch';

	    		if($rootScope.showOffline){
	    			customService.alert('No internet connection', 'Oops!', 'Ok');
	    		}
	    		else{
	    			$rootScope.doLoading = true;
	    			wallet.getAllCardAvailableInEstablishment(user.ipayu_id, card.asset_info_id)
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

	    		var card = JSON.parse(attrs.routeCardInfo),
	    			route = (card.card_type == 'mall')? 'mallcardinfo':'shopcardinfo';

	    		if(attrs.noData){
	    			var cards 	= walletData.getUserCards(card.card_type),
	    				key 	= Object.keys(cards).filter(function(key){return (cards[key].card_id == card.card_id)}),
	    				card 	= cards[key];
	    		}

				walletData.setCardInfo(card)
				$state.go(route);

	    	})
	    }
	  }
}


