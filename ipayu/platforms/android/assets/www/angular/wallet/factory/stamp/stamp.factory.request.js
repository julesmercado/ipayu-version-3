
walletModule.factory('stampRequest', StampFactoryRequest)

StampFactoryRequest.$inject = ['$http', 'API_ROOT_URL', '$httpParamSerializerJQLike'];

function StampFactoryRequest($http, API_ROOT_URL, $httpParamSerializerJQLike) {

    return {

        getUserStamps: function (id) {
            var dataToSend = {
                'requestType'   : 'GetUserStamp_',
                'ipayu_id'      : id
            }
            return $http({
                            'method'    : 'POST',
                            'url'       : API_ROOT_URL + 'card_controller.php',
                            'data'      : $httpParamSerializerJQLike(dataToSend),
                            'headers'   : {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                        })
        }

    }

}
