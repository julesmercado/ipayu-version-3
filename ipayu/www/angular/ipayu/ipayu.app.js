

(function () {

    'use strict';

    var modules = [
                    'ui.router', 'ui.bootstrap', 'monospaced.qrcode', 'ngDialog', 'angular-loading-bar', 'ngTouch',

                    'app.wallet', 'app.mallinfo',

                    'route.ipayu', 

                    'controller.register', 'controller.login', 'controller.dashboard',

                    'factory.flag', 'factory.account.request', 'factory.account', 'factory.account.data',

                    'directive.menu', 'directive.route',

                    'filter.greet'
                ];

    angular
        .module('app.ipayu', modules)
        .constant('API_ROOT_URL', 'http://bringmesmiles.com/ipayu/controller/')
        .config(Config)

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

})();