

promoModule.controller('promoLandingCtrl', PromoLanding)
promoModule.controller('allPromoSearchCtrl', AllPromoSearch)
promoModule.controller('promoSoloCtrl', PromoSolo)
promoModule.controller('promoListCtrl', PromoList)
promoModule.controller('reservePromoCtrl', ReservePromo)
promoModule.controller('confirmDeleteCtrl', ConfirmDelete)



PromoLanding.$inject = ['$scope', '$rootScope', 'customService', 'promoData'];
function PromoLanding($scope, $rootScope, customService, promoData) {

    var currentPage = 0,
		pageSize = 7,
		hasMore = false,
		selectedCategory = '';
    
    $scope.myInterval = 3000;
    $scope.slides = [
        {
          image: 'http://www.everythingcebu.com/wp-content/uploads/2014/05/Sun-Sational-Summer-Robinsons-Supermarket-Raffle-Prizes.jpg'
        },
        {
          image: 'https://4.bp.blogspot.com/-mMpD4MITRK8/VxH5jOM_xwI/AAAAAAAAJcM/w97m4AhxK-cGr6efSr_9J_wgE3m9qYb2gCLcB/s1600/Smart%2BUCT100.jpg'
        },
        {
          image: 'http://promos.watimbox.com/wp-content/uploads/2016/07/rustans.jpg'
        },
        {
          image: 'http://www.contestsandpromos.com/wp-content/uploads/2011/03/east-west-greenwich-promo.jpg'
        }
      ];

	$scope.featured = get_featured();
	$scope.unfeatured = get_unfeatured();
	$scope.categories = promoData.allCategories();
	$scope.swipeLeft = function(){
		if(currentPage != 0){
			currentPage--;
		}
		$scope.unfeatured = get_unfeatured();
	}

	$scope.moreIsClicked = function(){
		if(hasMore){
			currentPage++;
		}
		$scope.unfeatured = get_unfeatured();
	}

	function get_unfeatured() {
		hasMore = false;
		var filtered_category = customService.filterByCategory(promoData.allUnfeatured(), selectedCategory);
		var unfeatured = customService.filterByCountry(filtered_category, $rootScope.countryDisplay.country);
		var obj = customService.paginate(unfeatured, 4, 4, currentPage, pageSize, true);
		hasMore = obj.has_more;
		return obj.data;
	}

	function get_featured(){
		var filtered_category = customService.filterByCategory(promoData.allFeatured(), selectedCategory);
		var featured = customService.filterByCountry(filtered_category, $rootScope.countryDisplay.country);
		return featured;
	}

	$scope.selectCategory = function(value){
		for (var i = 0; i < $scope.categories.length; i++) {
			if($scope.categories[i].name == value){
				if($scope.categories[i].selected == false || !$scope.categories[i].selected){
					$scope.categories[i].selected = true;
				}
				else{
					$scope.categories[i].selected = false;
					value = '';
				}
			}
			else{
				$scope.categories[i].selected = false;
			}
		}
		selectedCategory = value;
		currentPage = 0;
		$scope.featured = get_featured();
		$scope.unfeatured = get_unfeatured();
	}
    
    $rootScope.$on('countryHasChange', function(event, country){
		$scope.featured = get_featured();
		$scope.unfeatured = get_unfeatured();
    })

}


AllPromoSearch.$inject = ['$scope', '$rootScope', 'promoData', 'customService', 'ngDialog'];
function AllPromoSearch($scope, $rootScope, promoData, customService, ngDialog) {

	$scope.searchData = '';
	$scope.searchResult = 0;
	$scope.selectedCat = '';
	$scope.categories = promoData.allCategories();
	var all_cards = promoData.allAvailableCards();
	$scope.allPromos = contruct_data(all_cards);

	function contruct_data(data){
		var newData = customService.filterByCategory(data, $scope.selectedCat)
		scrollToTop();
		$scope.searchResult = 0;
		var firstLetter = '';
		var group = customService.groupByFirstLetter(newData, $rootScope.searchCountry.country, $scope.searchData, true);
		var tempFirstLetter = '';

		for (var i = 0; i < group.length; i++) {
			for (var x = 0; x < newData.length; x++) {
				var pos = newData[x].name.toLowerCase().indexOf($scope.searchData.toLowerCase());
				var checkFirstLetter = newData[x].name.substr(0, 1).toUpperCase().match('[A-Z]');
				if(!checkFirstLetter){
					tempFirstLetter = 'num';
				}
				else{
					tempFirstLetter = newData[x].name.substr(0, 1).toUpperCase();
				}
				if(group[i][0] == tempFirstLetter && newData[x].country == $rootScope.searchCountry.country && pos == 0) {
					$scope.searchResult++;
					group[i][1].push(newData[x]);
				}
			}
		}
		return group;
	}
	function scrollToTop(){
		$("#allcardssearch").animate({
	            scrollTop : 0
	        }, { duration: 'medium', easing: 'swing' });
	}
	$scope.scrollUp = function (id) {
		var innerElement = $("#"+id);
		if(innerElement.length) {
			var f = $("#"+id).offset().top,
	      		s = $("#allcardssearch").scrollTop(),
	      		d = $("#allcardssearch").position().top;

	        var pos = f + s - d;

	        $("#allcardssearch").animate({
	            scrollTop : pos
	        }, { duration: 'medium', easing: 'swing' });
		}
    }
	$scope.filterCards = function(){
		$scope.allPromos = contruct_data(all_cards);
	}
	$scope.selected = function(category){
		$scope.selectedCat = category;
		$scope.allPromos = contruct_data(all_cards);
	}
    
    $rootScope.$on('countryHasChange', function(event, country){
    	$scope.allPromos = contruct_data(all_cards);
    })
}

PromoSolo.$inject = ['$scope', '$rootScope', 'promoData', 'customService', '$state', 'accountData', 'promo', 'ngDialog'];
function PromoSolo($scope, $rootScope, promoData, customService, $state, accountData, promo, ngDialog) {

	if(!$rootScope.addPromo){
		redirect()
	}
	$rootScope.addPromo = false;

	$scope.promoInfo = promoData.promoInfo();
	$scope.promoSoloEmit = 'expiredPromo';
	var userInfo = accountData.getUser();

	$scope.$on($scope.promoSoloEmit, function(){
		$scope.promoInfo.expired = true;
	})

	$scope.reservePromo = function(){
        
        var dataToSend = {
            'ipayu_id'		: userInfo.ipayu_id,
            'promo_card_id'	: $scope.promoInfo.promo_card_id
        }
		if($scope.promoInfo.expired == true){
			customService.alert('This promo is already expired')
            return;
		}
        
        ngDialog.open({
            template: 'reservemodal.html',
            className: 'ngdialog-theme-plain profile-cutom-bg',
            controller: 'reservePromoCtrl',
            resolve: {
                formData: function(){
                    return dataToSend;
                },
                thisPromo: function(){
                    return $scope.promoInfo;
                }
            },
            overlay: true
        });
        
	}
    
	function redirect(){
		angular.element(document.getElementById('tomypromos')).click();
	}
}

ReservePromo.$inject=  ['$scope', '$rootScope', 'promo', 'formData', 'thisPromo', 'customService'];
function ReservePromo($scope, $rootScope, promo, formData, thisPromo, customService) {
    
    $scope.quantity = 0;
    $scope.done = false;
    $scope.thisPromo = thisPromo;
    
    $scope.decrement = function(){
        if($scope.quantity > 0){
            $scope.quantity--;
        }
    }
    
    $scope.increment = function(){
        if($scope.quantity < thisPromo.remaining_stock) {
            $scope.quantity++;
        }
    }
    
    $scope.reserve = function(){
        if($scope.quantity == 0){
            return 0;
        }
		if(thisPromo.expired == true){
			customService.alert('This promo is already expired')
		}
		else {
            formData.quantity = $scope.quantity;
            formData.datetime_reserved = Date.parse(new Date());
            
			promo.reserve(formData)
			.then(function(resolve){
				if(resolve && resolve[0].data.success == true) {
                    $scope.done = true;
				}
			})
		}
        
        $scope.continue = function(){
            angular.element(document.getElementById('tomypromos')).click();
        }

    }
}

PromoList.$inject = ['$scope', '$rootScope', 'promoData', 'customService', 'accountData', 'promo', 'ngDialog'];
function PromoList($scope, $rootScope, promoData, customService, accountData, promo, ngDialog) {

	$scope.promos = promoData.userPromos();
	$scope.emitMessage = 'finishPromoList';
	console.log($scope.promos)

	$scope.$on($scope.emitMessage, function(event) {
		var sw = Swiped.init({
	        query: '.swipeswipe li div.swipable',
	        list: true,
	        right: 100
	    });
	});

	$scope.remove = function(id) {
        ngDialog.open({
            template: 'confirmRemoveItem',
            className: 'ngdialog-theme-plain profile-cutom-bg',
            controller: 'confirmDeleteCtrl',
            resolve: {
                id: function(){
                	return id;
                },
                message: function() {
                	return 'Delete this item?';
                }
            },
            overlay: true
        });
	}

}

ConfirmDelete.$inject=  ['$scope', '$rootScope', 'promo', 'id', 'message', 'ngDialog'];
function ConfirmDelete($scope, $rootScope, promo, id, message, ngDialog) {

	$scope.message = message;
	
	$scope.delete = function() {
		promo.deleteItem({'reservation_id':id})
		.then(function(resolve){
			ngDialog.closeAll();
		})
	}

	$scope.cancel = function(){
		ngDialog.closeAll();
	}

}