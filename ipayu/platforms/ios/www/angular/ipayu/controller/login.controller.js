
mainModule.controller('loginCtrl', LoginCtrl)
mainModule.controller('forgotCtrl', ForgotCtrl)


LoginCtrl.$inject = ['$scope', '$rootScope', '$state', '$q', 
						'account', 'flags', 'stamp', 'coupon', 'wallet',
						'accountData', 'walletData', 'couponData', 'stampData'];
function LoginCtrl($scope, $rootScope, $state, $q, 
						account, flags, stamp, coupon, wallet, 
						accountData, walletData, couponData, stampData) {
	
	$scope.openToolTip = true;

     $scope.myInterval = 8000;
    $scope.slides = [
        {
          image: 'images/Web-1.gif'
        },
        {
          image: 'images/Web-2.gif'
        },
        {
          image: 'images/Web-3.gif'
        }
      ];

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
                                    accountData.setNumberOfAttempts(0);
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
                                        $state.go('forgot', {'user': $scope.loginData.username.value});
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
		requests.push(wallet.redeemHistory({'ipayu_id'	: id}));

		$q.all(requests)
                .then(function (resolve) {
                	$rootScope.doLoading = false;
					console.log(resolve);
					// set top three frequent for dashboard display
                	accountData.setTopThreeFrequent(resolve[2][0].data.data);
                	// set user cards mall or shop
                	walletData.userCards('mall', resolve[3][0].data.data.all);
                	walletData.userCards('shop', resolve[4][0].data.data.all);
                	// set user frequently used cards mall or shop
                	walletData.frequentUserCards('mall', resolve[3][0].data.data.frequently);
                	walletData.frequentUserCards('shop', resolve[4][0].data.data.frequently);
                	// set user last used cards mall or shop
                	walletData.lastUserCards('mall', resolve[3][0].data.data.last_used);
                	walletData.lastUserCards('shop', resolve[4][0].data.data.last_used);
                	// set user coupons
                	couponData.userCoupons(resolve[1][0].data.data.allcoupons);
                	// set featured coupon
                	couponData.featuredCoupons(resolve[1][0].data.data.featuredcoupons);
                	// set user used coupon
                	couponData.usedCoupons(resolve[1][0].data.data.usedcoupons);
                	
                	// set user stamp
                	stampData.userStamps(resolve[0][0].data.data.allstamps);
                	// set featured stamp
                	stampData.featuredStamps(resolve[0][0].data.data.featuredstamps);
                	// set user used stamp
                	stampData.usedStamps(resolve[0][0].data.data.usedstamps);
            
                    // set redeem history
                	walletData.redeemHistory(resolve[5][0].data.data);


                    $rootScope = $rootScope.$new(true);
                    $scope = $scope.$new(true);
            
                    $state.go('dashboard')
                    
//                    $state.transitionTo('dashboard', {}, { 
//                      reload: true, inherit: false, notify: true
//                    });
                    
                }, function (reject) {
					console.log(reject);
                })
	}


}


ForgotCtrl.$inject = ['$scope', '$state', '$stateParams', 'questions', 'account'];
function ForgotCtrl($scope, $state, $stateParams, questions, account) {
    $scope.done = false;
    $scope.questions = questions[0].data;
    $scope.forgotData = {
        'username'  : $stateParams.user,
        'question_id'  : '',
        'answer'    : '',
        'datetime_changed'  : Date.parse(new Date())
    }
    
    $scope.resetPassword = function(){
        account.resetPassword($scope.forgotData)
            .then(function(resolve){
            console.log(resolve)
                if(resolve){
                    alert(resolve[0].data.message);
                    if(resolve[0].data.success){
                        $scope.done = true;
                        $scope.user_email = resolve[0].data.data;
//                       $state.go('login'); 
                    }
                }
            })
    }



}


