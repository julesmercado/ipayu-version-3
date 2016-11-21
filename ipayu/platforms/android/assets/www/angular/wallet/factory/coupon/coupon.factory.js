
walletModule.factory('coupon', CouponFactory)

CouponFactory.$inject = ['$q', 'couponRequest', 'accountRequest', 'accountData', '$state', '$rootScope'];
function CouponFactory($q, couponRequest, accountRequest, accountData, $state, $rootScope) {

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

        getUserCoupons: function (id, ignore) {
            var req_coupon = couponRequest.getUserCoupons(id, ignore);
            var req_notification = accountRequest.addNotification({'data':getDataNotification()});
            return $q.all([req_coupon, req_notification])
                .then(thenFunc, errFunc)
        }

    }

}