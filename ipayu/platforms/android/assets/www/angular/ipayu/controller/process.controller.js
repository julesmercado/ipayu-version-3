
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
                        if(resolve && resolve.length){
                            accountData.setTopThreeFrequent(resolve[0].data.data);
                            flags.setUpCountryDisplay(loggedUser.country_code);
                            redirect('dashboard');
                        }
                        else{
                            redirect('login');
                        }
                    }, function (reject) {
                        redirect('login');
                        console.log(reject);
                    })
        }
    }

    function redirect(state) {
        $rootScope.doLoading = false;
        $state.go(state);
    }

}
