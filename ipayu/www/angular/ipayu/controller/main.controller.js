
mainModule.controller('mainCtrl', MainCtrl)


MainCtrl.$inject = ['$rootScope', '$timeout'];

function MainCtrl($rootScope, $timeout) {
	
	$rootScope.showMenu = false;
    $rootScope.hasBG = false;
    $rootScope.menuDisplayed = false;
    var tOut;

    $rootScope.menuSwipeLeft = function(){
        if($rootScope.showMenu){
            $timeout.cancel(tOut);
            $rootScope.showMenu = false;
            $rootScope.hasBG = false;
            tOut = $timeout(function() {
                $rootScope.menuDisplayed = false;
            }, 900);
        }
    }

    $rootScope.toggleMenu = function(){
        $timeout.cancel(tOut);
        if(!$rootScope.menuDisplayed){
            $rootScope.menuDisplayed = true;
        }

        $rootScope.showMenu = ($rootScope.showMenu) ? false:true;
        $rootScope.hasBG = ($rootScope.hasBG) ? false:true;

        if(!$rootScope.showMenu){
            tOut = $timeout(function() {
                $rootScope.menuDisplayed = false;
            }, 900);
        }
    }

}
