

promoModule.controller('promoLandingCtrl', PromoLanding)
promoModule.controller('allPromoSearchCtrl', AllPromoSearch)
promoModule.controller('promoSoloCtrl', PromoSolo)
promoModule.controller('promoListCtrl', PromoList)

PromoLanding.$inject = ['$scope', '$rootScope', 'customService', 'promoData'];
function PromoLanding($scope, $rootScope, customService, promoData) {

    var currentPage = 0,
		pageSize = 7,
		hasMore = false,
		selectedCategory = '';

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

PromoSolo.$inject = ['$scope', '$rootScope', 'promoData', 'customService', '$state', 'accountData', 'promo'];
function PromoSolo($scope, $rootScope, promoData, customService, $state, accountData, promo) {

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
		if($scope.promoInfo.expired == true){
			customService.alert('This promo is already expired')
		}
		else {
			var dataToSend = {
				'ipayu_id'		: userInfo.ipayu_id,
				'promo_card_id'	: $scope.promoInfo.promo_card_id,
				'datetime_reserved'	: Date.parse(new Date()),
				'quantity'		: 1
			}

			promo.reserve(dataToSend)
			.then(function(resolve){
				if(resolve){
					alert(resolve[0].data.message);
					if(resolve[0].data.success == true){
						redirect();
					}
				}
			})

		}
	}
	function redirect(){
		angular.element(document.getElementById('tomypromos')).click();
	}
}

PromoList.$inject = ['$scope', '$rootScope', 'promoData', 'customService', 'accountData', 'promo'];
function PromoList($scope, $rootScope, promoData, customService, accountData, promo) {

	$scope.promos = promoData.userPromos();

	console.log($scope.promos)

}