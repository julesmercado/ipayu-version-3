

walletModule.controller('myCouponCtrl', MyCouponCtrl)


MyCouponCtrl.$inject = ['$scope', '$rootScope', 'couponData'];

function MyCouponCtrl($scope, $rootScope, couponData) {
	$scope.coupons = filterCouponcard(couponData.getUserCoupons());
	$scope.featured = filterCouponcard(couponData.getFeaturedCoupons());
	// $scope.used = couponData.getUsedCoupons();

    function filterCouponcard(data){
        if(!data || data.length == 0){
            return [];
        }
        var booklets = [],
            coupons = [];
        for (var i = 0; i < data.length; i++) {
            if(data[i].country == $rootScope.countryDisplay.country ){
                if(data[i].date_end){
                    data[i].remainingTime = '';
                }
                if(data[i].booklet_id != 0){
                    booklets.push(data[i]);
                }
                else{
                    coupons.push(data[i]);
                }
            }
        };
        return booklets.concat(coupons);
    }

    

    $scope.$watch(
            function(){
                return $rootScope.searchCountry.country;
            },
            function(newValue, oldValue){
                $scope.coupons = filterCouponcard(couponData.getUserCoupons());
                $scope.featured = filterCouponcard(couponData.getFeaturedCoupons());
            }
        )
}

