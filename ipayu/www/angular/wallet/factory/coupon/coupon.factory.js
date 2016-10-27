
walletModule.factory('coupon', CouponFactory)

CouponFactory.$inject = ['$q', 'couponRequest'];

function CouponFactory($q, couponRequest) {

    function thenFunc(response) {
        // console.log(response);
        return response;
    }

    function errFunc(err){
        console.log(errFunc);
    }

    return {

        getUserCoupons: function (id) {
            var req_coupon = couponRequest.getUserCoupons(id);
            return $q.all([req_coupon])
                .then(thenFunc, errFunc)
        }

    }

}