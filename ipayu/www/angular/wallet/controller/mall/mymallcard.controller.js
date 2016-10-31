


walletModule.controller('myMallCardCtrl', MyMallCardCtrl)
walletModule.controller('myMallCardViewCtrl', MyMallCardViewCtrl)
walletModule.controller('mallCardSearch', MallCardSearch)
walletModule.controller('allMallCardSearch', AllMallCardSearch)


MyMallCardCtrl.$inject = ['$scope', 'walletData'];

function MyMallCardCtrl($scope, walletData) {
	$scope.lastUsed = walletData.getLastUserCards('mall');
	$scope.frequent = walletData.getFrequentUserCards('mall');
	$scope.mallCards = walletData.getUserCards('mall');
}

MyMallCardViewCtrl.$inject = ['$scope', '$rootScope', 'walletData', 'customService'];

function MyMallCardViewCtrl($scope, $rootScope, walletData, customService) {

	$scope.mallCards = customService.filterByCountry(walletData.getUserCards('mall'), $rootScope.countryDisplay.country, true);

    $scope.$watch('searchCountry.country',
                function(newValue, oldValue){
                	$scope.mallCards = customService.filterByCountry(walletData.getUserCards('mall'), $rootScope.countryDisplay.country, true);
                }
            )
}


MallCardSearch.$inject = ['$scope', '$rootScope', 'mallCardData', 'customService', 'accountData'];

function MallCardSearch($scope, $rootScope, mallCardData, customService, accountData) {

	var currentPage = 0;
	var pageSize = 10;
	var hasMore = false;
	$scope.featured_malls = customService.filterByCountry(mallCardData.getAssetsFeatured(), $rootScope.countryDisplay.country);
	$scope.unfeatured_malls = get_unfeatured();

	$scope.swipeLeft = function(){
		if(currentPage != 0){
			currentPage--;
		}
		$scope.unfeatured_malls = get_unfeatured();
	}

	$scope.moreIsClicked = function(){
		if(hasMore){
			currentPage++;
		}
		$scope.unfeatured_malls = get_unfeatured();
	}
	
	function get_unfeatured() {
		hasMore = false;
		var unfeatured_malls = customService.filterByCountry(mallCardData.getAssetsNonFeatured(), $rootScope.countryDisplay.country);
		var obj = customService.paginate(unfeatured_malls, 4, 4, currentPage, pageSize);
		hasMore = obj.has_more;
		console.log(obj);
		return obj.data;
	}

	$scope.proceedAssetsMallCard = function(card){


	}

    $scope.$watch('searchCountry.country',
                function(newValue, oldValue){
					$scope.featured_malls = customService.filterByCountry(mallCardData.getAssetsFeatured(), $rootScope.countryDisplay.country);
					$scope.unfeatured_malls = get_unfeatured();
                }
            )
}


AllMallCardSearch.$inject = ['$scope', '$rootScope', 'walletData', 'customService'];

function AllMallCardSearch($scope, $rootScope, walletData, customService) {

	$scope.searchData = '';
	$scope.searchResult = 0;
	var all_cards = walletData.getAllAvailableCards();
	$scope.allMallCards = contruct_data(all_cards);

	function contruct_data(data){
		scrollToTop();
		$scope.searchResult = 0;
		var all = [];
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
					$rootScope.mallCardTapped =  card;
					$state.go('addmallcard');
            	}
            }],
            overlay: true
        });
	}
	$scope.filterCards = function(){
		$scope.allMallCards = contruct_data(all_cards);
	}
    $scope.$watch('searchCountry.country',
    		function(newValue){
    			$scope.allMallCards = contruct_data(all_cards);
    		}
    	)

}