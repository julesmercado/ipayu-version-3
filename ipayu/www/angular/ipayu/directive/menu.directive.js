
mainModule.directive('menu', MenuDrctv)


// MenuDrctv.$inject = ['$scope', '$rootScope', 'flags'];

function MenuDrctv() {

	return {
		restrict: 'E',
		templateUrl: 'templates/menu.html',
        controller: function($scope, $rootScope, accountData){
            
            $scope.ipayu_menu_info = accountData.getUser();
            
        }
	}

}

