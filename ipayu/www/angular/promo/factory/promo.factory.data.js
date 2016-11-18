
promoModule.factory('promoData', PromoData)



PromoData.$inject = ['storages'];
function PromoData(storages) {

    var all_available_cards = [];

    return {

      setAllAvailableCards: function (data) {
        all_available_cards = data;
      },

      getAllAvailableCards: function () {
        return all_available_cards;
      }

    }

}
