
walletModule.factory('walletData', WalletData)

// WalletData.$inject = [];

function WalletData() {

    var all_available_cards = [], 
        card_info = [],
        featured_assets = [],
        non_featured_assets = [],
        categories = [];

    return {

// Setters
        setUserCards: function (data, type) {
            if(type == 'mall'){
                localStorage.setItem('ipayumallcards', JSON.stringify(data));
            }
            else if(type == 'shop'){
                localStorage.setItem('ipayushopcards', JSON.stringify(data));
            }
            return data;
        },

        setFrequentUserCards: function (data, type) {
            if(type == 'mall'){
                localStorage.setItem('ipayufrequentmallcards', JSON.stringify(data));
            }
            else if(type == 'shop'){
                localStorage.setItem('ipayufrequentshopcards', JSON.stringify(data));
            }
            return data;
        },

        setLastUserCards: function (data, type) {
            if(type == 'mall'){
                localStorage.setItem('ipayulastmallcards', JSON.stringify(data));
            }
            else if(type == 'shop'){
                localStorage.setItem('ipayulastshopcards', JSON.stringify(data));
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


// Getters
        getUserCards: function (type) {
            var t = '';
            if(type == 'mall'){
                t = 'ipayumallcards';
            }
            else if(type == 'shop'){
                t = 'ipayushopcards';
            }
            var retrievedObject = localStorage.getItem(t);
            return JSON.parse(retrievedObject) || [];
        },

        getFrequentUserCards: function (type) {
            var t = '';
            if(type == 'mall'){
                t = 'ipayufrequentmallcards';
            }
            else if(type == 'shop'){
                t = 'ipayufrequentshopcards';
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
                t = 'ipayulastmallcards';
            }
            else if(type == 'shop'){
                t = 'ipayulastshopcards';
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


        addUserCards: function(data, type){
            var t = '';
            if(type == 'mall'){
                t = 'ipayumallcards';
            }
            else if(type == 'shop'){
                t = 'ipayushopcards';
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
        },

        getTimeRemaining: function(endtime){
            endtime = parseInt(endtime);
            var now = Date.parse(new Date());
            var t = endtime - now;

            var seconds = Math.floor( (t/1000) % 60 );
            var minutes = Math.floor( (t/1000/60) % 60 );
            var hours = Math.floor( (t/(1000*60*60)) % 24 );
            var days = Math.floor( t/(1000*60*60*24) );
            return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
        }

    }

}

