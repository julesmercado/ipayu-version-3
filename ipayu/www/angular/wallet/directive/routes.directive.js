

walletModule.directive('routeMymallcard', Mymallcard)
walletModule.directive('routeMyshopcard', Myshopcard)
walletModule.directive('routeMycouponcard', Mycouponcard)
walletModule.directive('routeMystampcard', Mystampcard)

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


Mycouponcard.$inject = ['$state'];
function Mycouponcard($state) {
	return {
	    restrict: 'A',
	    scope: '',
	    link: function(scope, element, attrs, ctrl) {
	    	element.bind('click', function () {
				$state.go('mycouponcards');
	    	})
	    }
	  }
}


Mystampcard.$inject = ['$state'];
function Mystampcard($state) {
	return {
	    restrict: 'A',
	    scope: '',
	    link: function(scope, element, attrs, ctrl) {
	    	element.bind('click', function () {
				$state.go('mystampcards');
	    	})
	    }
	  }
}

