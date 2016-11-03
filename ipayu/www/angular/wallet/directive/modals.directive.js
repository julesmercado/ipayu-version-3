

walletModule.directive('redeemModal', RedeemModal)
walletModule.directive('addCardConfirmModal', AddCardConfirmModal)

// Mall
function RedeemModal() {
	return {
		restrict: 'E',
		templateUrl: 'templates/wallet/modal/redeem.html'
	}
}

// Mall
function AddCardConfirmModal() {
	return {
		restrict: 'E',
		templateUrl: 'templates/wallet/modal/confirm-add-card.html'
	}
}
