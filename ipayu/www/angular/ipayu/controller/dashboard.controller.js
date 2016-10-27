
mainModule.controller('dashboardCtrl', DashboardCtrl)


DashboardCtrl.$inject = ['$scope', '$rootScope', '$state', 'account', 'accountData'];

function DashboardCtrl($scope, $rootScope, $state, account, accountData) {
	
	$scope.date = new Date();
	$scope.ipayu_info = accountData.getUser();
	
	$scope.dashboardMyCards = accountData.getTopThreeFrequent();
	console.log($scope.dashboardMyCards);
}
