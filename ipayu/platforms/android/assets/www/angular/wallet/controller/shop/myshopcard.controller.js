

walletModule.controller('myShopCardCtrl', MyShopCard)
walletModule.controller('myShopCardViewCtrl', MyShopCardView)
walletModule.controller('shopCardSearchCtrl', ShopCardSearch)
walletModule.controller('allShopCardSearchCtrl', AllShopCardSearch)
walletModule.controller('shopCardInfoCtrl', ShopCardInfo)
walletModule.controller('addShopCardCtrl', AddShopCard)


MyShopCard.$inject = ['$scope', '$rootScope', 'walletData'];
function MyShopCard($scope, $rootScope, walletData) {
	$scope.lastUsed = walletData.lastUserCards('shop');
	$scope.frequent = walletData.frequentUserCards('shop');
	$scope.shopCards = walletData.userCards('shop');

    $rootScope.$on('newShopCardData', function (event, data) {
        // console.log(data, 'New Shop card')
		$scope.lastUsed = data.last_used;
		$scope.frequent = data.frequently;
		$scope.shopCards = data.all;
    })
}


MyShopCardView.$inject = ['$scope', '$rootScope', 'walletData', 'customService'];
function MyShopCardView($scope, $rootScope, walletData, customService) {

	$scope.shopCards = customService.filterByCountry(walletData.userCards('shop'), $rootScope.countryDisplay.country, true);

    $rootScope.$on('countryHasChange', function(event, country){
        $scope.shopCards = customService.filterByCountry(walletData.userCards('shop'), country.country, true);
    })

    $rootScope.$on('newShopCardData', function (event, data) {
        // console.log(data, 'New Shop card')
        $scope.shopCards = customService.filterByCountry(data.all, $rootScope.countryDisplay.country, true);
    })
}


ShopCardSearch.$inject = ['$scope', '$rootScope', 'walletData', 'customService', 'accountData'];
function ShopCardSearch($scope, $rootScope, walletData, customService, accountData) {

	var currentPage = 0,
		pageSize = 7,
		hasMore = false,
		selectedCategory = '';

	$scope.featured_shops = get_featured();
	$scope.unfeatured_shops = get_unfeatured();
	$scope.categories = walletData.categories();

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
		var filtered_category = customService.filterByCategory(walletData.assetsNonFeatured('shop'), selectedCategory);
		var unfeatured_shops = customService.filterByCountry(filtered_category, $rootScope.countryDisplay.country);
		var obj = customService.paginate(unfeatured_shops, 4, 4, currentPage, pageSize, true);
		hasMore = obj.has_more;
		return obj.data;
	}

	function get_featured(){
		var filtered_category = customService.filterByCategory(walletData.assetsFeatured('shop'), selectedCategory);
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
		$scope.featured_shops = get_featured();
		$scope.unfeatured_shops = get_unfeatured();
	}

    $rootScope.$on('countryHasChange', function(event, country){
        $scope.featured_shops = get_featured();
        $scope.unfeatured_shops = get_unfeatured();
    })
}


AllShopCardSearch.$inject = ['$scope', '$rootScope', 'walletData', 'customService', 'ngDialog'];
function AllShopCardSearch($scope, $rootScope, walletData, customService, ngDialog) {

	$scope.searchData = '';
	$scope.searchResult = 0;
	var all_cards = walletData.allAvailableCards('shop');
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
            controller: 'addCardModalCtrl',
            resolve: {
            	card: function(){
            		return card;
            	},
            	destination: function(){
            		return 'addshopcard';
            	},
                border_class: function(){
                    return 'shop-modal-border';
                },
                type: function(){
                    return 'shop';
                }
            },
            overlay: true
        });
	}
	$scope.filterCards = function(){
		$scope.allShopCards = contruct_data(all_cards);
	}
    
    $rootScope.$on('countryHasChange', function(event, country){
        $scope.allShopCards = contruct_data(all_cards);
    })
}


ShopCardInfo.$inject = ['$scope', '$rootScope', 'walletData', '$window', 'ngDialog', 'wallet', 'accountData'];
function ShopCardInfo($scope, $rootScope, walletData, $window, ngDialog, wallet, accountData) {

	$scope.card = walletData.cardInfo('shop');
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
		        redeemable: function () {
		            return item;
		        },
                type: function(){
                    return 'shop';
                }
		    },
            overlay: true
        });
    }

    $rootScope.$on('newShopCardData', function (event, data) {
        // console.log(data, 'New Shop card')
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
        wallet.getUserCards({'ipayu_id'	: ipayu_info.ipayu_id, 'type'	: 'shop'})
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
                    
                	walletData.userCards('shop', resolve[0].data.data.all, card.card_type);
                	walletData.frequentUserCards('shop', resolve[0].data.data.frequently, card.card_type);
                	walletData.lastUserCards('shop', resolve[0].data.data.last_used, card.card_type);
                    walletData.cardInfo('shop', card)
                    setTimeout(function(){
                        ngDialog.closeAll();
                    }, 800)
                }
            })
    })
}


AddShopCard.$inject = ['$scope', '$rootScope', '$state', 'ngDialog', '$state', 'walletData', 'flags', 'accountData', 'wallet', 'customService'];
function AddShopCard($scope, $rootScope, $state, ngDialog, $state, walletData, flags, accountData, wallet, customService) {

    $scope.featured = customService.filterByCountry(walletData.featuredCards('shop'), $rootScope.countryDisplay.country);

	var thisCard = walletData.cardToAdd('shop');
	var ipayu_info = accountData.getUser();
    $scope.emitMessage = 'addShopCard';
    $scope.cardType = 'shop';
    $scope.thisCard = thisCard;
    $scope.disableBtn = false;

	if(thisCard.length == 0){
		$state.go('myshopcards')
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
        		wallet.getUserCards({'ipayu_id'	: ipayu_info.ipayu_id, 'type'	: 'shop'})
        			.then(function(user_card){
        				$scope.disableBtn = true;
        				if(user_card){
        					walletData.cardToAdd('shop', []);
	        				walletData.userCards('shop', user_card[0].data.data.all);
		                	walletData.frequentUserCards('shop', user_card[0].data.data.frequently);
		                	walletData.lastUserCards('shop', user_card[0].data.data.last_used);
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
			        	return 'myshopcards';
			        },
                    border_class: function(){
                        return 'shop-modal-border';
                    }
			    },
	            overlay: true
	        });
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
            		return 'addshopcard';
            	},
                border_class: function(){
                    return 'shop-modal-border';
                },
                type: function(){
                    return 'shop';
                }
            },
            overlay: true
        });
	}

    $rootScope.$on('countryHasChange', function(event, country){
        $scope.featured = customService.filterByCountry(walletData.featuredCards('shop'), country.country);
    })
}