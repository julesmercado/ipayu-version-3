
walletModule.factory('walletData', WalletData)

WalletData.$inject = ['storages', 'shopCardData', 'mallCardData', 'couponData', 'stampData'];
function WalletData(storages, shopCardData, mallCardData, couponData, stampData) {
    
    var assets_featured = [],
        assets_non_featured = [],
        categories = [],
        item_location = [],
        item_info = [],
        featured_shop_cards = [],
        featured_mall_cards = [];
    
    function dataFromStorage(storage) {
        var retrievedObject = localStorage.getItem(storage);
        return JSON.parse(retrievedObject) || [];
    }
    
    return {
        
        userCards: function (type, data) {
            var st = '';
            if(type == 'mall'){
                st = storages.ipayumallcards;
            }
            else if(type == 'shop'){
                st = storages.ipayushopcards;
            }
            else {
                return [];
            }
            
            if(data){
                localStorage.setItem(st, JSON.stringify(data));
            }
            return dataFromStorage(st)
        },
        
        frequentUserCards: function (type, data) {
            var st = '';
            if(type == 'mall'){
                st = storages.ipayufrequentmallcards;
            }
            else if(type == 'shop'){
                st = storages.ipayufrequentshopcards;
            }
            else {
                return [];
            }
            
            if(data){
                localStorage.setItem(st, JSON.stringify(data));
            }
            return dataFromStorage(st)
        },
        
        lastUserCards: function (type, data) {
            var st = '';
            if(type == 'mall'){
                st = storages.ipayulastmallcards;
            }
            else if(type == 'shop'){
                st = storages.ipayulastshopcards;
            }
            else {
                return [];
            }
            
            if(data){
                localStorage.setItem(st, JSON.stringify(data));
            }
            return dataFromStorage(st)
            
        },
        
        redeemHistory: function(data){
            if(data){
                localStorage.setItem(storages.ipayuredeemhistory, JSON.stringify(data));
                return data;
            }
            return dataFromStorage(storages.ipayuredeemhistory)
        },
        
        allAvailableCards: function(type, data){
            if(type == 'mall'){
                return mallCardData.allAvailableCard(data);
            }
            else if(type == 'shop'){
                return shopCardData.allAvailableCard(data);
            }
            else if(type == 'coupon'){
                return couponData.allAvailableCard(data);
            }
            else if(type == 'stamp'){
                return stampData.allAvailableCard(data);
            }
            return [];
        },

        cardInfo: function(type, data){
            if(type == 'mall'){
                return mallCardData.cardInfo(data);
            }
            else if(type == 'shop'){
                return shopCardData.cardInfo(data);
            }
            return [];
        },
        
        assetsFeatured: function (type, data) {
            if(type == 'mall'){
                return mallCardData.assetsFeatured(data);
            }
            else if(type == 'shop'){
                return shopCardData.assetsFeatured(data);
            }
            
            if(data){
                assets_featured = data;
            }
            return assets_featured;
        },
        
        assetsNonFeatured: function (type, data) {
            if(type == 'mall'){
                return mallCardData.assetsNonFeatured(data);
            }
            else if(type == 'shop'){
                return shopCardData.assetsNonFeatured(data);
            }
            
            if(data){
                assets_non_featured = data;
            }
            return assets_non_featured;
        },
        
        categories: function(data){
            if(data){
                categories = data;
            }
            return categories;
        },
        
        cardToAdd: function(type, data){
            if(type == 'mall'){
                return mallCardData.cardToAdd(data);
            }
            else if(type == 'shop'){
                return shopCardData.cardToAdd(data);
            }
            else if(type == 'coupon'){
                return couponData.cardToAdd(data);
            }
            else if(type == 'stamp'){
                return stampData.cardToAdd(data);
            }
            return [];
        },
        
        itemLocation: function(type, data){
            if(type == 'mall'){
                return mallCardData.itemLocation(data);
            }
            else if(type == 'shop'){
                return shopCardData.itemLocation(data);
            }
            
            if(data){
                item_location = data;
            }
            return item_location;
        },

        itemInfo: function(data){
            if(data){
                item_info = data;
            }
            return item_info;
        },
        
        featuredCards: function(type, data) {
            if(type == 'mall'){
                if(data){
                    featured_mall_cards = data;
                }
                return featured_mall_cards;
            }
            else if(type == 'shop'){
                if(data){
                    featured_shop_cards = data;
                }
                return featured_shop_cards;
            }
        }
    }

}

