
walletModule.factory('wallet', WalletFactory)

WalletFactory.$inject = ['$q', 'walletRequest'];

function WalletFactory($q, walletRequest) {

    function thenFunc(response) {
        console.log(response);
        return response;
    }

    function errFunc(err){
        console.log(err);
    }

    return {

        getTopThreeFrequent: function(id){
            var req_frequent = walletRequest.getTopThreeFrequent(id);
            return $q.all([req_frequent])
                .then(thenFunc, errFunc)
        },

        getUserCards: function(data){
            var req_cards = walletRequest.getUserCards(data);
            return $q.all([req_cards])
                .then(thenFunc, errFunc)
        },

        getAllHasCardAssets: function(type){
            var req_assets = walletRequest.getAllHasCardAssets(type);
            var req_categories = walletRequest.getAssetCategories();
            return $q.all([req_assets, req_categories])
                .then(thenFunc, errFunc)
        },

        getAssetCategories: function(){
            var req_categories = walletRequest.getAssetCategories();
            return $q.all([req_categories])
                .then(thenFunc, errFunc)
        },

        getAllCardAvailable: function(ipayu_id, card_type){
            var req_available_cards = walletRequest.getAllCardAvailable(ipayu_id, card_type);
            return $q.all([req_available_cards])
                .then(thenFunc, errFunc)
        },

        getAllCardAvailableInEstablishment: function(ipayu_id, asset_id, type){
            var req_available_cards = walletRequest.getAllCardAvailableInEstablishment(ipayu_id, asset_id, type);
            return $q.all([req_available_cards])
                .then(thenFunc, errFunc)
        },

        redeem: function(data){
            var req_redeem = walletRequest.redeem(data);
            return $q.all([req_redeem])
                .then(thenFunc, errFunc)
        },

        addCard: function(data){
            var req_add_card = walletRequest.addCard(data);
            return $q.all([req_add_card])
                .then(thenFunc, errFunc)
        },
        
        sendExportedTable: function (data){
            var req_export = walletRequest.sendExportedTable(data);
            return $q.all([req_export])
                .then(thenFunc, errFunc)
        }

    }

}