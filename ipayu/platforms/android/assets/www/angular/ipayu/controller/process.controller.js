
mainModule.controller('processCtrl', ProcessCtrl)


ProcessCtrl.$inject = ['$rootScope', '$timeout', 'flags', '$state', 'sqliteGet', 'accountData', 'wallet'];

function ProcessCtrl($rootScope, $timeout, flags, $state, sqliteGet, accountData, wallet) {

    $rootScope.doLoading = true;

    var loggedUser = accountData.getUser();

    if(loggedUser.length == 0){
        redirect('login');
    }
    else{
        if($rootScope.showOffline == true){
            redirect('dashboard');
        }
        else {
            wallet.getTopThreeFrequent(loggedUser.ipayu_id)
                    .then(function (resolve) {
                        if(resolve){
                            accountData.setTopThreeFrequent(resolve[0].data.data);
                            flags.setUpCountryDisplay(loggedUser.country_code);
                            redirect('dashboard');
                        }
                        else{
                            _check();
                        }
                    }, function (reject) {
                        _check();
                        console.log(reject);
                    })
        }
    }
    
    function _check(){
        if(loggedUser.length == 0){ redirect('login'); }
        else{ redirect('dashboard'); }
    }

    function redirect(state) {
        $rootScope.doLoading = false;
        $state.go(state);
    }

}
