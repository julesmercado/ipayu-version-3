
mainModule.controller('registerCtrl', RegisterCtrl)


RegisterCtrl.$inject = ['$scope', '$rootScope', 'flags', '$filter', 'account', 'questions', '$state'];

function RegisterCtrl($scope, $rootScope, flags, $filter, account, questions, $state) {
		
	$scope.countries = flags.getAll();
	$scope.showCountryList = false;
    $scope.questions  = questions[0].data;
    $scope.checking = false;

    $scope.openToolTip = false;

    $scope.user_info = {
        'country'           : { 'input_value': 'PH', 'flag':'PH.png', 'showError': true, 'touched': false, 'message': '' },
        'gender'            : { 'input_value': 'Male', 'showError': true, 'touched': false, 'message': '' },
        'username'          : { 'input_value': '', 'showError': true, 'touched': false,'message': '' },
        'fname'             : { 'input_value': '', 'showError': true, 'touched': false,'message':''},
        'lname'             : { 'input_value': '', 'showError': true, 'touched': false,'message':''},
        'email'             : { 'input_value': '', 'showError': true, 'touched': false,'message':'', 'pattern': /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/, 'patternMatch': false },
        'password'          : { 'input_value': '', 'showError': true, 'touched': false,'message':'', 'patternMatch': false },
        'repeat_password'   : { 'input_value': '', 'showError': true, 'touched': false,'message':'', 'passwordMatch': false, 'showTip' : false },
        'birthday'          : { 'input_value': '', 'showError': true, 'touched': false,'message':'', 'grayText' : true },
        'question'          : { 'input_value': '', 'showError': true, 'touched': false,'message':'', 'grayText' : true },
        'answer'            : { 'input_value': '', 'showError': true, 'touched': false,'message':''},
    };

	$scope.dateRange = function () {

		var dateNow = new Date(),
			d = dateNow.getDate(),
			m = dateNow.getMonth(),
			y = dateNow.getFullYear(),
			min = $filter('date')(new Date(y-80, m, 1), 'yyyy-MM-dd'),
			max = $filter('date')(new Date(y-10, m, d), 'yyyy-MM-dd');

		return {
			'date'	: d,
			'month'	: m,
			'year'	: y,
			'min'	: min,
			'max'	: max
		}
	}

	$scope.validate_gender = function ( ) {
		resetError('gender');
		$scope.user_info.gender.showError = false;
		$scope.user_info.gender.touched = true;
	}

    $scope.validate_username = function (reset) {
    	var hasError = false;
    	if(reset){resetError('username');}
    	$scope.user_info.username.touched = true;

        if($scope.user_info.username.input_value || $scope.user_info.username.input_value != ''){
        	$scope.user_info.username.showError = false;

            if($scope.user_info.username.input_value.length < 8){
                $scope.user_info.username.showError = true;
                $scope.user_info.username.message = 'Minimum of 8 characters';
                hasError = true;
            }
            if(!$scope.user_info.username.input_value.match(/^[0-9A-Za-z]+$/)){
            	$scope.user_info.username.showError = true;
            	$scope.user_info.username.message = 'Special characters not allowed';
            	hasError = true;
            }
        }
        else {
            $scope.user_info.username.showError = true;
            $scope.user_info.username.message = 'This field id required';
            hasError = true;
        }
        return hasError;
    }

    $scope.validate_name = function (name,reset) {
    	var hasError = false;
    	if(reset){resetError(name);}
        
        $scope.user_info[name].touched = true;
        if(typeof $scope.user_info[name].input_value != 'undefined'){

        	$scope.user_info[name].showError = false;

            if(!$scope.user_info[name].input_value.match(/^[A-Za-z]+$/)){
                $scope.user_info[name].showError = true;
                $scope.user_info[name].message = 'No special characters and numbers';
                hasError = true;
            }
            if($scope.user_info[name].input_value.length > 20){
                $scope.user_info[name].showError = true;
                $scope.user_info[name].message = 'Must not geater than 20 characters';
                hasError = true;
            }
        }
        else{ 
        	$scope.user_info[name].showError = true;
            $scope.user_info[name].message = 'This field id required';
        	hasError = true;
        }
        return hasError;
    }

    $scope.validate_email = function(reset){
    	var hasError = false;
    	if(reset){resetError('email');}

        $scope.user_info.email.touched = true;
        if(typeof $scope.user_info.email.input_value != 'undefined'){
        	$scope.user_info.email.patternMatch = true;
        	$scope.user_info.email.showError = false;
            if (!$scope.user_info.email.input_value.match($scope.user_info.email.pattern)) {
                $scope.user_info.email.patternMatch = false;
                $scope.user_info.email.showError = true;
                $scope.user_info.email.message = 'Invalid email address';
                hasError = true;
            }
        }
        else{
        	$scope.user_info.email.showError = true;
            $scope.user_info.email.message = 'This field id required';
        	hasError = true;
        }
        return hasError;
	}

	$scope.validate_password = function (reset, clear_repeat) {
		var hasError = false;
    	if(reset){resetError('password');}
    	if(clear_repeat){$scope.user_info.repeat_password.input_value = '';}
		
        $scope.user_info.password.touched = true;
        if(typeof $scope.user_info.password.input_value != 'undefined'){
        	$scope.user_info.password.showError = false;
        	$scope.user_info.password.patternMatch = true;
        	$scope.showPassTip = false;
            if (!$scope.user_info.password.input_value.match('[a-z]') || !$scope.user_info.password.input_value.match('[A-Z]') || !$scope.user_info.password.input_value.match('[0-9]') || $scope.user_info.password.input_value.length <= 7) {
                $scope.user_info.password.patternMatch = false;
                $scope.showPassTip = true;
                $scope.user_info.password.showError = true;
                $scope.user_info.password.message = 'Format Invalid';
                hasError = true;
            }
        }
        else{
        	$scope.user_info.password.showError = true;
            $scope.user_info.password.message = 'This field id required';
        	hasError = true;
        }
        return hasError;
	}

	$scope.validate_repeat_password = function(reset){
		var hasError = false;
    	if(reset){resetError('repeat_password');}
        $scope.user_info.repeat_password.touched = true;

        $scope.user_info.repeat_password.showError = false;
        $scope.user_info.repeat_password.showTip = false;
        $scope.user_info.repeat_password.passwordMatch = true;

        if ($scope.user_info.repeat_password.input_value != $scope.user_info.password.input_value ||$scope.user_info.repeat_password.input_value == '') {
            $scope.user_info.repeat_password.passwordMatch = false;
            $scope.user_info.repeat_password.showError = true;
            $scope.user_info.repeat_password.message = 'Password not match';
            $scope.user_info.repeat_password.showTip = true;
            hasError = true;
        }
        return hasError;
	}

	$scope.selectCountry = function (c, f, reset){
		if(reset){resetError('country');}
		if(c){
			$scope.user_info.country.input_value = c;
			$scope.user_info.country.flag = f;
			$scope.user_info.country.showError = false;
		}
		$scope.showCountryList = false;
		$scope.user_info.country.touched = true;
	}
	$scope.validate_birthday = function (reset){
		var hasError = false;
		if(reset){resetError('birthday');}
		$scope.user_info.birthday.touched = true;
		$scope.user_info.birthday.showError = false;
		$scope.user_info.birthday.grayText = false;

		if(!$scope.user_info.birthday.input_value){
			$scope.user_info.birthday.showError = true;
			$scope.user_info.birthday.message = 'This field is required ';
			hasError = true;
		}
		return hasError;
	}

	$scope.validate_question = function (reset){
		var hasError = false;
		if(reset){resetError('question');}

		$scope.user_info.question.touched = true;
		$scope.user_info.question.showError = false;
		$scope.user_info.question.grayText = false;

		if(!$scope.user_info.question.input_value){
			$scope.user_info.question.showError = true;
			$scope.user_info.question.message = 'This field is required ';
			hasError = true;
		}
		return hasError;
	}

	$scope.validate_answer = function (reset){
		var hasError = false;
		if(reset){resetError('answer');}
		$scope.user_info.answer.touched = true;
		$scope.user_info.answer.showError = false;
		if(!$scope.user_info.answer.input_value){
			$scope.user_info.answer.showError = true;
			$scope.user_info.answer.message = 'This field is required ';
			hasError = true;
		}
		return hasError;
	}

	function resetError(index){
		$scope.openToolTip = true;
		for (var i in $scope.user_info) {
			if ($scope.user_info.hasOwnProperty(i) && i != index) {
				$scope.user_info[i].touched = false;
			}
		}
	}

	function checkIfExist(data, type) {
		
	}

	$scope.checkEmail = function (email) {
		$scope.checking = true;
		account.checkIfExist(email, 'email')
			.then(function (resolve) {
				if(resolve[0].data.message == false){
	                $scope.user_info.email.showError = true;
	                $scope.user_info.email.message = 'Email not available';
				}
				$scope.checking = false;
			})
	}

	$scope.checkUsername = function (username) {
		$scope.checking = true;
		account.checkIfExist(username, 'username')
			.then(function (resolve) {
				if(resolve[0].data.message == false){
	                $scope.user_info.username.showError = true;
	                $scope.user_info.username.message = 'Username not available';
				}
				$scope.checking = false;
			})
	}

	$scope.register = function () {

        $scope.processRegister = true;

        var checker = {
        	'birthday'			: $scope.validate_birthday(),
        	'username'			: $scope.validate_username(),
        	'firstname'			: $scope.validate_name('fname'),
        	'lastname'			: $scope.validate_name('lname'),
        	'email'				: $scope.validate_email(),
        	'password'			: $scope.validate_password(),
        	'repeat_password'	: $scope.validate_repeat_password(),
        	'question'			: $scope.validate_question(),
        	'answer'			: $scope.validate_answer()
        }

        for(var i in checker){
        	if(checker.hasOwnProperty(i) && checker[i] == true){
		        $scope.processRegister = false;
		        $scope.openToolTip = true;
        		return;
        	}
        }

        // $rootScope.doLoading = true;

		var registrationData = {
			'requestType'		: "AddUser_",
			'username'			:  $scope.user_info.username.input_value,
			'country_code'		:  $scope.user_info.country.input_value,
			'firstname'			:  $scope.user_info.fname.input_value,
			'lastname'			:  $scope.user_info.lname.input_value,
			'email'				:  $scope.user_info.email.input_value,
			'birthday'			:  $scope.user_info.birthday.input_value,
			'gender'			:  $scope.user_info.gender.input_value,
			'password'			:  $scope.user_info.password.input_value,
			'date_registered'	:  Date.parse(new Date()),
			'question_id'		:  $scope.user_info.question.input_value,
			'answer'			:  $scope.user_info.answer.input_value
		}
        account.register(registrationData)
        		.then(function (resolve) {
        			$scope.processRegister = false;
                    if(resolve && resolve.length){
                        alert(resolve[0].data.message)
                        if(resolve[0].data.success){
                            $state.go('login');
                        }
                    }
        		})

	}


}
