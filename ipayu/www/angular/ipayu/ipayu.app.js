
var modules = [
                'ui.router', 'ui.bootstrap', 'monospaced.qrcode', 'ngDialog', 'angular-loading-bar', 'ngTouch', 'ngCordova',

                    'app.wallet', 'app.mallinfo',
            ];

var mainModule = angular.module('app.ipayu', modules)

mainModule.run(Run);
mainModule.constant('API_ROOT_URL', 'http://bringmesmiles.com/ipayu/controller/')
mainModule.config(Config)

Run.$inject = ['sqliteSet', 'accountData', '$rootScope', '$state'];
function Run(sqliteSet, accountData, $rootScope, $state) {

    var initial_screen_size = window.innerHeight;
    $rootScope.doLoading = false;
    $rootScope.showOffline = false;

    document.addEventListener('online', onOnline, false);
    document.addEventListener('offline', onOffline, false);
    document.addEventListener("backbutton", backButtonIsTapped, false);
    window.addEventListener("resize", onResize, false);
    sqliteSet.setUpDatabase();
    sqliteSet.createTable();
    // sqliteSet.dropTable();

    function onOnline(){
        $rootScope.showOffline = false;
    }
    function onOffline(){
        $rootScope.showOffline = true;
    }
    function onResize(){
        var res = (window.innerHeight < initial_screen_size);
        $rootScope.$apply(function(){
            $rootScope.hasFocusElement = res;
        })
    }

    function backButtonIsTapped(e){
        $rootScope.$apply(function(){
            $rootScope.hasFocusElement = false;
        })

        var state = $state.current.name;
        e.preventDefault();

        if(state == 'login') {
            var r = confirm("Are you sure you want to exit?");
            if (r == true) {
                navigator.app.exitApp();
            }
        }
        else if(state == 'dashboard'){
            var doubleTap = accountData.getDoubleTap();
                doubleTap += 1;
            if(doubleTap < 2) {
                accountData.setDoubleTap(doubleTap+1);
            }
            else{
                var r = confirm("Are you sure you want to exit?");
                if (r == true) {
                    navigator.app.exitApp();
                } else {
                    accountData.setDoubleTap(0);
                }
            }
        }
        else {
            window.history.back();
        }

        return;
    }

}


Config.$inject = ['cfpLoadingBarProvider', 'ngDialogProvider', '$stateProvider', '$urlRouterProvider'];

function Config(cfpLoadingBarProvider, ngDialogProvider, $stateProvider, $urlRouterProvider) {

    cfpLoadingBarProvider.includeSpinner = false;

    ngDialogProvider.setDefaults({
        className: 'ngdialog-theme-default',
        plain: false,
        showClose: true,
        closeByDocument: true,
        closeByEscape: true,
        appendTo: false,
        preCloseCallback: function () {
            console.log('default pre-close callback');
        }
    });

}
