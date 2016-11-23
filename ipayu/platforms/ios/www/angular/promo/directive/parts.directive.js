

promoModule.directive('promoHeader', PromoHeader)
promoModule.directive('promoReserveModal', PromoReserve)
promoModule.directive('confirmRemoveItemModal', confirmRemoveItem)

// Landing
PromoHeader.$inject = [];
function PromoHeader() {
	return {
	    restrict: 'E',
        templateUrl: 'templates/promos/header.html'
	  }
}

PromoReserve.$inject = [];
function PromoReserve() {
	return {
	    restrict: 'E',
        templateUrl: 'templates/promos/reserve-modal.html'
	  }
}

confirmRemoveItem.$inject = [];
function confirmRemoveItem() {
	return {
	    restrict: 'E',
        templateUrl: 'templates/promos/confirm-remove-item.html'
	  }
}