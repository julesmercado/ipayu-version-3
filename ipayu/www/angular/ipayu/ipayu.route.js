
mainModule.config(Config)

Config.$inject = ['$stateProvider', '$urlRouterProvider'];

function Config($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'loginCtrl',
            cache: false
        })
        .state('register', {
            url: '/register',
            templateUrl: 'templates/register.html',
            controller: 'registerCtrl',
            resolve: {
                questions: function (account) {
                    return account.getQuestions();
                }
            },
            cache: false
        })
        .state('forgot', {
            url: '/forgot/{user}',
            templateUrl: 'templates/forgot.html',
            controller: 'forgotCtrl',
            resolve: {
                questions: function (account) {
                    return account.getQuestions();
                }
            },
            cache: false
        })
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'templates/dashboard.html',
            controller: 'dashboardCtrl',
            cache: false
        })
        .state('process', {
            url: '/process',
            controller: 'processCtrl',
            cache: false
        })

        .state('profile', {
            url: '/profile',
            templateUrl: 'templates/profile.html',
            controller: 'profileCtrl'
        })

         .state('changePW', {
            url: '/changePW',
            templateUrl: 'templates/change-pass.html',
            controller: ''
        })

    $urlRouterProvider.otherwise('/process');

}

