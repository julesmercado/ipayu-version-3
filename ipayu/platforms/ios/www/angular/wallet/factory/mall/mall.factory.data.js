
walletModule.factory('mallCardData', MallCardData)

// MallCardData.$inject = [];

function MallCardData() {

    var featured_assets = [],
        non_featured_assets = [],
        all_available = [];

    return {

// Setters
        setAssetsFeatured: function (data) {
            featured_assets = data;
            return data;
        },
        setAssetsNonFeatured: function (data) {
            non_featured_assets = data;
            return data;
        },
        setAllAvailableCard: function(data){
            all_available = data;
            return data;
        },

// Getters
        getAssetsFeatured: function () {
            return featured_assets;
        },
        getAssetsNonFeatured: function () {
            return non_featured_assets;
        },
        getAllAvailableCard: function(){
            return all_available;
        }


    }

}

