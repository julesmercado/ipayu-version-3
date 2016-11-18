
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
      }

    }
}
