
walletModule.factory('walletRequest', WalletFactoryRequest)

WalletFactoryRequest.$inject = ['$http', 'API_ROOT_URL', '$httpParamSerializerJQLike'];
function WalletFactoryRequest($http, API_ROOT_URL, $httpParamSerializerJQLike) {

    return {

        getTopThreeFrequent: function (id, ignore) {
            var dataToSend = {
                'requestType'   : 'GetRecentlyUsed_',
                'ipayu_id'      : id
            }
            return $http({
                            'method'    : 'POST',
                            'url'       : API_ROOT_URL + 'card_controller.php',
                            'ignoreLoadingBar': ignore,
                            'data'      : $httpParamSerializerJQLike(dataToSend),
                            'headers'   : {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                        })
        },

        getAllHasCardAssets: function (type) {
            var dataToSend = {};
            dataToSend.requestType = 'GetAssets_';
            if(type != '' && type){
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

        getAllCardAvailable: function (ipayu_id, card_type) {
            var data = {
                'ipayu_id'      : ipayu_id,
                'card_type'     : card_type,
                'requestType'   : 'GetCardsAllAssets_'
            };
            return $http({
                            'method'    : 'POST',
                            'url'       : API_ROOT_URL + 'card_controller.php',
                            'data'      : $httpParamSerializerJQLike(data),
                            'headers'   : {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                        })
        },

        getAllCardAvailableInEstablishment: function (ipayu_id, asset_id, type) {
            var data = {
                'ipayu_id'      : ipayu_id,
                'asset_info_id' : asset_id,
                'type'          : type,
                'requestType'   : 'GetCardsAssets_'
            };
            return $http({
                            'method'    : 'POST',
                            'url'       : API_ROOT_URL + 'card_controller.php',
                            'data'      : $httpParamSerializerJQLike(data),
                            'headers'   : {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                        })
        },

        addCard: function (data) {
            return $http({
                            'method'    : 'POST',
                            'url'       : API_ROOT_URL + 'card_controller.php',
                            'data'      : $httpParamSerializerJQLike(data),
                            'headers'   : {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                        })
        },
        redeem: function (data) {
            data.requestType = 'AddRedeem_';
            return $http({
                            'method'    : 'POST',
                            'url'       : API_ROOT_URL + 'card_controller.php',
                            'data'      : $httpParamSerializerJQLike(data),
                            'headers'   : {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                        })
        },
        getUserCards: function (data, ignore) {
            data.requestType = 'GetMyUserCards_';
            return $http({
                            'method'    : 'POST',
                            'url'       : API_ROOT_URL + 'card_controller.php',
                            'ignoreLoadingBar': ignore,
                            'data'      : $httpParamSerializerJQLike(data),
                            'headers'   : {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                        })
        },
        sendExportedTable: function (data) {
            data.requestType = 'SendExportedTable_';
            return $http({
                            'method'    : 'POST',
                            'url'       : API_ROOT_URL + 'card_controller.php',
                            'data'      : $httpParamSerializerJQLike(data),
                            'headers'   : {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                        })
        },
        redeemHistory: function(data){
            data.requestType = 'GetRedeemHistory_';
            return $http({
                            'method'    : 'POST',
                            'url'       : API_ROOT_URL + 'card_controller.php',
                            'data'      : $httpParamSerializerJQLike(data),
                            'headers'   : {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                        })
        },
        redeemBranches: function(data){
            data.requestType = 'GetAssetBranches_';
            return $http({
                            'method'    : 'POST',
                            'url'       : API_ROOT_URL + 'card_controller.php',
                            'data'      : $httpParamSerializerJQLike(data),
                            'headers'   : {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                        })
        },
        getFeaturedCards: function(data) {
            data.requestType = 'GetFeaturedCards_';
            return $http({
                            'method'    : 'POST',
                            'url'       : API_ROOT_URL + 'card_controller.php',
                            'data'      : $httpParamSerializerJQLike(data),
                            'headers'   : {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                        })
        }

    }

}
