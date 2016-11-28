
mainModule.factory('accountRequest', AccountFactoryRequest)

AccountFactoryRequest.$inject = ['$http', 'API_ROOT_URL', '$httpParamSerializerJQLike'];

function AccountFactoryRequest($http, API_ROOT_URL, $httpParamSerializerJQLike) {

    return {

        register: function (data) {
            return $http({
                            'method'    : 'POST',
                            'url'       : API_ROOT_URL + 'user_controller.php',
                            'data'      : $httpParamSerializerJQLike(data),
                            'headers'   : {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                        })
        },
        login: function (username, password) {
            var dataToSend = {
                'requestType'   : 'Login_',
                'username'      : username,
                'password'      : password 
            }
            return $http({
                            'method'    : 'POST',
                            'url'       : API_ROOT_URL + 'user_controller.php',
                            'data'      : $httpParamSerializerJQLike(dataToSend),
                            'headers'   : {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                        })
        },
        checkIfExist: function (data, type) {
            var dataToSend = {
                'type'  : type,
                'data'  : data,
                'requestType'   : 'Checker_'
            }
            return $http({
                            'method'    : 'POST',
                            'url'       : API_ROOT_URL + 'user_controller.php',
                            'data'      : $httpParamSerializerJQLike(dataToSend),
                            'headers'   : {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                        })
        },
        getQuestions: function () {
            return $http({
                            'method'    : 'GET',
                            'headers'   : {'Content-Type': 'application/json'},
                            'url'       : API_ROOT_URL + 'question_controller.php',
                            'params'    : {'requestType':'GetQuestions_'}
                        })
        },
        resetPassword: function (data) {
            data.requestType = 'ForgotPassword_'
            return $http({
                            'method'    : 'POST',
                            'headers'   : {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                            'url'       : API_ROOT_URL + 'user_controller.php',
                            'data'      : $httpParamSerializerJQLike(data),
                        })
        },
        changePassword: function (data) {
            data.requestType = 'ChangePassword_'
            return $http({
                            'method'    : 'POST',
                            'headers'   : {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                            'url'       : API_ROOT_URL + 'user_controller.php',
                            'data'      : $httpParamSerializerJQLike(data),
                        })
        },
        updateProfile: function (data) {
            data.requestType = 'UpdateProfile_'
            return $http({
                            'method'    : 'POST',
                            'headers'   : {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                            'url'       : API_ROOT_URL + 'user_controller.php',
                            'data'      : $httpParamSerializerJQLike(data),
                        })
        },
        getNotifications: function(data){
            data.requestType = 'GetCardAlerts_';
            return $http({
                            'method'    : 'POST',
                            'headers'   : {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                            'ignoreLoadingBar': true,
                            'url'       : API_ROOT_URL + 'card_controller.php',
                            'data'      : $httpParamSerializerJQLike(data),
                        })
        },
        addNotification: function(data){
            data.requestType = 'AddToNotification_';
            console.log(data, "Add notification request")
            return $http({
                            'method'    : 'POST',
                            'headers'   : {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                            'ignoreLoadingBar': true,
                            'url'       : API_ROOT_URL + 'card_controller.php',
                            'data'      : $httpParamSerializerJQLike(data),
                        })
        }

    }

}
