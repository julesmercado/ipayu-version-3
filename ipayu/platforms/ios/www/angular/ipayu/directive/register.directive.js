
mainModule.directive('registration', RegisterDrctv)

// RegisterDrctv.$inject = ['$scope', '$rootScope', 'flags'];

function RegisterDrctv() {

	return {
	    restrict: 'A',
	    scope: '',
	    link: function(scope, element, attrs, ctrl) {
	    	
	    }
	  }

}

