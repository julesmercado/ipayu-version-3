
walletModule.directive('routeMymallcard', Mymallcard)
walletModule.directive('routeMyshopcard', Myshopcard)

Mymallcard.$inject = ['$state'];
function Mymallcard($state) {
	return {
	    restrict: 'A',
	    scope: '',
	    link: function(scope, element, attrs, ctrl) {
	    	element.bind('click', function () {
				$state.go('mymallcards');
	    	})
	    }
	  }
}

Myshopcard.$inject = ['$state'];
function Myshopcard($state) {
	return {
	    restrict: 'A',
	    scope: '',
	    link: function(scope, element, attrs, ctrl) {
	    	element.bind('click', function () {
				$state.go('myshopcards');
	    	})
	    }
	  }
}

