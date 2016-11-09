
mainModule.controller('dashboardCtrl', DashboardCtrl)


DashboardCtrl.$inject = ['$scope', '$rootScope', '$state', 'account', 'accountData', 'ngDialog', '$timeout'];
function DashboardCtrl($scope, $rootScope, $state, account, accountData, ngDialog, $timeout ) {
	
	$scope.date = new Date();
	$scope.ipayu_info = accountData.getUser();

    $scope.clock = Date.now();
    $scope.tickInterval = 1000;
    $timeout(tick, $scope.tickInterval);

    function tick() {
        $scope.clock = Date.now(); 
        $timeout(tick, $scope.tickInterval);
    }
	
	$scope.dashboardMyCards = accountData.getTopThreeFrequent();

    $scope.showLargeQr = function(){
        ngDialog.open({
            template: 'largeQR',
            className: 'ngdialog-theme-plain add-card-custom',
            controller: '',
            overlay: true
        });
    }
    
}
