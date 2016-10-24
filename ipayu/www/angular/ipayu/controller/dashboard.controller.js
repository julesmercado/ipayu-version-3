
mainModule.controller('dashboardCtrl', DashboardCtrl)


DashboardCtrl.$inject = ['$scope', '$rootScope', '$state', 'account', 'accountData'];

function DashboardCtrl($scope, $rootScope, $state, account, accountData) {
	
	$scope.date = new Date();
	$scope.ipayu_info = accountData.getUser();
	
	$scope.dashboardMyCards = [];
	for (var i = 0; i < 1; i++) {
		var arr = {
			'card_id'			: i,
			'card_image'		:'asasas',
			'type_1'			: 'mall',
			'points_type'		: 'both',
			'rebates_balance'	: 100,
			'points_balance'	: 12
		}
		$scope.dashboardMyCards.push(arr)
	}
	$scope.dashboardMyCards.push(new Array())
	console.log($scope.dashboardMyCards)

}
