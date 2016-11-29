
mainModule.controller('dashboardCtrl', Dashboard)
mainModule.controller('profileCtrl', Profile)
mainModule.controller('changePassCtrl', ChangePass)


Dashboard.$inject = ['$scope', '$rootScope', '$state', 'account', 'accountData', 'ngDialog', '$timeout', 'wallet', 'flags'];
function Dashboard($scope, $rootScope, $state, account, accountData, ngDialog, $timeout, wallet, flags) {
    
	$scope.date = new Date();
	$scope.ipayu_info = accountData.getUser();

    $scope.clock = Date.now();
    $scope.tickInterval = 1000;
    $timeout(tick, $scope.tickInterval);

    function tick() {
        $scope.clock = Date.now(); 
        $timeout(tick, $scope.tickInterval);
    }
	
	$scope.dashboardMyCards = accountData.getTopThreeFrequent();
    console.log($scope.dashboardMyCards)

    $scope.showLargeQr = function(){
        ngDialog.open({
            template: 'largeQR',
            className: 'ngdialog-theme-plain add-card-custom',
            controller: '',
            overlay: true
        });
    }

    $rootScope.$on('newDashboardData', function (event, data) {
         // console.log(data, 'New Dashboard')
        $scope.dashboardMyCards = data;
    })
    
    $rootScope.$on('updateUserInfo', function(event, data){
        $scope.ipayu_info = accountData.getUser();
    })
    
}


Profile.$inject = ['$scope', 'accountData', 'account', '$rootScope', '$timeout', '$filter', 'customService'];
function Profile($scope, accountData, account, $rootScope, $timeout, $filter, customService) {
    
    var userInfo = accountData.getUser();
    $scope.showImageLoading = false;
    $scope.selectedFile = {};
    $scope.birth = {
        'year'  : userInfo.birthday.split('-')[0],
        'month' : $filter('date')(new Date(userInfo.birthday), 'MMMM')
    };
    $scope.options = {
        'year'  : getYearOptions(),
        'month' : getMonthOptions()
    }
    $scope.userInfo = accountData.getUser();
    $scope.active = {
        'username'  : false,
        'phone'     : false,
        'firstname' : false,
        'lastname'  : false,
        'email'     : false,
        'year'      : false,
        'month'     : false
    }
    
    function getYearOptions() {
        var temp = [];
        for(var i = $scope.birth.year; i > $scope.birth.year - 100; i--){
            temp.push(i);
        }
        return temp;
    }
    
    function getMonthOptions(name) {
        var temp = [
            {'name': 'January', 'value': 1},
            {'name': 'February', 'value': 2},
            {'name': 'March', 'value': 3},
            {'name': 'April', 'value': 4},
            {'name': 'May', 'value': 5},
            {'name': 'June', 'value': 6},
            {'name': 'July', 'value': 7},
            {'name': 'August', 'value': 8},
            {'name': 'September', 'value': 9},
            {'name': 'October', 'value': 10},
            {'name': 'November', 'value': 11},
            {'name': 'December', 'value': 11},
        ];
        if(name){
            for(var i in temp){
                if(temp.hasOwnProperty(i) && temp[i].name == name){
                    return temp[i];
                }
            }
        }
        return temp;
    }
    
    function getNewBirth() {
        var copy = userInfo.birthday.split('-');
            copy[0] = $scope.birth.year;
            copy[1] = getMonthOptions($scope.birth.month).value
            
            $scope.userInfo.birthday = copy.join('-')
    }
    
    $scope.openFile = function(){
        angular.element(document.getElementById('hiddenFile')).click();
    }
    
    $scope.focus = function(property) {
        for(var i in $scope.active) {
            if($scope.active.hasOwnProperty(i) && i == property){
                $scope.active[i] = true;
                $timeout(function(){
                    angular.element(document.getElementById(property+'-input')).focus();
                })
            }
        }
    }
    
    $scope.blur = function(property) {
        for(var i in $scope.active){
            if($scope.active.hasOwnProperty(i) && i == property){
                $scope.active[i] = false;
                if(typeof $scope.userInfo[i] != 'undefined' && $scope.userInfo[i] == userInfo[i]) {
                    return;
                }
            }
        }
        if(property == 'year' || property == 'month'){
            getNewBirth();
        }
        $scope.updateProfile();
    }
    
    $scope.updateProfile = function(is_image){
        var dataToSend = $scope.userInfo;
        if(is_image){
            dataToSend.image = $scope.selectedFile;
            $scope.showImageLoading = true;
        }
        else {
            dataToSend.image = '';
        }
        dataToSend.datetime_created = Date.parse(new Date());
        console.log(dataToSend, "dataTosend")
        account.updateProfile(dataToSend)
        .then(function(resolve){
            console.log(resolve, "resolved")
            alert(JSON.stringify(resolve))
            if(resolve){
                if(resolve[0].data.success){
                    accountData.setUser(resolve[0].data.data[0]);
                    $rootScope.$broadcast('updateUserInfo', userInfo);
                }
                customService.alert(resolve[0].data.message)
            }
            else {
                alert(JSON.stringify($scope.selectedFile))
            }
            $scope.userInfo = accountData.getUser();
            userInfo = accountData.getUser();
            $scope.showImageLoading = false;
        })
    }
    
}


ChangePass.$inject = ['$scope', 'accountData', 'account', '$state'];
function ChangePass($scope, accountData, account, $state) {
    
    var userInfo = accountData.getUser();
    $scope.showPassTip = false;
    $scope.formData = {
        'ipayu_id'      :   userInfo.ipayu_id,
        'old_password'  :   '',
        'new_password'  :   '',
        'repeat'        :   ''
    }
    
    $scope.v = {
        'old_password'  :   {'message' : '', 'error' : false},
        'new_password'  :   {'message' : '', 'error' : false, 'pattern' : false},
        'repeat'        :   {'message' : '', 'error' : false, 'passmatch'   : false}
    }
    

	$scope.validate_old_password = function(){
        
		var hasError = false,
            thispass = $scope.formData.old_password;

        $scope.v.old_password.error = false;
        
        if (typeof thispass == 'undefined' || thispass == '') {
            $scope.v.old_password.error = true;
            $scope.v.old_password.message = 'Required field';
            hasError = true;
        }
        
        return hasError;
	}
    
    $scope.onblur_newpass = function(){
        $scope.v.new_password.error = false;
        $scope.showPassTip = false;
    }
    
    $scope.validate_new_password = function (clear_repeat) {
		var hasError = false,
            thispass = $scope.formData.new_password;
        
    	if(clear_repeat){
            $scope.formData.repeat = '';
            $scope.v.repeat.error = false;
        }
		
        if(typeof thispass != 'undefined'){
            
        	$scope.v.new_password.error = false;
        	$scope.v.new_password.pattern = true;
            
            if (!thispass.match('[a-z]') || !thispass.match('[A-Z]') || !thispass.match('[0-9]') || thispass.length <= 7) {
                $scope.v.new_password.pattern = false;
                $scope.v.new_password.error = true;
                $scope.v.new_password.message = 'Format Invalid';
                hasError = true;
            }
        }
        else{
        	$scope.v.new_password.error = true;
            $scope.v.new_password.message = 'Required field';
        	hasError = true;
        }
        return hasError;
	}

	$scope.validate_repeat_password = function(){
        
		var hasError = false,
            thispass = $scope.formData.repeat;

        $scope.v.repeat.error = false;
        $scope.v.repeat.pattern = true;

        if (thispass != $scope.formData.new_password || thispass == '') {
            $scope.v.repeat.error = true;
            $scope.v.repeat.message = 'Password not match';
            hasError = true;
        }
        
        return hasError;
	}
    
    
    
    $scope.update = function(){
        var checker = {
            'old'   : $scope.validate_old_password(),
            'new'   : $scope.validate_new_password(),
            'repeat'    : $scope.validate_repeat_password()
        }
        console.log(checker)
        for(var i in checker){
            if(checker.hasOwnProperty(i) && checker[i] == true){
                return;
            }
        }
        
        account.changePassword($scope.formData)
        .then(function(resolve){
            if(resolve){
                alert(resolve[0].data.message)
                if(resolve[0].data.success == true){
                    $state.go('dashboard')
                }
            }
        })
        
    
    }
}