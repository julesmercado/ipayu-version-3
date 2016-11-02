

walletModule.controller('myShopCardCtrl', MyShopCardCtrl)
walletModule.controller('myShopCardViewCtrl', MyShopCardViewCtrl)


MyShopCardCtrl.$inject = ['$scope', 'walletData'];

function MyShopCardCtrl($scope, walletData) {
	$scope.lastUsed = walletData.getLastUserCards('shop');
	$scope.frequent = walletData.getFrequentUserCards('shop');
	$scope.shopCards = walletData.getUserCards('shop');
}


MyShopCardViewCtrl.$inject = ['$scope', '$rootScope', 'walletData', 'customService'];

function MyShopCardViewCtrl($scope, $rootScope, walletData, customService) {

	$scope.shopCards = customService.filterByCountry(walletData.getUserCards('shop'), $rootScope.countryDisplay.country, true);

    $scope.$watch('searchCountry.country',
                function(newValue, oldValue){
                	$scope.shopCards = customService.filterByCountry(walletData.getUserCards('shop'), $rootScope.countryDisplay.country, true);
                }
            )
}