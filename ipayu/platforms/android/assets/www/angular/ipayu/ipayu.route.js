
mainModule.config(Config)

Config.$inject = ['$stateProvider', '$urlRouterProvider'];

function Config($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'loginCtrl as vm',
            cache: false
        })
        .state('register', {
            url: '/register',
            templateUrl: 'templates/register.html',
            controller: 'registerCtrl as vm',
            resolve: {
                questions: function (account) {
                    return account.getQuestions();
                }
            },
            cache: false
        })
        .state('forgot', {
            url: '/forgot',
            templateUrl: 'templates/forgot.html',
            cache: false
        })
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'templates/dashboard.html',
            controller: 'dashboardCtrl as vm',
            cache: false
        })
        .state('process', {
            url: '/process',
            controller: 'processCtrl as vm',
            cache: false
        })

    $urlRouterProvider.otherwise('/process');

}

