
mainModule.factory('couponData', CouponData)


CouponData.$inject = ['storages'];
function CouponData(storages) {
    
    var coupon_group = [];
    
    return {

// Setters
        setUserCoupons: function (data) {
            localStorage.setItem(storages.ipayucouponcards, JSON.stringify(data));
            return data;
        },
        setFeaturedCoupons: function (data) {
            localStorage.setItem(storages.ipayufeaturedcoupons, JSON.stringify(data));
            return data;
        },
        setUsedCoupons: function (data) {
            localStorage.setItem(storages.ipayuusedcoupons, JSON.stringify(data));
            return data;
        },
        setCouponGroup: function (data) {
            coupon_group = data;
            return data;
        },


// Getters
        getUserCoupons: function () {
            var retrievedObject = localStorage.getItem(storages.ipayucouponcards);
            return JSON.parse(retrievedObject) || [];
        },
        getFeaturedCoupons: function () {
            var retrievedObject = localStorage.getItem(storages.ipayufeaturedcoupons);
            return JSON.parse(retrievedObject) || [];
        },
        getUsedCoupons: function () {
            var retrievedObject = localStorage.getItem(storages.ipayuusedcoupons);
            return JSON.parse(retrievedObject) || [];
        },
        getCouponGroup: function () {
            return coupon_group;
        },


        addUserCoupon: function(data){
            var retrievedObject = localStorage.getItem(storages.ipayucouponcards);
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