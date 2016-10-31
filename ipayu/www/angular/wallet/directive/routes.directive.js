

// User Cards
walletModule.directive('routeMymallcard', Mymallcard)
walletModule.directive('routeMyshopcard', Myshopcard)
walletModule.directive('routeMycouponcard', Mycouponcard)
walletModule.directive('routeMystampcard', Mystampcard)

Mymallcard.$inject = ['$state', '$rootScope', 'preloaderMethod', 'accountData', 'wallet', 'walletData'];
function Mymallcard($state, $rootScope, preloaderMethod, accountData, wallet, walletData) {
	return {
	    restrict: 'A',
	    link: function(scope, element, attrs, ctrl) {
	    	element.bind('click', function () {
	    		if($rootScope.showOffline){
					$state.go('mymallcards');
	    		}
	    		else{
	    			$rootScope.doLoading = true;
	    			var ipayu_info = accountData.getUser();
	    			wallet.getUserCards({'ipayu_id'	: ipayu_info.ipayu_id, 'type'	: 'mall'})
	    				.then(function (resolve) {
	    					console.log(resolve)
	    					var u = walletData.setUserCards(resolve[0].data.data.all, 'mall');
	    					var f = walletData.setFrequentUserCards(resolve[0].data.data.frequently, 'mall');
	    					var l = walletData.setLastUserCards(resolve[0].data.data.last_used, 'mall');
							$state.go('mymallcards');
							preloaderMethod.preloadImage([u, f, l]);
	    				})
	    		}
	    	})
	    }
	  }
}

Myshopcard.$inject = ['$state', '$rootScope'];
function Myshopcard($state, $rootScope) {
	return {
	    restrict: 'A',
	    link: function(scope, element, attrs, ctrl) {
	    	element.bind('click', function () {
				$state.go('myshopcards');
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
walletModule.directive('routeMallcardSearch', MallcardSearch)

MallcardSearch.$inject = ['$state', '$rootScope', 'preloaderMethod', 'wallet', 'mallCardData', 'customService'];
function MallcardSearch($state, $rootScope, preloaderMethod, wallet, mallCardData, customService) {
	return {
	    restrict: 'A',
	    link: function(scope, element, attrs, ctrl) {
	    	element.bind('click', function () {
	    		if($rootScope.showOffline){
	    			customService.alert('No internet connection', 'Oops!', 'Ok');
	    		}
	    		else{
	    			$rootScope.doLoading = true;
	    			wallet.getAllHasCardAssets('mall')
	    					.then(function (resolve) {
								console.log(resolve);
								var f = mallCardData.setAssetsFeatured(resolve[0].data.data.featured)
								var n = mallCardData.setAssetsNonFeatured(resolve[0].data.data.not_featured)
	    						$state.go('mallsearch');
								preloaderMethod.preloadImage([f, n]);
	    					})
	    		}
	    	})
	    }
	  }
}

walletModule.directive('routeAllCardSearch', AllCardSearch)

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

walletModule.directive('routeAllAssetCards', AllAssetCards)

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

