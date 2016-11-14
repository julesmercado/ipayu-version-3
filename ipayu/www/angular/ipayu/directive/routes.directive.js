
mainModule.directive('back', Back)
mainModule.directive('dash', Dash)
mainModule.directive('profile', Dash)

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


Dash.$inject = ['$state'];
function Dash($state) {
	return {
	    restrict: 'A',
	    scope: '',
	    link: function(scope, element, attrs, ctrl) {
	    	element.bind('click', function () {
                $state.transitionTo('dashboard', {}, { 
                  reload: true, inherit: false, notify: true
                });
	    	})
	    }
	  }
}



Dash.$inject = ['$state'];
function Dash($state) {
	return {
	    restrict: 'A',
	    scope: '',
	    link: function(scope, element, attrs, ctrl) {
	    	element.bind('click', function () {
                $state.transitionTo('profile', {}, { 
                  reload: true, inherit: false, notify: true
                });
	    	})
	    }
	  }
}

