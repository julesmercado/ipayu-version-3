
mainModule.factory('couponData', CouponData)


CouponData.$inject = ['storages'];
function CouponData(storages) {
    
    var coupon_group = [],
        all_available = [],
        card_to_add = [];
    
    function dataFromStorage(storage) {
        var retrievedObject = localStorage.getItem(storage);
        return JSON.parse(retrievedObject) || [];
    }
    
    return {
        
        allAvailableCard: function(data){
            if(data){
                all_available = data;
            }
            return all_available;
        },

        cardToAdd: function(data){
            if(data){
                card_to_add = data;
            }
            return card_to_add;
        },
        
        userCoupons: function (data) {
            if(data){
                localStorage.setItem(storages.ipayucouponcards, JSON.stringify(data));
                return data;
            }
            return dataFromStorage(storages.ipayucouponcards)
        },
        
        featuredCoupons: function (data) {
            if(data){
                localStorage.setItem(storages.ipayufeaturedcoupons, JSON.stringify(data));
                return data;
            }
            return dataFromStorage(storages.ipayufeaturedcoupons)
        },
        
        usedCoupons: function (data) {
            if(data){
                localStorage.setItem(storages.ipayuusedcoupons, JSON.stringify(data));
                return data;
            }
            return dataFromStorage(storages.ipayuusedcoupons)
        },
        
        couponGroup: function (data) {
            if(data){
                coupon_group = data;
            }
            return coupon_group;
        }
        
    }

}