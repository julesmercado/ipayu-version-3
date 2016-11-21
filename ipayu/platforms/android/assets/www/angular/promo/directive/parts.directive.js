

promoModule.directive('promoHeader', PromoHeader)
promoModule.directive('promoReserveModal', PromoReserveModal)

// Landing
PromoHeader.$inject = [];
function PromoHeader() {
	return {
	    restrict: 'E',
        templateUrl: 'templates/promos/header.html'
	  }
}

PromoReserveModal.$inject = [];
function PromoReserveModal() {
	return {
	    restrict: 'E',
        templateUrl: 'templates/promos/reserve-modal.html'
	  }
}