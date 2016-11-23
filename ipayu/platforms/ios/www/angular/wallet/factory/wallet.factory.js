
walletModule.factory('wallet', WalletFactory)

WalletFactory.$inject = ['$q', '$rootScope', 'walletRequest', 'accountRequest', 'accountData', '$state'];
function WalletFactory($q, $rootScope, walletRequest, accountRequest, accountData, $state) {

    function thenFunc(response) {
        // console.log(response);
        return response;
    }

    function errFunc(err){
        console.log(err);
    }
    
    function getDataNotification(){
        if(!$state.current.card_type){
            return null;
        }
        var type = $state.current.card_type;
            type = type.replace("card", "");
        var ipayu_info = accountData.getUser();
        var n = $rootScope.notifications,
            arr = [],
            returnData = [];
        for(var i in n){
            if(n.hasOwnProperty(i) && i == type) {
                arr = n[i];
                break;
            }
        }
        for(var i = 0; i < arr.length; i++){
            var temp = {
                'ipayu_id'  : ipayu_info.ipayu_id,
                'type'  : type,
                'card_id'   : arr[i].card_id
            }
            returnData.push(temp);
        }
        return returnData;
    }
    
    return {

        getTopThreeFrequent: function(id, ignore){
            var req_frequent = walletRequest.getTopThreeFrequent(id, ignore);
            return $q.all([req_frequent])
                .then(thenFunc, errFunc)
        },
        getUserCards: function(data, ignore){
            var req_cards = walletRequest.getUserCards(data, ignore);
            return $q.all([req_cards])
                .then(thenFunc, errFunc)
        },
        getAllHasCardAssets: function(type){
            var req_assets = walletRequest.getAllHasCardAssets(type);
            var req_categories = walletRequest.getAssetCategories();
            var req_notification = accountRequest.addNotification({'data':getDataNotification()});
            return $q.all([req_assets, req_categories, req_notification])
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
        },
        redeemHistory: function(data){
            var req_redeemhistory = walletRequest.redeemHistory(data);
            return $q.all([req_redeemhistory])
                .then(thenFunc, errFunc)
        },
        redeemBranches: function(data){
            var req_redeembraches = walletRequest.redeemBranches(data);
            return $q.all([req_redeembraches])
                .then(thenFunc, errFunc)
        },
        getFeaturedCards: function(data){
            var req_fetured = walletRequest.getFeaturedCards(data);
            return $q.all([req_fetured])
                .then(thenFunc, errFunc)
        }

    }

}