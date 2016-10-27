
mainModule.factory('couponData', CouponData)

// CouponData.$inject = [];

function CouponData() {

    return {

// Setters
        setUserCoupons: function (data) {
            localStorage.setItem('ipayucouponcards', JSON.stringify(data));
            return;
        },

        setFeaturedCoupons: function (data, type) {
            localStorage.setItem('ipayufeaturedcoupons', JSON.stringify(data));
            return;
        },

        setUsedCoupons: function (data, type) {
            localStorage.setItem('ipayuusedcoupons', JSON.stringify(data));
            return;
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