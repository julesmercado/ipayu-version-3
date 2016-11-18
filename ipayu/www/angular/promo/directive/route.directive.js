

promoModule.directive('routePromoLanding', PromoLanding)    //	state = promolanding
promoModule.directive('routePromoAllAssetPromos', AllAssetPromos) // state = searchallpromos
walletModule.directive('routeAllPromoSearch', AllPromoSearch)	// state = searchallpromos

// Landing
PromoLanding.$inject = ['$state', '$rootScope', 'preloaderMethod', 'promo', 'walletData', 'customService'];
function PromoLanding($state, $rootScope, preloaderMethod, promo, walletData, customService) {
	return {
	    restrict: 'A',
	    link: function(scope, element, attrs, ctrl) {
	    	element.bind('click', function () {

	    		if($rootScope.showOffline){
	    			customService.alert('No internet connection', 'Oops!', 'Ok');
	    		}
	    		else{
	    			$rootScope.doLoading = true;
	    			promo.get_malls()
	    					.then(function (resolve) {
console.log(resolve)
								// var f = walletData.setAssetsFeatured(resolve[0].data.data.featured || [])
								// var n = walletData.setAssetsNonFeatured(resolve[0].data.data.not_featured || [])
								// var c = walletData.setCategories(resolve[1].data.data || [])
	    					// 	$state.go('promolanding');
								// preloaderMethod.preloadImage([f || [], n || [], c || []]);
	    					})
	    		}
	    	})
	    }
	  }
}


AllAssetPromos.$inject = ['$state', '$rootScope', 'preloaderMethod', 'promo', 'customService', 'accountData', 'walletData'];
function AllAssetPromos($state, $rootScope, preloaderMethod, promo, customService, accountData, walletData) {
	return {
	    restrict: 'A',
	    link: function(scope, element, attrs, ctrl) {
	    	element.bind('click', function () {
	    		var user = accountData.getUser(),
	    			card = JSON.parse(attrs.routePromoAllAssetPromos);

	    		if($rootScope.showOffline){
	    			customService.alert('No internet connection', 'Oops!', 'Ok');
	    		}
	    		else{
	    			$rootScope.doLoading = true;
	    			promo.get_promos({'asset_info_id': card.asset_info_id, 'ipayu_id':user.ipayu_id})
  					.then(function (resolve) {
  						if(resolve){
  							var a = promoData.setAllAvailableCards(resolve[0].data.data || []);
  							$state.go('searchallpromos');
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



AllPromoSearch.$inject = ['$state', '$rootScope', 'preloaderMethod', 'wallet', 'walletData', 'customService', 'accountData'];
function AllPromoSearch($state, $rootScope, preloaderMethod, wallet, walletData, customService, accountData) {
	return {
	    restrict: 'A',
	    link: function(scope, element, attrs, ctrl) {
	    	element.bind('click', function () {
	    		var user = accountData.getUser();

	    		if($rootScope.showOffline){
	    			customService.alert('No internet connection', 'Oops!', 'Ok');
	    		}
	    		else{
	    			$rootScope.doLoading = true;
	    			wallet.getAllCardAvailable(user.ipayu_id)
	    					.then(function (resolve) {
	    						if(resolve){
                                    console.log(resolve)
                                    var a = walletData.setAllAvailableCards(resolve[0].data.data || []);
                                    $state.go('searchallpromos');
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
