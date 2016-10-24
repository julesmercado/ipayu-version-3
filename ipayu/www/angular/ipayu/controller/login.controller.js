
mainModule.controller('loginCtrl', LoginCtrl)


LoginCtrl.$inject = ['$scope', '$rootScope', '$state', 'account', 'accountData'];

function LoginCtrl($scope, $rootScope, $state, account, accountData) {
	
	$scope.openToolTip = true;

	function button_init() {
		$scope.button = {
			'disabled'	: false,
			'text'		: 'Login'
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
        $scope.loginData.password.touched = true;
		if($scope.loginData.password.value == ''){
            $scope.loginData.password.showError = true;
            $scope.loginData.password.touched = true;
            $scope.loginData.password.message = 'This field id required';
            hasError = true;
		}
		return hasError;
	}

	$scope.login = function () {
		button_logging_in();
		var checker = {
			'username'	: $scope.validate_username(),
			'password'	: $scope.validate_password()
		}

		for(var i in $scope.loginData){
			if(checker.hasOwnProperty(i) && checker[i] == true){
				$scope.disabled = false;
				button_init();
				return;
			}
		}
		account.login($scope.loginData.username.value, $scope.loginData.password.value)
				.then(
						function (response) {
							button_init();
							console.log(response[0].data);
							if(response[0].data.success){
								accountData.setUser(response[0].data.data[0]);
							}
							else{
								var attempts = accountData.getNumberOfAttempts();
									attempts += 1;
								if(attempts >= 3){
									alert('Number of attempts = 3');
									$state.go('forgot');
								}
								else{
									accountData.setNumberOfAttempts(attempts);
									alert(response[0].data.message);
								}
							}
						}
					)

	}

}
