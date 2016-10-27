
walletModule.factory('walletRequest', WalletFactoryRequest)

WalletFactoryRequest.$inject = ['$http', 'API_ROOT_URL', '$httpParamSerializerJQLike'];

function WalletFactoryRequest($http, API_ROOT_URL, $httpParamSerializerJQLike) {

    return {

        getTopThreeFrequent: function (id) {
            var dataToSend = {
                'requestType'   : 'GetRecentlyUsed_',
                'ipayu_id'         : id
            }
            return $http({
                            'method'    : 'POST',
                            'url'       : API_ROOT_URL + 'card_controller.php',
                            'data'      : $httpParamSerializerJQLike(dataToSend),
                            'headers'   : {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                        })
        },

        getAllHasCardAssets: function (type) {
            var dataToSend = {};
            dataToSend.requestType = 'GetAssets_';
            if(type){
                dataToSend.type  = type;
            }
            return $http({
                            'method'    : 'POST',
                            'url'       : API_ROOT_URL + 'asset_controller.php',
                            'data'      : $httpParamSerializerJQLike(dataToSend),
                            'headers'   : {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                        })
        },

        getAssetCategories: function () {
            var dataToSend = {};
            dataToSend.requestType = 'GetCategories_';
            return $http({
                        'method'    : 'POST',
                        'url'       : API_ROOT_URL + 'mall_info_controller.php',
                        'data'      : $httpParamSerializerJQLike(dataToSend),
                        'headers'   : {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                    })
        },

        getAllCardAvailable: function (data) {
            data.requestType = 'GetCardsAllAssets_';
            return $http({
                            'method'    : 'POST',
                            'url'       : API_ROOT_URL + 'card_controller.php',
                            'data'      : $httpParamSerializerJQLike(data),
                            'headers'   : {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                        })
        },

        getAllCardAvailableInEstablishment: function (data) {
            data.requestType = 'GetCardsAssets_';
            return $http({
                            'method'    : 'POST',
                            'url'       : API_ROOT_URL + 'card_controller.php',
                            'data'      : $httpParamSerializerJQLike(data),
                            'headers'   : {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                        })
        },

        addCard: function (data) {
            data.requestType = 'AddUserCard_';
            return $http({
                            'method'    : 'POST',
                            'url'       : API_ROOT_URL + 'card_controller.php',
                            'data'      : $httpParamSerializerJQLike(data),
                            'headers'   : {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                        })
        },
        getUserCards: function (data) {
            data.requestType = 'GetMyUserCards_';
            return $http({
                            'method'    : 'POST',
                            'url'       : API_ROOT_URL + 'card_controller.php',
                            'data'      : $httpParamSerializerJQLike(data),
                            'headers'   : {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                        })
        }

    }

}
