


walletModule.controller('myMallCardCtrl', MyMallCardCtrl)
walletModule.controller('myMallCardViewCtrl', MyMallCardViewCtrl)
walletModule.controller('mallCardSearchCtrl', MallCardSearch)
walletModule.controller('allMallCardSearchCtrl', AllMallCardSearch)
walletModule.controller('mallCardInfoCtrl', MallCardInfoCtrl)


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


MallCardSearch.$inject = ['$scope', '$rootScope', 'walletData', 'customService', 'accountData'];

function MallCardSearch($scope, $rootScope, walletData, customService, accountData) {

	var currentPage = 0;
	var pageSize = 10;
	var hasMore = false;
	$scope.featured_malls = customService.filterByCountry(walletData.getAssetsFeatured(), $rootScope.countryDisplay.country);
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
		var unfeatured_malls = customService.filterByCountry(walletData.getAssetsNonFeatured(), $rootScope.countryDisplay.country);
		var obj = customService.paginate(unfeatured_malls, 4, 4, currentPage, pageSize);
		hasMore = obj.has_more;
		console.log(obj);
		return obj.data;
	}

    $scope.$watch('searchCountry.country',
                function(newValue, oldValue){
					$scope.featured_malls = customService.filterByCountry(walletData.getAssetsFeatured(), $rootScope.countryDisplay.country);
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


MallCardInfoCtrl.$inject = ['$scope', '$rootScope', 'walletData', '$window', 'ngDialog'];
function MallCardInfoCtrl($scope, $rootScope, walletData, $window, ngDialog) {

	$scope.card = walletData.getCardInfo();
	$scope.transactions = $scope.card.transactions;
	$scope.redeems = $scope.card.redeemables;
    $scope.redeem = true;
    $scope.transaction = false;

    var dateNow = new Date(),
    	d = dateNow.getDate(),
    	m = dateNow.getMonth() + 1,
    	y = dateNow.getFullYear();

    $scope.dateFilter = {
        'mindate' : m-1+'/'+d+'/'+y,
        'maxdate' : m+'/'+d+'/'+y,
    }

    $scope.redeemItem = function (redeemables) {

        ngDialog.open({
            template: 'redeemmodal',
            className: 'ngdialog-theme-plain profile-cutom-bg',
            controller: ['$scope', '$timeout', 'accountData', 'walletData', 
            			function ($scope, $timeout, accountData, walletData) {

                $scope.card = walletData.getCardInfo();
                var ipayu_info 	= accountData.getUser(),
                	balance 	= (redeemables.points_type == 'reward')?$scope.card.rewards_balance:$scope.card.rebates_balance;

                $scope.redeemData 	= {};
                $scope.cardId 		= redeemables.card_id;
                $scope.rewardsID 	= redeemables.redeemable_id;
                $scope.type 		= redeemables.card_type;
                $scope.point_value	= redeemables.point_value;
                $scope.quantity  	= redeemables.stock;
                $scope.image      	= redeemables.image;
                $scope.q_remaining 	= parseInt(redeemables.remaining_stock);

                $scope.isClick = false;
                $scope.isRedeemed = false;
                $scope.isSuccessful = false;
                $scope.isDisabled = false;
                $scope.counter = 0;
                $scope.belowZero = false;
                $scope.moreThanQuantity = false;
                $scope.isLoading = false;

                $scope.increment = function () {
                    $scope.belowZero = false;
                    var checker = false;
                    var temp_counter = angular.copy($scope.counter) + 1;
                    if(!isNaN($scope.q_remaining)){
                        if( temp_counter > $scope.q_remaining ){
                            checker = true;
                        }
                    }
                    else{
                        if( temp_counter > $scope.quantity ){
                            checker = true;
                        }
                    }
                    if(($scope.point_value * temp_counter) > balance){
                        checker = true;
                        alert('Not enough points')
                    }
                    if( checker ) {
                        $scope.moreThanQuantity = true;
                    }
                    else{
                        $scope.counter++;
                    }
                };

                $scope.decrement = function () {
                    $scope.moreThanQuantity = false;
                    if($scope.counter > 0) {
                        $scope.counter -= 1;
                    }
                    else if($scope.counter <= 0) {
                        $scope.belowZero = true;
                    }
                };

                $scope.redeem = function () {
                    if($scope.counter > 0) {
                        $scope.isClick = true;
                    }
                };

                function doRedeem(){
                	console.log('do redeem')
                    // mallCardFactory.addRedeemRewardsGift(ipayu_info.ipayu_id, $scope.redeemData)
                    // .then(
                    //     function success(response) {
                    //         if(response.data.success) {
                    //             $scope.isClick = false;
                    //             $scope.isRedeemed = true;
                    //             $scope.isLoading = false;
                    //             $scope.card.rewards_balance = newPointsBalance($scope.card.rewards_balance, $scope.redeemData.point_value, $scope.counter);
                    //             dataManager.addCardInfo($rootScope.cardInfo);

                    //             mallCardFactory.updateUserHasCardsPoints($scope.redeemData.user_has_card_id,$scope.t)
                    //             .then(
                    //                 function success(res) {
                    //                     getTransactionsFromDB($stateParams.cardId);
                    //                     // getTransactions($stateParams.cardId);
                    //                     // getCards();
                    //                     // getDashboardData();
                    //                 },
                    //                 function error(res){
                    //                     console.log(res);
                    //                 }
                    //             )
                    //         }
                    //         else {
                    //            console.log(response);
                    //         }
                    //     },
                    //     function error(response){
                    //         console.log(response);
                    //     }
                    // )
                }

                function newPointsBalance(points_balance, point_value, counter){
                    return Math.round(points_balance - (point_value * counter)).toString().split('.')[0];
                }

                $scope.confirmRedeem = function () {
                	console.log('confirmRedeem')
                    // mallCardFactory.getTransactionInfo(ipayu_info.ipayu_id, cardId)
                    //     .then(
                    //             function success(response){
                    //                 $rootScope.cardInfo = response.data.cardData;
                    //                 $scope.redeemData.rewardsgift_id    = $scope.rewardsID;
                    //                 $scope.redeemData.mall_card_id      = $scope.cardId;
                    //                 $scope.redeemData.type              = $scope.type;
                    //                 $scope.redeemData.point_value       = parseFloat($scope.point_value);
                    //                 $scope.redeemData.quantity          = parseInt($scope.counter);
                    //                 $scope.redeemData.items_remaining   = parseInt($scope.q_remaining - $scope.counter);
                    //                 $scope.redeemData.date_redeemed     = (new Date()).toISOString().substring(0, 10);
                    //                 $scope.redeemData.user_has_card_id  = $rootScope.cardInfo.user_has_card_id;
                    //                 $scope.redeemData.balance           = $scope.card.rewards_balance - ($scope.redeemData.point_value * $scope.counter);
                    //                 $scope.redeemData.points_redeem     = $scope.redeemData.point_value * $scope.counter;
                    //                 $scope.redeemData.timestamp         = new Date();
                    //                 $scope.t = newPointsBalance($scope.card.rewards_balance, $scope.redeemData.point_value, $scope.counter);
                    //                 $scope.isLoading = true;
                    //                 doRedeem();
                    //             },
                    //             function(error){

                    //             }
                    //         )

                };

                $scope.cancelRedeem = function () {
                    $scope.isClick = false;
                };
            }],
            overlay: true
        });
    }
}








