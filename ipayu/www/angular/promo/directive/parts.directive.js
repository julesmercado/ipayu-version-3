

promoModule.directive('promoHeader', PromoHeader)
promoModule.directive('promoReserveModal', PromoReserve)
promoModule.directive('confirmRemoveItemModal', confirmRemoveItem)
promoModule.directive('shareAnywhere', shareAnywhere)

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

shareAnywhere.$inject = ['$cordovaSocialSharing'];
function shareAnywhere($cordovaSocialSharing) {
	return {
	    restrict: 'A',
        link: function(scope, element, attrs, ctrl){
            element.bind('click', function(){
                var dataToShare = JSON.parse(attrs.shareAnywhere);
                $cordovaSocialSharing.share(dataToShare.description, dataToShare.name, dataToShare.image) 
                .then(function(result) {
                    // alert(JSON.stringify(result))
                }, function(err) {
                    // alert(JSON.stringify(err))
                });
            }
        }
	  }
}