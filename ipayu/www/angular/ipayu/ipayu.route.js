
mainModule.config(Config)

Config.$inject = ['$stateProvider', '$urlRouterProvider'];

function Config($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'loginCtrl',
            outsideState: true,
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
            outsideState: true,
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
            outsideState: true,
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
            outsideState: true,
            cache: false
        })

        .state('profile', {
            url: '/profile',
            templateUrl: 'templates/profile.html',
            controller: 'profileCtrl'
        })

         .state('changepass', {
            url: '/changepass',
            templateUrl: 'templates/change-pass.html',
            controller: 'changePassCtrl',
            cache: false
        })

    $urlRouterProvider.otherwise('/process');

}

