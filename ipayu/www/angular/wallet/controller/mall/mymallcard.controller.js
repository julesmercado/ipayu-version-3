


walletModule.controller('myMallCardCtrl', MyMallCardCtrl)


MyMallCardCtrl.$inject = ['$scope', 'walletData'];

function MyMallCardCtrl($scope, walletData) {
	$scope.lastUsed = walletData.getLastUserCards('mall');
	$scope.frequent = walletData.getFrequentUserCards('mall');
	$scope.mallCards = walletData.getUserCards('mall');
}
