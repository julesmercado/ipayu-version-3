
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
    
}


Profile.$inject = ['$scope', 'accountData'];
function Profile($scope, accountData) {
    $scope.userInfo = accountData.getUser();
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