
mainModule.directive('back', Back)

Back.$inject = ['$state'];
function Back($state) {
	return {
	    restrict: 'A',
	    scope: '',
	    link: function(scope, element, attrs, ctrl) {
	    	element.bind('click', function () {
				window.history.back();
	    	})
	    }
	  }
}

