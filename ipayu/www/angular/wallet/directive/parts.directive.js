

walletModule.directive('mallHeader', MallHeaderDrctv)
walletModule.directive('mallFooter', MallFooterDrctv)
walletModule.directive('shopHeader', ShopHeaderDrctv)
walletModule.directive('shopFooter', ShopFooterDrctv)


function MallFooterDrctv() {

	return {
	    restrict: 'E',
	    templateUrl: 'templates/wallet/mall/footer.html'
	  }

}
function MallHeaderDrctv() {

	return {
	    restrict: 'E',
	    templateUrl: 'templates/wallet/mall/header.html'
	  }

}


function ShopFooterDrctv() {

	return {
	    restrict: 'E',
	    templateUrl: 'templates/wallet/shop/footer.html'
	  }

}

function ShopHeaderDrctv() {

	return {
	    restrict: 'E',
	    templateUrl: 'templates/wallet/shop/header.html'
	  }

}
