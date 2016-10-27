
walletModule.factory('wallet', WalletFactory)

WalletFactory.$inject = ['$q', 'walletRequest'];

function WalletFactory($q, walletRequest) {

    function thenFunc(response) {
        // console.log(response);
        return response;
    }

    function errFunc(err){
        console.log(errFunc);
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
        }

    }

}