
mainModule.factory('couponData', CouponData)

// CouponData.$inject = [];

function CouponData() {
    
    var coupon_group = [];
    
    return {

// Setters
        setUserCoupons: function (data) {
            localStorage.setItem('ipayucouponcards', JSON.stringify(data));
            return data;
        },
        setFeaturedCoupons: function (data) {
            localStorage.setItem('ipayufeaturedcoupons', JSON.stringify(data));
            return data;
        },
        setUsedCoupons: function (data) {
            localStorage.setItem('ipayuusedcoupons', JSON.stringify(data));
            return data;
        },
        setCouponGroup: function (data) {
            coupon_group = data;
            return data;
        },


// Getters
        getUserCoupons: function () {
            var retrievedObject = localStorage.getItem('ipayucouponcards');
            return JSON.parse(retrievedObject) || [];
        },
        getFeaturedCoupons: function () {
            var retrievedObject = localStorage.getItem('ipayufeaturedcoupons');
            return JSON.parse(retrievedObject) || [];
        },
        getUsedCoupons: function () {
            var retrievedObject = localStorage.getItem('ipayuusedcoupons');
            return JSON.parse(retrievedObject) || [];
        },
        getCouponGroup: function () {
            return coupon_group;
        },


        addUserCoupon: function(data){
            var retrievedObject = localStorage.getItem('ipayucouponcards');
            retrievedObject = JSON.parse(retrievedObject) || [];
            retrievedObject.push(data);

            retrievedObject.sort(function(a, b){
                if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                return 0;
            });
            localStorage.setItem(t, JSON.stringify(retrievedObject));
        },

    }

}