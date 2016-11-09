


walletModule.controller('myMallCardCtrl', MyMallCardCtrl)
walletModule.controller('myMallCardViewCtrl', MyMallCardViewCtrl)
walletModule.controller('mallCardSearchCtrl', MallCardSearch)
walletModule.controller('allMallCardSearchCtrl', AllMallCardSearch)
walletModule.controller('mallCardInfoCtrl', MallCardInfoCtrl)
walletModule.controller('addMallCardCtrl', AddMallCardCtrl)


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

	$scope.moreIsClicked = function() {
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
                function (newValue, oldValue) {
					$scope.featured_malls = customService.filterByCountry(walletData.getAssetsFeatured(), $rootScope.countryDisplay.country);
					$scope.unfeatured_malls = get_unfeatured();
                }
            )
}

AllMallCardSearch.$inject = ['$scope', '$rootScope', 'walletData', 'customService', 'ngDialog'];
function AllMallCardSearch($scope, $rootScope, walletData, customService, ngDialog) {

	$scope.searchData = '';
	$scope.searchResult = 0;
	var all_cards = walletData.getAllAvailableCards();
	$scope.allMallCards = contruct_data(all_cards);
	console.log($scope.allMallCards)

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
            controller: 'addCardModalCtrl',
            resolve: {
            	card: function(){
            		return card;
            	},
            	destination: function(){
            		return 'addmallcard';
            	}
            },
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


MallCardInfoCtrl.$inject = ['$scope', '$rootScope', 'walletData', '$window', 'ngDialog', 'wallet', 'accountData'];
function MallCardInfoCtrl($scope, $rootScope, walletData, $window, ngDialog, wallet, accountData) {

	$scope.card = walletData.getCardInfo();
	$scope.transactions = $scope.card.transactions;
	$scope.redeems = $scope.card.redeemables;
    $scope.redeem = true;
    $scope.transaction = false;

    var ipayu_info 	= accountData.getUser(),
        dateNow = new Date(),
    	d = dateNow.getDate(),
    	m = dateNow.getMonth() + 1,
    	y = dateNow.getFullYear();

    $scope.dateFilter = {
        'mindate' : m-1+'/'+d+'/'+y,
        'maxdate' : m+'/'+d+'/'+y,
    }

    $scope.redeemItem = function (item) {
        ngDialog.open({
            template: 'redeemmodal',
            className: 'ngdialog-theme-plain profile-cutom-bg',
            controller: 'redeemModalCtrl',
            resolve: {
		        redeemable: function() {
		            return item;
		        }
		    },
            overlay: true
        });
    }

    $scope.seeInfo = function (tran) {
    	console.log(tran)
    }
    
    $rootScope.$on('updateData', function(event){
        console.log(event);
        wallet.getUserCards({'ipayu_id'	: ipayu_info.ipayu_id, 'type'	: 'mall'})
            .then(function(resolve){
                if(resolve){
                    var cards = resolve[0].data.data.all;
                    var card = {};
                    for(var i = 0; i < cards.length; i++){
                        if(cards[i].card_id == $scope.card.card_id){
                            card = cards[i];
                            break;
                        }
                    }
                    $scope.card = card;
                    $scope.transactions = card.transactions;
                    $scope.redeems = card.redeemables;
                    
                	walletData.setUserCards(resolve[0].data.data.all, card.card_type);
                	walletData.setFrequentUserCards(resolve[0].data.data.frequently, card.card_type);
                	walletData.setLastUserCards(resolve[0].data.data.last_used, card.card_type);
                }
            })
    })
}


AddMallCardCtrl.$inject = ['$scope', '$rootScope', '$state', 'ngDialog', 'walletData', 'accountData', 'wallet'];
function AddMallCardCtrl($scope, $rootScope, $state, ngDialog, walletData, accountData, wallet) {

	var thisCard = walletData.getCardToAdd();
	var ipayu_info = accountData.getUser();
    $scope.emitMessage = 'addMallCard';
    $scope.cardType = 'mall';
    $scope.thisCard = thisCard;

	if(!thisCard){
		$state.go('mymallcards')
		return;
	}
    
    $scope.$on($scope.emitMessage, function (event, cardDetails) {
        wallet.addCard(cardDetails)
        	.then(function(resolve){
        		if(!resolve[0].data.success){
        			pop_up(resolve[0].data.success, "Something went wrong. Please try again");
        			$scope.disableBtn = false;
        			return;
        		}
        		wallet.getUserCards({'ipayu_id'	: ipayu_info.ipayu_id, 'type'	: 'mall'})
        			.then(function(user_card){
        				$scope.disableBtn = false;
        				if(user_card){
        					walletData.setCardToAdd(false);
	        				walletData.setUserCards(user_card[0].data.data.all, 'mall');
		                	walletData.setFrequentUserCards(user_card[0].data.data.frequently, 'mall');
		                	walletData.setLastUserCards(user_card[0].data.data.last_used, 'mall');
		                	pop_up(resolve[0].data.success, "Card Successfully added")
        				}
        				else{$rootScope.doLoading = false;}
        			})
        	})
    })

    var pop_up = function(scs, msg){
    		ngDialog.open({
	            template: 'cardSuccessfullyAdded',
	            className: 'ngdialog-theme-plain profile-cutom-bg',
	            controller: 'cardSuccessfullyAddedCtrl',
	            resolve: {
			        result: function() {
			            return {'success':scs, 'message':msg};
			        },
			        destination: function(){
			        	return 'mymallcards';
			        }
			    },
	            overlay: true
	        });
    }
}





