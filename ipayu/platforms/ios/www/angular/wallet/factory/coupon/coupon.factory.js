
walletModule.factory('coupon', CouponFactory)

CouponFactory.$inject = ['$q', 'couponRequest'];

function CouponFactory($q, couponRequest) {

    function thenFunc(response) {
        // console.log(response);
        return response;
    }

    function errFunc(err){
        console.log(err);
    }

    return {

        getUserCoupons: function (id, ignore) {
            var req_coupon = couponRequest.getUserCoupons(id, ignore);
            return $q.all([req_coupon])
                .then(thenFunc, errFunc)
        }

    }

}