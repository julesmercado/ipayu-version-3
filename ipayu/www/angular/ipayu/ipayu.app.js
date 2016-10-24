
var modules = [
                'ui.router', 'ui.bootstrap', 'monospaced.qrcode', 'ngDialog', 'angular-loading-bar',

                'app.wallet'
            ];

var mainModule = angular
                    .module('app.ipayu', modules)
                    
mainModule.constant('API_ROOT_URL', 'http://bringmesmiles.com/ipayu/controller/')
mainModule.config(Config)

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
