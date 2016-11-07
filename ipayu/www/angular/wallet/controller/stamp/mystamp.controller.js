

walletModule.controller('myStampCtrl', MyStamp)


MyStamp.$inject = ['$scope', '$rootScope', 'stampData'];

function MyStamp($scope, $rootScope, stampData) {
	$scope.stamps = filterStampcard(stampData.getUserStamps());
	$scope.featured = filterStampcard(stampData.getFeaturedStamps());

    function filterStampcard(data){
        if(!data || data.length == 0){
            return [];
        }
        var returnData = [];
        for (var i = 0; i < data.length; i++) {
            if(data[i].country == $rootScope.countryDisplay.country ){
                if(data[i].datetime_end){
                    data[i].remainingTime = '';
                }
                returnData.push(data[i]);
            }
        };
        return returnData;
    }
    

    $scope.$watch(
            function(){
                return $rootScope.searchCountry.country;
            },
            function(newValue, oldValue){
                $scope.stamps = filterStampcard(stampData.getUserStamps());
                $scope.featured = filterStampcard(stampData.getFeaturedStamps());
            }
        )
}

