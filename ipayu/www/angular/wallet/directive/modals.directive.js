

walletModule.directive('redeemModal', RedeemModal)

// Mall
function RedeemModal() {
	return {
		restrict: 'E',
		templateUrl: 'templates/wallet/modal/redeem-modal.html'
	}
}
