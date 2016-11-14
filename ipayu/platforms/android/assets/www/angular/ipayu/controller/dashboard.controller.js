
mainModule.controller('dashboardCtrl', DashboardCtrl)


DashboardCtrl.$inject = ['$scope', '$rootScope', '$state', 'account', 'accountData', 'ngDialog', '$timeout', 'wallet', 'flags'];
function DashboardCtrl($scope, $rootScope, $state, account, accountData, ngDialog, $timeout, wallet, flags) {
    
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
    console.log($scope.dashboardMyCards)

    $scope.showLargeQr = function(){
        ngDialog.open({
            template: 'largeQR',
            className: 'ngdialog-theme-plain add-card-custom',
            controller: '',
            overlay: true
        });
    }

    $rootScope.$on('newDashboardData', function (event, data) {
        // console.log(data, 'New Dashboard')
        $scope.dashboardMyCards = data;
    })
    
}
