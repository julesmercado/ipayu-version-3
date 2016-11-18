
promoModule.factory('promoRequest', PromoFactoryRequest)

PromoFactoryRequest.$inject = ['$http', 'API_ROOT_URL', '$httpParamSerializerJQLike'];

function PromoFactoryRequest($http, API_ROOT_URL, $httpParamSerializerJQLike) {

    return {

      get_malls: function () {
        data = {
          'requestType' : 'GetMalls_'
        }
          return $http({
                          'method'    : 'POST',
                          'url'       : API_ROOT_URL + 'mall_info_controller.php/',
                          'headers'   : {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                      })
      },

      get_promos: function (data) {
        data.requestType = 'GetPromoByAsset_';
          return $http({
                          'method'    : 'POST',
                          'url'       : API_ROOT_URL + 'promo_controller.php/',
                          'data'      : $httpParamSerializerJQLike(data),
                          'headers'   : {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                      })
      },

    }
}
