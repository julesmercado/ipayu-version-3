
mainModule.controller('loginCtrl', LoginCtrl)


LoginCtrl.$inject = ['$scope', '$rootScope', '$state', '$q', 
						'account', 'flags', 'stamp', 'coupon', 'wallet',
						'accountData', 'walletData', 'couponData', 'stampData'];

function LoginCtrl($scope, $rootScope, $state, $q, 
						account, flags, stamp, coupon, wallet, 
						accountData, walletData, couponData, stampData) {
	
	$scope.openToolTip = true;

	function button_init() {
		$scope.button = {
			'disabled'	: false,
			'text'		: 'LOG-IN'
		}
	}

	function button_logging_in() {
		$scope.button = {
			'disabled'	: true,
			'text'		: 'Logging in...'
		}
	}

	button_init();


	$scope.loginData = {
		'username' : {'value': '', 'showError' : false, 'touched': false, 'message' : ''},
		'password' : {'value': '', 'showError' : false, 'touched': false, 'message': ''}
	};


	$scope.validate_username = function () {
		var hasError = false;
        $scope.loginData.username.showError = false;
        $scope.loginData.username.touched = true;

		if($scope.loginData.username.value.length < 8){
            $scope.loginData.username.showError = true;
            $scope.loginData.username.touched = true;
			$scope.loginData.username.message = 'minimum of 8 characters';
			hasError = true;
		}
		else if(!$scope.loginData.username.value.match(/^[0-9A-Za-z]+$/)){
            $scope.loginData.username.showError = true;
            $scope.loginData.username.touched = true;
            $scope.loginData.username.message = 'ID pattern is invalid';
            hasError = true;
        }
        return hasError;
	}

	$scope.validate_password = function () {
		var hasError = false;
        $scope.loginData.password.showError = false;
		if($scope.loginData.password.value == ''){
            $scope.loginData.password.showError = true;
            $scope.loginData.password.message = 'This field is required';
            hasError = true;
		}
		return hasError;
	}

	$scope.login = function () {
		if($rootScope.showOffline){
			return;
		}
		button_logging_in();
		var checker = {
			'username'	: $scope.validate_username(),
			'password'	: $scope.validate_password()
		}
		$rootScope.doLoading = true;
		for(var i in $scope.loginData){
			if(checker.hasOwnProperty(i) && checker[i] == true){
				$scope.disabled = false;
				button_init();
				$rootScope.doLoading = false;
				return;
			}
		}
		account.login($scope.loginData.username.value, $scope.loginData.password.value)
				.then(
						function (response) {
							button_init();
							if(response){
                                if(response[0].data.success){
                                    accountData.setUser(response[0].data.data[0]);
                                    flags.setUpCountryDisplay(response[0].data.data[0].country_code);
                                    process_all_data(response[0].data.data[0].ipayu_id)
                                }
                                else{
                                    $rootScope.doLoading = false;
                                    var attempts = accountData.getNumberOfAttempts();
                                        attempts += 1;
                                    if(attempts >= 3){
                                        alert('Number of attempts = 3');
                                        accountData.setNumberOfAttempts(0);
                                        $state.go('forgot');
                                    }
                                    else{
                                        accountData.setNumberOfAttempts(attempts);
                                        alert(response[0].data.message);
                                    }
                                }
                            }
						}
					)
	}

	function process_all_data(id) {

		var requests = [];

		requests.push(stamp.getUserStamps(id));
		requests.push(coupon.getUserCoupons(id));
		requests.push(wallet.getTopThreeFrequent(id));
		requests.push(wallet.getUserCards({'ipayu_id'	: id, 'type'	: 'mall'}));
		requests.push(wallet.getUserCards({'ipayu_id'	: id, 'type'	: 'shop'}));

		$q.all(requests)
                .then(function (resolve) {
                	$rootScope.doLoading = false;
					console.log(resolve);
					// set top three frequent for dashboard display
                	accountData.setTopThreeFrequent(resolve[2][0].data.data);
                	// set user cards mall or shop
                	walletData.setUserCards(resolve[3][0].data.data.all, 'mall');
                	walletData.setUserCards(resolve[4][0].data.data.all, 'shop');
                	// set user frequently used cards mall or shop
                	walletData.setFrequentUserCards(resolve[3][0].data.data.frequently, 'mall');
                	walletData.setFrequentUserCards(resolve[4][0].data.data.frequently, 'shop');
                	// set user last used cards mall or shop
                	walletData.setLastUserCards(resolve[3][0].data.data.last_used, 'mall');
                	walletData.setLastUserCards(resolve[4][0].data.data.last_used, 'shop');
                	// set user coupons
                	couponData.setUserCoupons(resolve[1][0].data.data.allcoupons);
                	// set featured coupon
                	couponData.setFeaturedCoupons(resolve[1][0].data.data.featuredcoupons);
                	// set user used coupon
                	couponData.setUsedCoupons(resolve[1][0].data.data.usedcoupons);
                	
                	// set user stamp
                	stampData.setUserStamps(resolve[0][0].data.data.allstamps);
                	// set featured stamp
                	stampData.setFeaturedStamps(resolve[0][0].data.data.featuredstamps);
                	// set user used stamp
                	stampData.setUsedStamps(resolve[0][0].data.data.usedstamps);
					$state.go('dashboard')
                }, function (reject) {
					console.log(reject);
                })
	}

}
