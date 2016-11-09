
mainModule.controller('dashboardCtrl', DashboardCtrl)


DashboardCtrl.$inject = ['$scope', '$rootScope', '$state', 'account', 'accountData', 'ngDialog'];
function DashboardCtrl($scope, $rootScope, $state, account, accountData, ngDialog) {
	
	$scope.date = new Date();
	$scope.ipayu_info = accountData.getUser();
	
	$scope.dashboardMyCards = accountData.getTopThreeFrequent();
	console.log($scope.dashboardMyCards);
    

    $scope.showLargeQr = function(){
        ngDialog.open({
            template: 'largeQR',
            className: 'ngdialog-theme-plain add-card-custom',
            controller: '',
            overlay: true
        });
    }
    
}
