
walletModule.factory('shopCardData', ShopCardData)

// ShopCardData.$inject = [];
function ShopCardData() {

    var featured_assets = [],
        non_featured_assets = [],
        all_available = [],
        card_info = [],
        card_to_add = [],
        item_location = [];

    return {

// Setters
        assetsFeatured: function (data) {
            if(data){
                featured_assets = data;
            }
            return featured_assets;
        },
        assetsNonFeatured: function (data) {
            if(data){
                non_featured_assets = data;
            }
            return non_featured_assets;
        },
        allAvailableCard: function(data){
            if(data){
                all_available = data;
            }
            return all_available;
        },

        cardInfo: function(data){
            if(data){
                card_info = data;
            }
            return card_info;
        },

        cardToAdd: function(data){
            if(data){
                card_to_add = data;
            }
            return card_to_add;
        },

        itemLocation: function(data){
            if(data){
                item_location = data;
            }
            return item_location;
        }


    }

}

