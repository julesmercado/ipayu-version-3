

walletModule.controller('myStampCtrl', MyStamp)
walletModule.controller('stampInfoCtrl', StampInfo)
walletModule.controller('stampHistoryCtrl', StampHistory)
walletModule.controller('stampCardSearchCtrl', StampCardSearch)
walletModule.controller('allStampCardSearchCtrl', AllStampCardSearch)
walletModule.controller('addStampCardCtrl', AddStampCard)


MyStamp.$inject = ['$scope', '$rootScope', 'stampData', '$state', 'ngDialog', 'stamp', 'accountData'];
function MyStamp($scope, $rootScope, stampData, $state, ngDialog, stamp, accountData) {
    
	var ipayu_info = accountData.getUser();
	$scope.stamps = filterStampcard(stampData.getUserStamps());
	$scope.featured = filterStampcard(stampData.getFeaturedStamps());

    function filterStampcard(data){
        if(!data || data.length == 0){
            return [];
        }
        var returnData = [];
        for (var i = 0; i < data.length; i++) {
            if(data[i].country == $rootScope.countryDisplay.country ){
                if(data[i].datetime_end){
                    data[i].remainingTime = '';
                }
                returnData.push(data[i]);
            }
        };
        return returnData;
    }
    
    $scope.proceedStampInfo = function(stamp_id){
      $state.go('stampinfo', {'id':stamp_id, 'type':'mystamps'});
    }
    
	$scope.tapped = function (card) {
        card.card_id = card.stamp_id;
        ngDialog.open({
            template: 'confirmAlert',
            className: 'ngdialog-theme-plain add-card-custom',
            controller: 'addCardModalCtrl',
            resolve: {
            	card: function(){
            		return card;
            	},
            	destination: function(){
            		return 'addstampcard';
            	}
            },
            overlay: true
        });
	}

    $scope.$watch(
            function(){
                return $rootScope.searchCountry.country;
            },
            function(newValue, oldValue){
                $scope.stamps = filterStampcard(stampData.getUserStamps());
                $scope.featured = filterStampcard(stampData.getFeaturedStamps());
            }
        )



    function resetMyStamps(data) {
        if(data.length == 0){
            $scope.stamps = [];
            return;
        }
        for (var i = 0; i < $scope.stamps.length; i++) {
            var ch = false;
            for (var x = 0; x < data.length; x++) {
                if($scope.stamps[i].stamp_id == data[x].stamp_id){
                    ch = true;
                }
            }
            if(ch == false){
                $scope.stamps.splice($scope.stamps.indexOf($scope.stamps[i]), 1);
            }
        }
    }

    function resetFeatured(data) {
        if(data.length == 0){
            $scope.featured = [];
            return;
        }

        for (var i = 0; i < $scope.featured.length; i++) {
            var ch = false;
            for (var x = 0; x <data.length; x++) {
                if($scope.featured[i].stamp_id == data[x].stamp_id){
                    ch = true;
                }
            }
            if(ch == false){
                $scope.featured.splice($scope.featured.indexOf($scope.featured[i]), 1);
            }
        }

        for (var i = 0; i <data.length; i++) {
            var ch = false;
            for (var x = 0; x < $scope.featured.length; x++) {
                if(data[i].stamp_id == $scope.featured[x].stamp_id){
                    ch = true;
                }
            }
            if(ch == false){
                if(data[i].country == $rootScope.searchCountry.country){
                    $scope.featured.push(data[i]);
                }
            }
        }
    }

    $rootScope.$on('newStampData', function (event, data) {
        // console.log(data, 'New Stamp')

        var a = data.allstamps || [];
        var f = data.featuredstamps || [];

        resetMyStamps(a);
        resetFeatured(f);

    })
}

StampInfo.$inject = ['$scope', '$rootScope', '$state', 'stampData', 'customService', '$stateParams', 'stamp', 'accountData'];
function StampInfo($scope, $rootScope, $state, stampData, customService, $stateParams, stamp, accountData) {

    var ipayu_info = accountData.getUser();
    var allStamps = [];
    
    if($stateParams.type == 'mystamps'){
        allStamps = stampData.getUserStamps();
    }
    else if($stateParams.type == 'usedstamps'){
        allStamps = stampData.getUsedStamps();
    }
    
    $scope.thisStamp = getThisStamp();
    
    function getThisStamp(){
        var temp = [];
        for (var i = 0; i < allStamps.length; i++) {
            if(allStamps[i].stamp_id == $stateParams.id){
                temp = allStamps[i];
                break;
            }
        }
        temp.display_stamp = construct_stamps_display(temp.no_of_stamps, temp.no_of_user_stamps || 0);
        return temp;
    }
    
    function construct_stamps_display(all_stamp, user_stamp) {
        var temp = [];

        for (var i = 0; i < all_stamp; i++) {
            
            var shade = false;
            if(i < user_stamp){
                shade = true;
            }

            temp.push({'shade' : shade});

        }
        return {
            circles : temp,
            ready_to_redeem : (user_stamp == all_stamp)
        }
    }

    $scope.$on('hasExpiredStamp', function (evt, value) {
        $scope.thisStamp = value;
    });

    $rootScope.$on('newStampData', function (event, data) {
        // console.log(data, 'New Stamp')

        if($stateParams.type == 'mystamps'){
            allStamps = data.allstamps;
        } else if($stateParams.type == 'usedstamps'){
            allStamps = data.usedstamps;
        }
        $scope.thisStamp = getThisStamp();
    })

}

StampHistory.$inject = ['$scope', '$rootScope', '$state', 'stampData', 'customService', 'stamp', 'accountData'];
function StampHistory ($scope, $rootScope, $state, stampData, customService, stamp, accountData) {

    var ipayu_info = accountData.getUser();
    $scope.usedStamps = customService.filterByCountry(stampData.getUsedStamps(), $rootScope.countryDisplay.country, true, 2);

    $scope.proceedStampInfo = function(stamp_id){
      $state.go('stampinfo', {'id':stamp_id, 'type':'usedstamps'});
    }


    $rootScope.$on('newStampData', function (event, data) {
        // console.log(data, 'New Stamp')
        $scope.usedStamps = customService.filterByCountry(data.usedstamps, $rootScope.countryDisplay.country, true, 2);
    })
}


StampCardSearch.$inject = ['$scope', '$rootScope', 'walletData', 'customService', 'accountData'];
function StampCardSearch($scope, $rootScope, walletData, customService, accountData) {

	var currentPage = 0,
		pageSize = 7,
		hasMore = false,
		selectedCategory = '';

	$scope.featured = get_featured();
	$scope.unfeatured = get_unfeatured();
	$scope.categories = walletData.getCategories();
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
		var filtered_category = customService.filterByCategory(walletData.getAssetsNonFeatured(), selectedCategory);
		var unfeatured = customService.filterByCountry(filtered_category, $rootScope.countryDisplay.country);
		var obj = customService.paginate(unfeatured, 4, 4, currentPage, pageSize, true);
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
		selectedCategory = value;
		currentPage = 0;
		$scope.featured = get_featured();
		$scope.unfeatured = get_unfeatured();
	}

    $scope.$watch('searchCountry.country',
                function(newValue, oldValue){
                	$scope.featured = get_featured();
					$scope.unfeatured = get_unfeatured();
					$scope.unfeatured = get_unfeatured();
                }
            )
}


AllStampCardSearch.$inject = ['$scope', '$rootScope', 'walletData', 'customService', 'ngDialog'];
function AllStampCardSearch($scope, $rootScope, walletData, customService, ngDialog) {

	$scope.searchData = '';
	$scope.searchResult = 0;
	var all_cards = walletData.getAllAvailableCards();
	$scope.allStampCards = contruct_data(all_cards);
    console.log(all_cards);
    console.log($scope.allStampCards)

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
        card.card_id = card.stamp_id;
        ngDialog.open({
            template: 'confirmAlert',
            className: 'ngdialog-theme-plain add-card-custom',
            controller: 'addCardModalCtrl',
            resolve: {
            	card: function(){
            		return card;
            	},
            	destination: function(){
            		return 'addstampcard';
            	},
                border_class: function(){
                    return 'coupon-stamp-modal-border';
                }
            },
            overlay: true
        });
	}
	$scope.filterCards = function(){
		$scope.allStampCards = contruct_data(all_cards);
	}
    $scope.$watch('searchCountry.country',
    		function(newValue){
    			$scope.allStampCards = contruct_data(all_cards);
    		}
    	)
}

AddStampCard.$inject = ['$scope', '$rootScope', '$state', 'ngDialog', 'walletData', 'accountData', 'wallet', 'stamp', 'stampData'];
function AddStampCard($scope, $rootScope, $state, ngDialog, walletData, accountData, wallet, stamp, stampData) {
    
	$scope.featured = filterStampcard(stampData.getFeaturedStamps());

	var thisCard = walletData.getCardToAdd();
	var ipayu_info = accountData.getUser();
    $scope.emitMessage = 'addStampCard';
    $scope.cardType = 'stamp';
    $scope.thisCard = thisCard;

	if(!thisCard){
		$state.go('mystampcards')
		return;
	}
    
    $scope.$on($scope.emitMessage, function (event, cardDetails) {
        wallet.addCard(cardDetails)
        	.then(function(resolve){
            
                if(!resolve){ return }
            
        		if(resolve[0].data.success){
                    stamp.getUserStamps(ipayu_info.ipayu_id)
                        .then(function(user_card){
                            $scope.disableBtn = false;
                            if(user_card){
                                walletData.setCardToAdd(false);
                                stampData.setUserStamps(user_card[0].data.data.allstamps);
                                stampData.setFeaturedStamps(user_card[0].data.data.featuredstamps);
                                stampData.setUsedStamps(user_card[0].data.data.usedstamps);
                                pop_up(resolve[0].data.success, "Card Successfully added")
                            }
                            else{$rootScope.doLoading = false;}
                        })
        		}
                else {
        			pop_up(resolve[0].data.success, "Something went wrong. Please try again");
        			$scope.disableBtn = false;
        			return;
                }
        	})
    })

    var pop_up = function(scs, msg){
    		ngDialog.open({
	            template: 'cardSuccessfullyAdded',
	            className: 'ngdialog-theme-plain profile-cutom-bg',
	            controller: 'cardSuccessfullyAddedCtrl',
	            resolve: {
			        result: function() {
			            return {'success':(scs)?scs:'Failed to add card', 'message':msg};
			        },
			        destination: function(){
			        	return 'mystampcards';
			        },
                    border_class: function(){
                        return 'coupon-stamp-modal-border';
                    }
			    },
	            overlay: true
	        });
    }
    function filterStampcard(data){
        if(!data || data.length == 0){
            return [];
        }
        var returnData = [];
        for (var i = 0; i < data.length; i++) {
            if(data[i].country == $rootScope.countryDisplay.country ){
                if(data[i].datetime_end){
                    data[i].remainingTime = '';
                }
                returnData.push(data[i]);
            }
        };
        return returnData;
    }
    
	$scope.tapped = function (card) {
        card.card_id = card.stamp_id;
        ngDialog.open({
            template: 'confirmAlert',
            className: 'ngdialog-theme-plain add-card-custom',
            controller: 'addCardModalCtrl',
            resolve: {
            	card: function(){
            		return card;
            	},
            	destination: function(){
            		return 'addstampcard';
            	}
            },
            overlay: true
        });
	}

    $scope.$watch(
            function(){
                return $rootScope.searchCountry.country;
            },
            function(newValue, oldValue){
                $scope.featured = filterStampcard(stampData.getFeaturedStamps());
            }
        )
}

