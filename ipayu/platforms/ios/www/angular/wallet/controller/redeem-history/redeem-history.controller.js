


walletModule.controller('redeemHistoryCtrl', RedeemHistory)
walletModule.controller('itemLocationCtrl', ItemLocationCtrl)



RedeemHistory.$inject = ['$scope', 'walletData'];
function RedeemHistory($scope, walletData) {
    $scope.items = walletData.getRedeemHistory();
    console.log($scope.items)
}

ItemLocationCtrl.$inject = ['$scope', 'walletData', '$stateParams'];
function ItemLocationCtrl($scope, walletData, $stateParams) {
    $scope.showBranches = false;

    $scope.thisItem = walletData.getItemInfo();
    $scope.selected = $scope.thisItem;
    $scope.branches = walletData.getItemLocation();
    console.log($scope.branches)
    $scope.thisItem.selected = true;

    $scope.toggleBranches = function () {
        $scope.showBranches = ($scope.showBranches)?false:true;
    }
    
    $scope.selectBranch = function (branch) {
        var index = $scope.branches.indexOf(branch);
        $scope.selected = $scope.branches[index];
        for(var i in $scope.branches){
            if($scope.branches.hasOwnProperty(i) && index != i){
                $scope.branches[i].selected = false;
            }
            else{
                $scope.branches[i].selected = true;
            }
        }
        $scope.toggleBranches();
    }
}





