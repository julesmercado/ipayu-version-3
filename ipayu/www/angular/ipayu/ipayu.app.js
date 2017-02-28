

var modules = [
                'ui.router', 'ui.bootstrap', 'ngTouch', 'ngCordova', 'slick', 'naif.base64',

                'monospaced.qrcode', 'barcode', 'ngDialog', 'angular-loading-bar',

                'app.wallet', 'app.mallinfo', 'app.promos'
            ];

var storage = {
    ipayuuserinfo : 'ipayuuserinfo',
    ipayutopthreefrequent   : 'ipayutopthreefrequent',
    ipayumallcards  : 'ipayumallcards',
    ipayushopcards  : 'ipayushopcards',
    ipayufrequentmallcards  : 'ipayufrequentmallcards',
    ipayufrequentshopcards  : 'ipayufrequentshopcards',
    ipayulastmallcards  : 'ipayulastmallcards',
    ipayulastshopcards  : 'ipayulastshopcards',
    ipayucouponcards    : 'ipayucouponcards',
    ipayufeaturedcoupons    : 'ipayufeaturedcoupons',
    ipayuusedcoupons    : 'ipayuusedcoupons',
    ipayustampcards : 'ipayustampcards',
    ipayufeaturedstamps : 'ipayufeaturedstamps',
    ipayuusedstamps : 'ipayuusedstamps',
    ipayuredeemhistory  : 'ipayuredeemhistory'
}

var mainModule = angular.module('app.ipayu', modules)

mainModule.run(Run);
// mainModule.constant('API_ROOT_URL', 'http://bringmesmiles.com/ipayu/controller/')
mainModule.constant('API_ROOT_URL', 'http://ipayu.co/ipayu_app_v3/controller/')
//mainModule.constant('API_ROOT_URL', 'http://lightbreak.zz.mu/ipayu/controller/')
mainModule.value('storages', storage)
mainModule.config(Config)

Run.$inject = ['sqliteSet', 'accountData', '$rootScope', '$state', '$window'];
function Run(sqliteSet, accountData, $rootScope, $state, $window) {


    document.addEventListener('deviceready', function () {

         if($window.MobileAccessibility){
            $window.MobileAccessibility.usePreferredTextZoom(false);
        }

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
                $rootScope.doLoading = false;
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
                $window.history.back();
            }

            return;
        }

        var initial_screen_size = window.innerHeight;
        $rootScope.doLoading = false;
        $rootScope.showOffline = false;

        document.addEventListener('online', onOnline, false);
        document.addEventListener('offline', onOffline, false);
        document.addEventListener("backbutton", backButtonIsTapped, false);
        window.addEventListener("resize", onResize, false);

        // sqliteSet.setUpDatabase();
        // sqliteSet.createTable();
        // sqliteSet.dropTable();

    }, true);

}


Config.$inject = ['cfpLoadingBarProvider', 'ngDialogProvider'];

function Config(cfpLoadingBarProvider, ngDialogProvider) {

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
