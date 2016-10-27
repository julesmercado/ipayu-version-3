

walletModule.controller('myShopCardCtrl', MyShopCardCtrl)


MyShopCardCtrl.$inject = ['$scope', 'walletData'];

function MyShopCardCtrl($scope, walletData) {
	$scope.lastUsed = walletData.getLastUserCards('shop');
	$scope.frequent = walletData.getFrequentUserCards('shop');
	$scope.shopCards = walletData.getUserCards('shop');
}
