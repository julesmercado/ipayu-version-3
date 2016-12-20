


mainModule.factory('httpInterceptor', HttpInterceptor)


HttpInterceptor.$inject = ['$q', '$location', '$rootScope'];

function HttpInterceptor($q, $location, $rootScope) {

        function custom_alert(message, title, button_text) {
            if(navigator.notification){
                navigator.notification.alert(
                    message,
                    function(){}, 
                    title,
                    button_text
                );
            }
            else{
                alert(message)
            }
        }

        return {

            request: function(config) {
              config.timeout = 25000;
              return config;
            },

            'response': function(response) {
                return response;
            },

            'responseError': function(rejection) {
                
                console.log(rejection);

                if(rejection.config.ignoreLoadingBar){
                    return $q.reject(rejection);
                }

                if (rejection.status === 401) {
                    rejection.statusMesssage = 'Unauthorized access';
                    custom_alert('Unauthorized access', 'Oops!', 'Ok');

                }

                if (rejection.status === 403) {
                    rejection.statusMesssage = 'Forbidden access';
                    custom_alert('Forbidden access', 'Oops!', 'Ok');

                }

                if (rejection.status === 408) {
                    rejection.statusMesssage = 'Connection timeout';
                    custom_alert('Connection timeout', 'Oops!', 'Ok');
                }

                if (rejection.status === -1) {
                    rejection.statusMesssage = 'Connection problem';
                    custom_alert('Connection problem', 'Oops!', 'Ok');
                }

                $rootScope.doLoading = false;
                return $q.reject(rejection);

            }

        };
    }



//Http Intercpetor to check auth failures for xhr requests

mainModule.config(['$httpProvider',function($httpProvider) {

    $httpProvider.interceptors.push('httpInterceptor');

}]);