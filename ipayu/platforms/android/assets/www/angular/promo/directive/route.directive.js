

promoModule.directive('routePromoLanding', PromoLanding)    //	state = promolanding
promoModule.directive('routeAllPromos', AllPromos) // state = searchallpromos
promoModule.directive('routeSoloPromo', SoloPromo) // state = promosolopage
promoModule.directive('routeMyPromos', MyPromos) // state = promolist


// Landing
PromoLanding.$inject = ['$state', '$rootScope', 'preloaderMethod', 'promo', 'promoData', 'customService'];
function PromoLanding($state, $rootScope, preloaderMethod, promo, promoData, customService) {
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
	    						console.log(resolve, "Promo")

								var f = promoData.allFeatured(resolve[0].data.data.featured || [])
								var n = promoData.allUnfeatured(resolve[0].data.data.not_featured || [])
								var c = promoData.allCategories(resolve[0].data.data.categories || [])
	    						$state.go('promolanding');
								preloaderMethod.preloadImage([f || [], n || [], c || []]);
	    					})
	    		}
	    	})
	    }
	  }
}


AllPromos.$inject = ['$state', '$rootScope', 'preloaderMethod', 'promo', 'customService', 'accountData', 'promoData'];
function AllPromos($state, $rootScope, preloaderMethod, promo, customService, accountData, promoData) {
	return {
	    restrict: 'A',
	    link: function(scope, element, attrs, ctrl) {
	    	element.bind('click', function () {
	    		var user = accountData.getUser();
	    		var card = attrs.routeAllPromos;
	    		console.log(card)
	    			// if(attrs.routeAllPromos){
	    			// 	card = attrs.routeAllPromos;
	    			// }

	    		if($rootScope.showOffline){
	    			customService.alert('No internet connection', 'Oops!', 'Ok');
	    		}
	    		else{
	    			$rootScope.doLoading = true;
	    			var data = {};
	    				data.ipayu_id = user.ipayu_id;
	    				if(card != ''){
	    					data.asset_info_id = card;
	    				}
	    			promo.get_promos(data)
  					.then(function (resolve) {
  						if(resolve){
  							console.log(resolve, "all promos")
  							var a = promoData.allAvailableCards(resolve[0].data.data || []);
  							$state.go('searchallpromos');
							preloaderMethod.preloadImage([a || []]);
  						}
    				})
	    		}
	    	})
	    }
	  }
}


SoloPromo.$inject = ['$state', '$rootScope', 'promoData'];
function SoloPromo($state, $rootScope, promoData) {
	
	return {
		restrict: 'A',
		link: function(scope, element, attrs, ctrl) {
			element.bind('click', function(){
				var promo = JSON.parse(attrs.routeSoloPromo);
				promoData.promoInfo(promo);
				$rootScope.addPromo = true;
				$state.go('promosolopage')
			})
		}
	}

}

MyPromos.$inject = ['$state', '$rootScope', 'promoData', 'accountData', 'promo', 'preloaderMethod'];
function MyPromos($state, $rootScope, promoData, accountData, promo, preloaderMethod) {
	
	return {
		restrict: 'A',
		link: function(scope, element, attrs, ctrl) {
			element.bind('click', function(){
	    		if($rootScope.showOffline){
	    			customService.alert('No internet connection', 'Oops!', 'Ok');
	    		}
	    		else{
	    			var userInfo = accountData.getUser();
	    			$rootScope.doLoading = true;
	    			promo.my_promos({'ipayu_id':userInfo.ipayu_id})
  					.then(function (resolve) {
  						if(resolve){
  							var a = promoData.userPromos(resolve[0].data.data || []);
  							$state.go('promolist');
							preloaderMethod.preloadImage([a || []]);
  						}
    				})
	    		}
			})
		}
	}

}