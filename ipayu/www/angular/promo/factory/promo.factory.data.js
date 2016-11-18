
promoModule.factory('promoData', PromoData)



PromoData.$inject = ['storages'];
function PromoData(storages) {

    var all_available_cards = [],
    	featured = [],
    	unfeatured = [],
    	categories = [],
    	promo_info = [],
    	user_promos = [];

    return {

      allAvailableCards: function (data) {
        if(data){ all_available_cards = data; } 
        return all_available_cards;
      },
      
      allFeatured: function (data) {
        if(data){ featured = data; }
        return featured;
      },
      
      allUnfeatured: function (data) {
        if(data){ unfeatured = data;  }
        return unfeatured;
      },
      
      allCategories: function (data) {
        if(data){ categories = data; }
        return categories;
      },

      promoInfo: function(data) {
        if(data){ promo_info = data; }
        return promo_info;
      },

      userPromos: function(data){
        if(data){ user_promos = data; }
        return user_promos;
      }

    }

}
