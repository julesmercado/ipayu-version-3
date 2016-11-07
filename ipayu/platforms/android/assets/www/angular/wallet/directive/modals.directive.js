

walletModule.directive('redeemModal', Redeem)
walletModule.directive('addCardConfirmModal', AddCardConfirm)
walletModule.directive('cardSuccessfullyAddedModal', CardSuccessfullyAdded)

function Redeem() {
	return {
		restrict: 'E',
		templateUrl: 'templates/wallet/modal/redeem.html'
	}
}

function AddCardConfirm() {
	return {
		restrict: 'E',
		templateUrl: 'templates/wallet/modal/confirm-add-card.html'
	}
}

function CardSuccessfullyAdded() {
	return {
		restrict: 'E',
		templateUrl: 'templates/wallet/modal/card-successfully-added.html'
	}
}
