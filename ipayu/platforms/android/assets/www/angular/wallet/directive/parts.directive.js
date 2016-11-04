

walletModule.directive('mallHeader', MallHeaderDrctv)
walletModule.directive('mallFooter', MallFooterDrctv)

walletModule.directive('shopHeader', ShopHeaderDrctv)
walletModule.directive('shopFooter', ShopFooterDrctv)

walletModule.directive('couponHeader', CouponHeaderDrctv)
walletModule.directive('couponFooter', CouponFooterDrctv)

walletModule.directive('stampHeader', StampHeaderDrctv)
walletModule.directive('stampFooter', StampFooterDrctv)


// Mall
function MallHeaderDrctv() {
	return {
	    restrict: 'E',
	    templateUrl: 'templates/wallet/mall/header.html'
	  }
}
function MallFooterDrctv() {
	return {
	    restrict: 'E',
	    templateUrl: 'templates/wallet/mall/footer.html'
	  }
}


// Shop
function ShopHeaderDrctv() {
	return {
	    restrict: 'E',
	    templateUrl: 'templates/wallet/shop/header.html'
	  }
}
function ShopFooterDrctv() {
	return {
	    restrict: 'E',
	    templateUrl: 'templates/wallet/shop/footer.html'
	  }
}


// Coupon
function CouponHeaderDrctv() {
	return {
	    restrict: 'E',
	    templateUrl: 'templates/wallet/coupon/header.html'
	  }
}
function CouponFooterDrctv() {
	return {
	    restrict: 'E',
	    templateUrl: 'templates/wallet/coupon/footer.html'
	  }
}


// Coupon
function StampHeaderDrctv() {
	return {
	    restrict: 'E',
	    templateUrl: 'templates/wallet/stamp/header.html'
	  }
}
function StampFooterDrctv() {
	return {
	    restrict: 'E',
	    templateUrl: 'templates/wallet/stamp/footer.html'
	  }
}
