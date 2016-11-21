
promoModule.factory('promo', PromoFactory)

PromoFactory.$inject = ['$q', 'promoRequest'];
function PromoFactory($q, promoRequest) {

    function thenFunc(response) {
        // console.log(response);
        return response;
    }

    function errFunc(err){
        console.log(err);
    }

    return {

      get_malls: function () {
        var req_malls = promoRequest.get_malls();
        return $q.all([req_malls])
        .then(thenFunc, errFunc)
      },

      get_promos: function (data) {
        var req_promos = promoRequest.get_promos(data);
        return $q.all([req_promos])
        .then(thenFunc, errFunc)
      },

      reserve: function(data) {
        var req_reserve = promoRequest.reserve(data);
        return $q.all([req_reserve])
        .then(thenFunc, errFunc)
      },

      my_promos: function(data){
        var req_mypromos = promoRequest.my_promos(data);
//            req_notification = promoRequest.removeNotification(data);
        return $q.all([req_mypromos])
        .then(thenFunc, errFunc)
      }

    }
}
