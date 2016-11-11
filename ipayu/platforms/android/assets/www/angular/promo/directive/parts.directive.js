

promoModule.directive('promoHeader', PromoHeader)

// Landing
PromoHeader.$inject = [];
function PromoHeader() {
	return {
	    restrict: 'E',
        templateUrl: 'templates/promos/header.html'
	  }
}