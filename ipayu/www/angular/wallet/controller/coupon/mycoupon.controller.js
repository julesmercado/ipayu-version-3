

walletModule.controller('myCouponCtrl', MyCoupon)
walletModule.controller('couponGroupCtrl', CouponGroup)
walletModule.controller('couponInfoCtrl', CouponInfo)
walletModule.controller('couponHistoryCtrl', CouponHistory)
walletModule.controller('couponCardSearchCtrl', CouponCardSearch)
walletModule.controller('allCouponCardSearchCtrl', AllCouponCardSearch)
walletModule.controller('addCouponCardCtrl', AddCouponCard)


MyCoupon.$inject = ['$scope', '$rootScope', 'couponData', '$state', 'ngDialog'];
function MyCoupon($scope, $rootScope, couponData, $state, ngDialog) {
	$scope.coupons = filterCouponcard(couponData.getUserCoupons());
	$scope.featured = filterCouponcard(couponData.getFeaturedCoupons());
    
    $scope.emit = {
        'coupon'    : 'hasExpiredCoupon',
        'featured'  : 'hasExpiredFeaturedCoupon'
    }
    
    $scope.proceedCouponGroup = function(coupons, name){
      couponData.setCouponGroup(coupons);
      $state.go('coupongroup', {'name':name});
    }

    $scope.proceedCouponInfo = function(coupon_id){
      $state.go('couponinfo', {'id':coupon_id, 'type':'mycoupons'});
    }
    
	$scope.tapped = function ( card ) {
        card.card_id = card.coupon_id;
        ngDialog.open({
            template: 'confirmAlert',
            className: 'ngdialog-theme-plain add-card-custom',
            controller: 'addCardModalCtrl',
            resolve: {
            	card: function(){
            		return card;
            	},
            	destination: function(){
            		return 'addcouponcard';
            	}
            },
            overlay: true
        });
	}

    function filterCouponcard(data){
        if(!data || data.length == 0){
            return [];
        }
        var booklets = [],
            coupons = [];
        for (var i = 0; i < data.length; i++) {
            if(data[i].country == $rootScope.countryDisplay.country ){
                if(data[i].datetime_end){
                    data[i].remainingTime = '';
                }
                if(data[i].booklet_id != 0){
                    booklets.push(data[i]);
                }
                else{
                    coupons.push(data[i]);
                }
            }
        };
        return booklets.concat(coupons);
    }

    $scope.$on('hasExpiredCoupon', function(event, coupon){
        var coupons = couponData.getUserCoupons(),
            new_coupons = [];
        for (var i = 0; i < coupons.length; i++) {
            if(coupons[i].coupon_id != coupon.coupon_id){
                new_coupons.push(coupons[i]);
            }
        }
        $scope.$apply(function () {
            couponData.setUserCoupons(new_coupons);
            var used = couponData.getUsedCoupons();
            used.push(coupon);
            couponData.setUsedCoupons(used);
            $scope.coupons = filterCouponcard(couponData.getUserCoupons());  
        });
    })
    
    $scope.$on('hasExpiredFeaturedCoupon', function(event, coupon){
        var featured = couponData.getFeaturedCoupons(),
            new_featured = [];
        for (var i = 0; i < featured.length; i++) {
            if(featured[i].coupon_id != coupon.coupon_id){
                new_featured.push(featured[i]);
            }
        }
        $scope.$apply(function () {
            couponData.setFeaturedCoupons(new_featured);
            $scope.featured = filterCouponcard(couponData.getFeaturedCoupons()); 
        });
    })

    $scope.$watch( 'searchCountry.country',
            function(newValue){
                $scope.coupons = filterCouponcard(couponData.getUserCoupons());
                $scope.featured = filterCouponcard(couponData.getFeaturedCoupons());
            }
        )
}


CouponGroup.$inject = ['$scope', '$rootScope', 'couponData', 'customService', '$stateParams', '$state'];
function CouponGroup($scope, $rootScope, couponData, customService, $stateParams, $state) {

    $scope.coupons = customService.chunk(couponData.getCouponGroup(), 2);
    $scope.group_name = $stateParams.name;

    $scope.proceedCouponInfo = function(coupon_id){
      $state.go('couponinfo', {'id':coupon_id, 'type':'mycoupons'});
    }
}

CouponInfo.$inject = ['$scope', '$rootScope', 'couponData', 'customService', '$stateParams'];
function CouponInfo($scope, $rootScope, couponData, customService, $stateParams) {
    var allCoupons = [];
    if($stateParams.type == 'mycoupons'){
        allCoupons = couponData.getUserCoupons();
    }
    else if($stateParams.type == 'usedcoupons'){
        allCoupons = couponData.getUsedCoupons();
    }
    $scope.thisCoupon = getThisCoupon();

    function getThisCoupon(){
        for (var i = 0; i < allCoupons.length; i++) {
            if(allCoupons[i].booklet_id){
                for (var x = 0; x < allCoupons[i].coupons.length; x++) {
                    if(allCoupons[i].coupons[x].coupon_id == $stateParams.id){
                        return allCoupons[i].coupons[x];
                    }
                }
            }
            else if(allCoupons[i].coupon_id == $stateParams.id){
                return allCoupons[i];
            }
        }
    }

    $scope.$on('hasExpiredCoupon', function (evt, value) {
        $scope.$apply(function () {
            $scope.thisCoupon = value;
        })
    });
}

CouponHistory.$inject = ['$scope', '$rootScope', '$state', 'couponData', 'customService'];
function CouponHistory ($scope, $rootScope, $state, couponData, customService) {

    $scope.usedCoupons = customService.filterByCountry(couponData.getUsedCoupons(), $rootScope.countryDisplay.country, true, 2);

    $scope.proceedCouponInfo = function(coupon_id){
      $state.go('couponinfo', {'id':coupon_id, 'type':'usedcoupons'});
    }
}


CouponCardSearch.$inject = ['$scope', '$rootScope', 'walletData', 'customService', 'accountData'];
function CouponCardSearch($scope, $rootScope, walletData, customService, accountData) {

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
                }
            )
}


AllCouponCardSearch.$inject = ['$scope', '$rootScope', 'walletData', 'customService', 'ngDialog'];
function AllCouponCardSearch($scope, $rootScope, walletData, customService, ngDialog) {

	$scope.searchData = '';
	$scope.searchResult = 0;
	var all_cards = walletData.getAllAvailableCards();
	$scope.allCouponCards = contruct_data(all_cards);
    console.log(all_cards);
    console.log($scope.allCouponCards)

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
        card.card_id = card.coupon_id;
        ngDialog.open({
            template: 'confirmAlert',
            className: 'ngdialog-theme-plain add-card-custom',
            controller: 'addCardModalCtrl',
            resolve: {
            	card: function(){
            		return card;
            	},
            	destination: function(){
            		return 'addcouponcard';
            	}
            },
            overlay: true
        });
	}
	$scope.filterCards = function(){
		$scope.allCouponCards = contruct_data(all_cards);
	}
    $scope.$watch('searchCountry.country',
    		function(newValue){
    			$scope.allCouponCards = contruct_data(all_cards);
    		}
    	)
}

AddCouponCard.$inject = ['$scope', '$rootScope', '$state', 'ngDialog', 'walletData', 'accountData', 'wallet', 'coupon', 'couponData'];
function AddCouponCard($scope, $rootScope, $state, ngDialog, walletData, accountData, wallet, coupon, couponData) {

	var thisCard = walletData.getCardToAdd();
	var ipayu_info = accountData.getUser();
    $scope.emitMessage = 'addCouponCard';
    $scope.cardType = 'coupon';
    $scope.thisCard = thisCard;

	if(!thisCard){
		$state.go('mycouponcards')
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
        		coupon.getUserCoupons(ipayu_info.ipayu_id)
        			.then(function(user_card){
        				$scope.disableBtn = false;
        				if(user_card){
        					walletData.setCardToAdd(false);
                            couponData.setUserCoupons(user_card[0].data.data.allcoupons);
                            couponData.setFeaturedCoupons(user_card[0].data.data.featuredcoupons);
                            couponData.setUsedCoupons(user_card[0].data.data.usedcoupons);
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
			        	return 'mycouponcards';
			        }
			    },
	            overlay: true
	        });
    }
}

