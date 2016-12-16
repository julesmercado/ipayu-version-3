
walletModule.factory('stamp', StampFactory)

StampFactory.$inject = ['$q', 'stampRequest', 'accountRequest', 'accountRequest', 'accountData', '$state', '$rootScope'];
function StampFactory($q, stampRequest, accountRequest, accountRequest, accountData, $state, $rootScope) {

    function thenFunc(response) {
         console.log(response);
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

        getUserStamps: function (id, ignore) {
            var req_stamp = stampRequest.getUserStamps(id, ignore);
            var req_notification = accountRequest.addNotification({'data':getDataNotification()});
            return $q.all([req_stamp, req_notification])
                .then(thenFunc, errFunc)
        }

    }

}