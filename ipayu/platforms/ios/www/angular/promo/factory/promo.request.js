
promoModule.factory('promoRequest', PromoFactoryRequest)

PromoFactoryRequest.$inject = ['$http', 'API_ROOT_URL', '$httpParamSerializerJQLike'];

function PromoFactoryRequest($http, API_ROOT_URL, $httpParamSerializerJQLike) {

    return {

      get_malls: function () {
        data = {
          'requestType' : 'GetAssets_'
        }
          return $http({
                          'method'    : 'POST',
                          'url'       : API_ROOT_URL + 'promo_controller.php/',
                          'headers'   : {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                          'data'      : $httpParamSerializerJQLike(data),
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

      reserve: function(data) {
        data.requestType = 'ReserveItem_';
        return $http({
                          'method'    : 'POST',
                          'url'       : API_ROOT_URL + 'promo_controller.php/',
                          'data'      : $httpParamSerializerJQLike(data),
                          'headers'   : {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                      })
      },

      my_promos: function(data, ignore){
        data.requestType = 'GetReservedItem_';
        return $http({
                          'method'    : 'POST',
                          'url'       : API_ROOT_URL + 'promo_controller.php/',
                          'ignoreLoadingBar'  : ignore,
                          'data'      : $httpParamSerializerJQLike(data),
                          'headers'   : {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                      })
      },

      removeNotification: function(data){
        data.requestType = 'UpdateAlert_';
        return $http({
                          'method'    : 'POST',
                          'url'       : API_ROOT_URL + 'promo_controller.php/',
                          'data'      : $httpParamSerializerJQLike(data),
                          'ignoreLoadingBar': true,
                          'headers'   : {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                      })
      },

      deleteItem: function(data){
        data.requestType = 'DeleteItem_';
        return $http({
                          'method'    : 'POST',
                          'url'       : API_ROOT_URL + 'promo_controller.php/',
                          'data'      : $httpParamSerializerJQLike(data),
                          'ignoreLoadingBar': true,
                          'headers'   : {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                      })
      }

    }
}
