
walletModule.factory('couponRequest', CouponFactoryRequest)

CouponFactoryRequest.$inject = ['$http', 'API_ROOT_URL', '$httpParamSerializerJQLike'];

function CouponFactoryRequest($http, API_ROOT_URL, $httpParamSerializerJQLike) {

    return {

        getUserCoupons: function (id, ignore) {
            var dataToSend = {
                'requestType'   : 'GetUserCoupon_',
                'ipayu_id'      : id
            }
            return $http({
                            'method'    : 'POST',
                            'url'       : API_ROOT_URL + 'card_controller.php',
                            'ignoreLoadingBar': ignore,
                            'data'      : $httpParamSerializerJQLike(dataToSend),
                            'headers'   : {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                        })
        }

    }

}
