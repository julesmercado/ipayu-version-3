
mainModule.controller('dashboardCtrl', DashboardCtrl)


DashboardCtrl.$inject = ['$scope', '$rootScope', '$state', 'account', 'accountData', 'ngDialog', '$timeout'];
function DashboardCtrl($scope, $rootScope, $state, account, accountData, ngDialog, $timeout ) {
	
	$scope.date = new Date();

    $scope.clock = Date.now();
$scope.tickInterval = 1000;

var tick = function() {
    $scope.clock = Date.now(); 
    $timeout(tick, $scope.tickInterval);
}
$timeout(tick, $scope.tickInterval);
	
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
