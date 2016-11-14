
walletModule.factory('walletData', WalletData)

 WalletData.$inject = ['storages'];
function WalletData(storages) {

    var all_available_cards = [], 
        card_info = [],
        featured_assets = [],
        non_featured_assets = [],
        categories = [],
        card_to_add = false,
        item_location = [],
        item_info = [],
        featured_cards = [];

    return {
        
// Setters
        setUserCards: function (data, type) {
            if(type == 'mall'){
                localStorage.setItem(storages.ipayumallcards, JSON.stringify(data));
            }
            else if(type == 'shop'){
                localStorage.setItem(storages.ipayushopcards, JSON.stringify(data));
            }
            return data;
        },
        setFrequentUserCards: function (data, type) {
            if(type == 'mall'){
                localStorage.setItem(storages.ipayufrequentmallcards, JSON.stringify(data));
            }
            else if(type == 'shop'){
                localStorage.setItem(storages.ipayufrequentshopcards, JSON.stringify(data));
            }
            return data;
        },
        setLastUserCards: function (data, type) {
            if(type == 'mall'){
                localStorage.setItem(storages.ipayulastmallcards, JSON.stringify(data));
            }
            else if(type == 'shop'){
                localStorage.setItem(storages.ipayulastshopcards, JSON.stringify(data));
            }
            return data;
        },
        setAllAvailableCards: function(data){
            all_available_cards = data;
            return data;
        },

        setCardInfo: function(data){
            card_info = data;
            return data;
        },
        setAssetsFeatured: function (data) {
            featured_assets = data;
            return data;
        },
        setAssetsNonFeatured: function (data) {
            non_featured_assets = data;
            return data;
        },
        setCategories: function(data){
            categories = data;
            return data;
        },
        setCardToAdd: function(data){
            card_to_add = data;
            return data;
        },
        setRedeemHistory: function(data){
            localStorage.setItem(storages.ipayuredeemhistory, JSON.stringify(data));
            return data;
        },
        setItemLocation: function(data){
            item_location = data;
            return data;
        },
        setItemInfo: function(data){
            item_info = data;
            return data;
        },
        setFeaturedCards: function(data) {
            featured_cards = data;
            return data;
        },


// Getters
        getUserCards: function (type) {
            var t = '';
            if(type == 'mall'){
                t = storages.ipayumallcards;
            }
            else if(type == 'shop'){
                t = storages.ipayushopcards;
            }
            var retrievedObject = localStorage.getItem(t);
            return JSON.parse(retrievedObject) || [];
        },
        getFrequentUserCards: function (type) {
            var t = '';
            if(type == 'mall'){
                t = storages.ipayufrequentmallcards;
            }
            else if(type == 'shop'){
                t = storages.ipayufrequentshopcards;
            }
            var retrievedObject = localStorage.getItem(t);
            return JSON.parse(retrievedObject) || [];
        },
        getAllAvailableCards: function(){
            return all_available_cards;
        },
        getLastUserCards: function (type) {
            var t = '';
            if(type == 'mall'){
                t = storages.ipayulastmallcards;
            }
            else if(type == 'shop'){
                t = storages.ipayulastshopcards;
            }
            var retrievedObject = localStorage.getItem(t);
            return JSON.parse(retrievedObject) || [];
        },
        getCardInfo: function(){
            return card_info;
        },
        getAssetsFeatured: function () {
            return featured_assets;
        },
        getAssetsNonFeatured: function () {
            return non_featured_assets;
        },
        getCategories: function(){
            return categories;
        },
        getCardToAdd: function(){
            return card_to_add;
        },
        getRedeemHistory: function(data){
            var retrievedObject = localStorage.getItem(storages.ipayuredeemhistory);
            return JSON.parse(retrievedObject) || [];
        },
        getItemLocation: function(){
            return item_location;
        },
        getItemInfo: function(){
            return item_info;
        },
        getFeaturedCards: function() {
            return featured_cards;
        },


        addUserCards: function(data, type){
            var t = '';
            if(type == 'mall'){
                t = storages.ipayumallcards;
            }
            else if(type == 'shop'){
                t = storages.ipayushopcards;
            }
            var retrievedObject = localStorage.getItem(t);
            retrievedObject = JSON.parse(retrievedObject) || [];
            retrievedObject.push(data);

            retrievedObject.sort(function(a, b){
                if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                return 0;
            });
            localStorage.setItem(t, JSON.stringify(retrievedObject));
            return data;
        }
    }

}

