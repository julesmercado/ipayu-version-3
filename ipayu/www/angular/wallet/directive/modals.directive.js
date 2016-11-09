

walletModule.directive('redeemModal', Redeem)
walletModule.directive('addCardConfirmModal', AddCardConfirm)
walletModule.directive('cardSuccessfullyAddedModal', CardSuccessfullyAdded)
walletModule.directive('largeQrModal', LargeQrModal)

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

function LargeQrModal() {
	return {
		restrict: 'E',
		templateUrl: 'templates/wallet/modal/large-qr.html',
        controller: function($scope, accountData){
            $scope.ipayu_info = accountData.getUser();
        }
	}
}


