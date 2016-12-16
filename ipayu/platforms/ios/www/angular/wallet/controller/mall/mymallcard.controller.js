


walletModule.controller('myMallCardCtrl', MyMallCardCtrl)
walletModule.controller('myMallCardViewCtrl', MyMallCardViewCtrl)
walletModule.controller('mallCardSearchCtrl', MallCardSearch)
walletModule.controller('allMallCardSearchCtrl', AllMallCardSearch)
walletModule.controller('mallCardInfoCtrl', MallCardInfoCtrl)
walletModule.controller('addMallCardCtrl', AddMallCardCtrl)


MyMallCardCtrl.$inject = ['$scope', 'walletData', '$rootScope'];
function MyMallCardCtrl($scope, walletData, $rootScope) {
	$scope.lastUsed = walletData.lastUserCards('mall');
	$scope.frequent = walletData.frequentUserCards('mall');
	$scope.mallCards = walletData.userCards('mall');

    $rootScope.$on('newMallCardData', function (event, data) {
        // console.log(data, 'New Mall card')
		$scope.lastUsed = data.last_used;
		$scope.frequent = data.frequently;
		$scope.mallCards = data.all;
    })

}

MyMallCardViewCtrl.$inject = ['$scope', '$rootScope', 'walletData', 'customService'];
function MyMallCardViewCtrl($scope, $rootScope, walletData, customService) {

	$scope.mallCards = customService.filterByCountry(walletData.userCards('mall'), $rootScope.countryDisplay.country, true);
    
    $rootScope.$on('countryHasChange', function(event, country){
        $scope.mallCards = customService.filterByCountry(walletData.userCards('mall'), country.country, true);
    })

    $rootScope.$on('newMallCardData', function (event, data) {
        // console.log(data, 'New Mall card')
        $scope.mallCards = customService.filterByCountry(data.all, $rootScope.countryDisplay.country, true);

    })
}


MallCardSearch.$inject = ['$scope', '$rootScope', 'walletData', 'customService', 'accountData'];
function MallCardSearch($scope, $rootScope, walletData, customService, accountData) {

	var currentPage = 0;
	var pageSize = 10;
	var hasMore = false;
	$scope.featured_malls = customService.filterByCountry(walletData.assetsFeatured('mall'), $rootScope.countryDisplay.country);
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
		var unfeatured_malls = customService.filterByCountry(walletData.assetsNonFeatured(), $rootScope.countryDisplay.country);
		var obj = customService.paginate(unfeatured_malls, 4, 4, currentPage, pageSize);
		hasMore = obj.has_more;
		console.log(obj);
		return obj.data;
	}
    
    $rootScope.$on('countryHasChange', function(event, country){
        $scope.featured_malls = customService.filterByCountry(walletData.assetsFeatured('mall'), country.country);
        $scope.unfeatured_malls = get_unfeatured();
    })
}

AllMallCardSearch.$inject = ['$scope', '$rootScope', 'walletData', 'customService', 'ngDialog'];
function AllMallCardSearch($scope, $rootScope, walletData, customService, ngDialog) {

	$scope.searchData = '';
	$scope.searchResult = 0;
	var all_cards = walletData.allAvailableCards('mall');
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
            	},
                border_class: function(){
                    return '';
                },
                type: function(){
                    return 'mall';
                }
            },
            overlay: true
        });
	}
	$scope.filterCards = function(){
		$scope.allMallCards = contruct_data(all_cards);
	}
    
    $rootScope.$on('countryHasChange', function(event, country){
        $scope.allMallCards = contruct_data(all_cards);
    })
}


MallCardInfoCtrl.$inject = ['$scope', '$rootScope', 'walletData', '$window', 'ngDialog', 'wallet', 'accountData'];
function MallCardInfoCtrl($scope, $rootScope, walletData, $window, ngDialog, wallet, accountData) {

	$scope.card = walletData.cardInfo('mall');
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
    	console.log(item)
        ngDialog.open({
            template: 'redeemmodal',
            className: 'ngdialog-theme-plain profile-cutom-bg',
            controller: 'redeemModalCtrl',
            resolve: {
		        redeemable: function() {
		            return item;
		        },
                type: function(){
                    return 'mall';
                }
		    },
            overlay: true
        });
    }

    $rootScope.$on('newMallCardData', function (event, data) {
        // console.log(data, 'New Mall card')
        var cards = data.all;
        for (var i = 0; i < cards.length; i++) {
        	if(cards[i].card_id == $scope.card.card_id){
		        $scope.card = cards[i];
				$scope.transactions = cards[i].transactions;
				$scope.redeems = cards[i].redeemables;
        	}
        }
    })
    
    $rootScope.$on('updateData', function(event){
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
                    
                	walletData.userCards('mall', resolve[0].data.data.all, card.card_type);
                	walletData.frequentUserCards('mall', resolve[0].data.data.frequently, card.card_type);
                	walletData.lastUserCards('mall', resolve[0].data.data.last_used, card.card_type);
                    walletData.cardInfo('mall', card)
                    setTimeout(function(){
                        ngDialog.closeAll();
                    }, 800)
                }
            })
    })
}


AddMallCardCtrl.$inject = ['$scope', '$rootScope', '$state', 'ngDialog', 'walletData', 'accountData', 'wallet', 'customService'];
function AddMallCardCtrl($scope, $rootScope, $state, ngDialog, walletData, accountData, wallet, customService) {

    $scope.featured = customService.filterByCountry(walletData.featuredCards('mall'), $rootScope.countryDisplay.country);
    var thisCard = walletData.cardToAdd('mall');

    var ipayu_info = accountData.getUser();
    $scope.emitMessage = 'addMallCard';
    $scope.cardType = 'mall';
    $scope.thisCard = thisCard;
    $scope.disableBtn = false;

	if(thisCard.length == 0){
		$state.go('mymallcards')
		return;
	}
    
    $scope.$on($scope.emitMessage, function (event, cardDetails) {
        console.log(cardDetails)
        wallet.addCard(cardDetails)
        	.then(function(resolve){
        		if(!resolve[0].data.success){
        			pop_up(resolve[0].data.success, "Something went wrong. Please try again");
        			$scope.disableBtn = false;
        			return;
        		}
        		wallet.getUserCards({'ipayu_id'	: ipayu_info.ipayu_id, 'type'	: 'mall'})
        			.then(function(user_card){
        				$scope.disableBtn = true;
        				if(user_card){
        					walletData.cardToAdd('mall', []);
	        				walletData.userCards('mall', user_card[0].data.data.all);
		                	walletData.frequentUserCards('mall', user_card[0].data.data.frequently);
		                	walletData.lastUserCards('mall', user_card[0].data.data.last_used);
		                	pop_up(resolve[0].data.success, "Card Successfully added")
        				}
        				else{$rootScope.doLoading = false;}
        			})
        	})
    })
    
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
            	},
                border_class: function(){
                    return '';
                },
                type: function(){
                    return 'mall';
                }
            },
            overlay: true
        });
	}

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
			        },
                    border_class: function(){
                        return '';
                    }
			    },
	            overlay: true
	        });
    }

    $rootScope.$on('countryHasChange', function(event, country){
        $scope.featured = customService.filterByCountry(walletData.featuredCards('mall'),country.country);
    })
}





