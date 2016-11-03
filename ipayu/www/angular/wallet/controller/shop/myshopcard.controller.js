

walletModule.controller('myShopCardCtrl', MyShopCardCtrl)
walletModule.controller('myShopCardViewCtrl', MyShopCardViewCtrl)
walletModule.controller('shopCardSearchCtrl', ShopCardSearch)
walletModule.controller('allShopCardSearchCtrl', AllShopCardSearch)


MyShopCardCtrl.$inject = ['$scope', 'walletData'];

function MyShopCardCtrl($scope, walletData) {
	$scope.lastUsed = walletData.getLastUserCards('shop');
	$scope.frequent = walletData.getFrequentUserCards('shop');
	$scope.shopCards = walletData.getUserCards('shop');
}


MyShopCardViewCtrl.$inject = ['$scope', '$rootScope', 'walletData', 'customService'];

function MyShopCardViewCtrl($scope, $rootScope, walletData, customService) {

	$scope.shopCards = customService.filterByCountry(walletData.getUserCards('shop'), $rootScope.countryDisplay.country, true);

    $scope.$watch('searchCountry.country',
                function(newValue, oldValue){
                	$scope.shopCards = customService.filterByCountry(walletData.getUserCards('shop'), $rootScope.countryDisplay.country, true);
                }
            )
}


ShopCardSearch.$inject = ['$scope', '$rootScope', 'walletData', 'customService', 'accountData'];

function ShopCardSearch($scope, $rootScope, walletData, customService, accountData) {

	var currentPage = 0,
		pageSize = 7,
		hasMore = false,
		selectedCategory = '';

	$scope.featured_shops = get_featured();
	$scope.unfeatured_shops = get_unfeatured();
	$scope.categories = walletData.getCategories();

	$scope.swipeLeft = function(){
		if(currentPage != 0){
			currentPage--;
		}
		$scope.unfeatured_shops = get_unfeatured();
	}

	$scope.moreIsClicked = function(){
		if(hasMore){
			currentPage++;
		}
		$scope.unfeatured_shops = get_unfeatured();
	}
	
	function get_unfeatured() {
		hasMore = false;
		var filtered_category = customService.filterByCategory(walletData.getAssetsNonFeatured(), selectedCategory);
		var unfeatured_shops = customService.filterByCountry(filtered_category, $rootScope.countryDisplay.country);
		var obj = customService.paginate(unfeatured_shops, 4, 4, currentPage, pageSize, true);
		hasMore = obj.has_more;
		return obj.data;
	}

	function get_featured(){
		var filtered_category = customService.filterByCategory(walletData.getAssetsFeatured(), selectedCategory);
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
		console.log($scope.categories)
		// selectedCategory = value;
		currentPage = 0;
		$scope.featured_shops = get_featured();
		$scope.unfeatured_shops = get_unfeatured();
	}

    $scope.$watch('searchCountry.country',
                function(newValue, oldValue){
                	$scope.featured_shops = get_featured();
					$scope.unfeatured_shops = get_unfeatured();
                }
            )
}


AllShopCardSearch.$inject = ['$scope', '$rootScope', 'walletData', 'customService'];

function AllShopCardSearch($scope, $rootScope, walletData, customService) {

	$scope.searchData = '';
	$scope.searchResult = 0;
	var all_cards = walletData.getAllAvailableCards();
	$scope.allShopCards = contruct_data(all_cards);

	function contruct_data(data){
		scrollToTop();
		$scope.searchResult = 0;
		var firstLetter = '';
		var group = customService.groupByFirstLetter(data, $rootScope.searchCountry.country, $scope.searchData);
		var tempFirstLetter = '';

		for (var i = 0; i < group.length; i++) {
			for (var x = 0; x < data.length; x++) {
				var pos = data[x].name.toLowerCase().indexOf($scope.searchData.toLowerCase());
				var checkFirstLetter = data[x].name.substr(0, 1).toUpperCase().match('[A-Z]');
				if(!checkFirstLetter){
					tempFirstLetter = 'num';
				}
				else{
					tempFirstLetter = data[x].name.substr(0, 1).toUpperCase();
				}
				if(group[i][0] == tempFirstLetter && data[x].country == $rootScope.searchCountry.country && pos == 0) {
					$scope.searchResult++;
					var rows = group[i][1].length;
					var columnsInRow = group[i][1][rows-1].length;
					if(columnsInRow == 2) {
						group[i][1][rows] = [];
						group[i][1][rows].push(data[x]);
					}
					else {
						group[i][1][rows-1].push(data[x]);
					}
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
    };
	$scope.alreadyAdded = function(){
		customService.alert('Card already added.')
	}
	$scope.tapped = function ( card ) {
		ngDialog.open({
            template: 'confirmAlert',
            className: 'ngdialog-theme-plain add-card-custom',
            controller: ['$scope', function ($scope) {
            	$scope.closeThisDialog = function () {
            		card.country_code = $rootScope.countryDisplay.name;
					card.country = $rootScope.searchCountry.country;
					$rootScope.shopCardTapped =  card;
					$state.go('addshopcard');
            	}
            }],
            overlay: true
        });
	}
	$scope.filterCards = function(){
		$scope.allShopCards = contruct_data(all_cards);
	}
    $scope.$watch('searchCountry.country',
    		function(newValue){
    			$scope.allShopCards = contruct_data(all_cards);
    		}
    	)
}