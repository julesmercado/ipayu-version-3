
mainModule.controller('dashboardCtrl', DashboardCtrl)


DashboardCtrl.$inject = ['$scope', '$rootScope', '$state', 'account', 'accountData'];

function DashboardCtrl($scope, $rootScope, $state, account, accountData) {
	
	$scope.date = new Date();
	
	$scope.dashboardMyCards = accountData.getTopThreeFrequent();
	console.log($scope.dashboardMyCards);
    

    $scope.showLargeQr = function(){
        ngDialog.open({
            template: 'largeQR',
            className: 'ngdialog-theme-plain add-card-custom',
            controller: ['$scope', 'offlineData', function ($scope, offlineData) {
                
                $scope.ipayu_info = offlineData.getUser();

            }],
            overlay: true
        });
    }
    
}
