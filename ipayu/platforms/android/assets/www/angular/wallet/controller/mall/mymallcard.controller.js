


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


MallCardInfoCtrl.$inject = ['$scope', '$rootScope', 'walletData', '$window', 'ngDialog'];
function MallCardInfoCtrl($scope, $rootScope, walletData, $window, ngDialog) {

	$scope.card = walletData.getCardInfo();
	$scope.transactions = $scope.card.transactions;
	$scope.redeems = $scope.card.redeemables;
    $scope.redeem = true;
    $scope.transaction = false;

    console.log($scope.transactions)

    var dateNow = new Date(),
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
}


AddMallCardCtrl.$inject = ['$scope', '$rootScope', '$state', 'ngDialog', '$state', 'walletData', 'flags', 'accountData', 'wallet'];
function AddMallCardCtrl($scope, $rootScope, $state, ngDialog, $state, walletData, flags, accountData, wallet) {

	var thisCard = walletData.getCardToAdd();
	var ipayu_info = accountData.getUser();

	if(!thisCard){
		$state.go('mymallcards')
		return;
	}
    $scope.phonePrefix = flags.getFlagByCode(thisCard.country_code);
    $scope.disableBtn = false;
    $scope.openToolTip = false;

	$scope.userData = {
		'name' : {'i_value': ipayu_info.firstname + ' ' + ipayu_info.lastname},
		'email': {'i_value': ipayu_info.email},
		'phone': {'i_value': '', 'hasError': true, 'touched': false, 'message' : ''},
		'address': {'i_value': '', 'hasError': true, 'touched': false, 'message' : ''},
		'city': {'i_value': '', 'hasError': true, 'touched': false, 'message' : ''},
		'postal': {'i_value': '', 'hasError': true, 'touched': false, 'message' : ''}
	};

	$scope.$watch('phonePrefix.prefix',
            function(newValue){
            	$scope.phonePrefix = flags.getFlagByPrefix(newValue);
            }
        )

	$scope.upPhone = function (reset) {
		if(reset){resetError('phone');}
		var hasError = false;
		$scope.userData.phone.touched = true;
		if(typeof $scope.userData.phone.i_value != 'undefined' && $scope.userData.phone.i_value != '' && $scope.userData.phone.i_value != null){
			if($scope.userData.phone.i_value.toString().length == $scope.phonePrefix.limit){
				$scope.userData.phone.hasError = false;
				hasError = false;
			}
			else{
				hasError = true;
				$scope.userData.phone.hasError = true;
				$scope.userData.phone.message = 'Mobile number must contain '+$scope.phonePrefix.limit+' digits';
			}
		}
		else {
			$scope.userData.phone.hasError = true;
            $scope.userData.phone.message = 'This field is required';
			hasError = true;
		}
		return hasError;
	}

    $scope.upAddress = function(reset){
		if(reset){resetError('address');}
		var hasError = false;
        $scope.userData.address.touched = true;
        if(typeof $scope.userData.address.i_value != 'undefined' && $scope.userData.address.i_value != ''){
            $scope.userData.address.hasError = false;
            hasError = false;
        }
        else{
        	hasError = true;
            $scope.userData.address.hasError = true;
            $scope.userData.address.message = 'This field is required';
        }
		return hasError;
    }

    $scope.upCity = function(reset){
		if(reset){resetError('city');}
		var hasError = false;
        $scope.userData.city.touched = true;
        if(typeof $scope.userData.city.i_value != 'undefined' && $scope.userData.city.i_value != ''){
            $scope.userData.city.hasError = false;
            hasError = false;
        }
        else{
        	hasError = true;
            $scope.userData.city.hasError = true;
            $scope.userData.city.message = 'This field is required';
        }
		return hasError;
    }

    $scope.upPostal = function(reset){
		if(reset){resetError('postal');}
		var hasError = false;
        $scope.userData.postal.touched = true;
        if(typeof $scope.userData.postal.i_value != 'undefined' && $scope.userData.postal.i_value != ''){
            $scope.userData.postal.hasError = false;
            hasError = false;
        }
        else{
            hasError = true;
            $scope.userData.postal.hasError = true;
            $scope.userData.postal.message = 'This field is required';
        }
		return hasError;
    }

    function resetError(index){
    $scope.openToolTip = true;
        for (var i in $scope.userData) {
            if ($scope.userData.hasOwnProperty(i) && i != index) {
                $scope.userData[i].touched = false;
            }
        }
    }

    $scope.addMallCard = function(){
    	var checker = {
    		'phone'		: $scope.upPhone(),
    		'address'	: $scope.upAddress(),
    		'city'		: $scope.upCity(),
    		'postal'	: $scope.upPostal()
    	}
        for(var i in checker){
        	if(checker.hasOwnProperty(i) && checker[i] == true){
		        $scope.openToolTip = true;
		        console.log($scope.userData)
        		return;
        	}
        }
        $scope.disableBtn = true;

        var cardDetails = {
        	'requestType'	: 'AddUserCard_',
        	'ipayu_id'		: ipayu_info.ipayu_id,
        	'card_id'		: thisCard.card_id,
        	'address'		: $scope.userData.address.i_value,
        	'city'			: $scope.userData.city.i_value,
        	'postal_code'	: $scope.userData.postal.i_value,
        	'phone'			: $scope.userData.phone.i_value,
        	'datetime_added': Date.parse(new Date()),
        	'type'			: 'mall'
        }

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
			        }
			    },
	            overlay: true
	        });
    }
}





