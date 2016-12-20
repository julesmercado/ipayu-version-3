
mainModule.directive('menu', MenuDrctv)


// MenuDrctv.$inject = ['$scope', '$rootScope', 'flags'];
function MenuDrctv() {
	return {
		restrict: 'E',
		templateUrl: 'templates/menu.html',
        controller: function($scope, accountData, $rootScope, $timeout){
            $scope.ipayu_menu_info = accountData.getUser();
            $rootScope.$on('updateUserInfo', function(event, data){
                $timeout(function(){
                    $scope.$apply(function(){
                        $scope.ipayu_menu_info = accountData.getUser();
                    })
                })
            })
        }
	}
}

