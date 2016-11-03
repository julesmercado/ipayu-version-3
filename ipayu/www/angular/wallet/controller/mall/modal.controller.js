


walletModule.controller('redeemModalCtrl', RedeemModal)
walletModule.controller('addCardModalCtrl', AddCardModal)
walletModule.controller('cardSuccessfullyAddedCtrl', CardSuccessfullyAdded)

RedeemModal.$inject = ['$scope', '$timeout', 'accountData', 'walletData', 'redeemable'];
function RedeemModal($scope, $timeout, accountData, walletData, redeemable) {

    $scope.card = walletData.getCardInfo();
    var ipayu_info 	= accountData.getUser(),
    	balance 	= (redeemable.points_type == 'reward')?$scope.card.rewards_balance:$scope.card.rebates_balance;

    $scope.redeemData 	= {};
    $scope.cardId 		= redeemable.card_id;
    $scope.rewardsID 	= redeemable.redeemable_id;
    $scope.type 		= redeemable.card_type;
    $scope.point_value	= redeemable.point_value;
    $scope.quantity  	= redeemable.stock;
    $scope.image      	= redeemable.image;
    $scope.q_remaining 	= parseInt(redeemable.remaining_stock);

    $scope.isClick = false;
    $scope.isRedeemed = false;
    $scope.isSuccessful = false;
    $scope.isDisabled = false;
    $scope.counter = 0;
    $scope.belowZero = false;
    $scope.moreThanQuantity = false;
    $scope.isLoading = false;

    $scope.increment = function () {
        $scope.belowZero = false;
        var checker = false;
        var temp_counter = angular.copy($scope.counter) + 1;
        if(!isNaN($scope.q_remaining)){
            if( temp_counter > $scope.q_remaining ){
                checker = true;
            }
        }
        else{
            if( temp_counter > $scope.quantity ){
                checker = true;
            }
        }
        if(($scope.point_value * temp_counter) > balance){
            checker = true;
            alert('Not enough points')
        }
        if( checker ) {
            $scope.moreThanQuantity = true;
        }
        else{
            $scope.counter++;
        }
    };

    $scope.decrement = function () {
        $scope.moreThanQuantity = false;
        if($scope.counter > 0) {
            $scope.counter -= 1;
        }
        else if($scope.counter <= 0) {
            $scope.belowZero = true;
        }
    };

    $scope.redeem = function () {
        if($scope.counter > 0) {
            $scope.isClick = true;
        }
    };

    function doRedeem(){
    	console.log('do redeem')
        // mallCardFactory.addRedeemRewardsGift(ipayu_info.ipayu_id, $scope.redeemData)
        // .then(
        //     function success(response) {
        //         if(response.data.success) {
        //             $scope.isClick = false;
        //             $scope.isRedeemed = true;
        //             $scope.isLoading = false;
        //             $scope.card.rewards_balance = newPointsBalance($scope.card.rewards_balance, $scope.redeemData.point_value, $scope.counter);
        //             dataManager.addCardInfo($scope.card);

        //             mallCardFactory.updateUserHasCardsPoints($scope.redeemData.user_has_card_id,$scope.t)
        //             .then(
        //                 function success(res) {
        //                     getTransactionsFromDB($stateParams.cardId);
        //                     // getTransactions($stateParams.cardId);
        //                     // getCards();
        //                     // getDashboardData();
        //                 },
        //                 function error(res){
        //                     console.log(res);
        //                 }
        //             )
        //         }
        //         else {
        //            console.log(response);
        //         }
        //     },
        //     function error(response){
        //         console.log(response);
        //     }
        // )
    }

    function newPointsBalance(points_balance, point_value, counter){
        return Math.round(points_balance - (point_value * counter)).toString().split('.')[0];
    }

    $scope.confirmRedeem = function () {
    	console.log('confirmRedeem')
        // mallCardFactory.getTransactionInfo(ipayu_info.ipayu_id, cardId)
        //     .then(
        //             function success(response){
        //                 $scope.card = response.data.cardData;
        //                 $scope.redeemData.rewardsgift_id    = $scope.rewardsID;
        //                 $scope.redeemData.mall_card_id      = $scope.cardId;
        //                 $scope.redeemData.type              = $scope.type;
        //                 $scope.redeemData.point_value       = parseFloat($scope.point_value);
        //                 $scope.redeemData.quantity          = parseInt($scope.counter);
        //                 $scope.redeemData.items_remaining   = parseInt($scope.q_remaining - $scope.counter);
        //                 $scope.redeemData.date_redeemed     = (new Date()).toISOString().substring(0, 10);
        //                 $scope.redeemData.user_has_card_id  = $scope.card.user_has_card_id;
        //                 $scope.redeemData.balance           = $scope.card.rewards_balance - ($scope.redeemData.point_value * $scope.counter);
        //                 $scope.redeemData.points_redeem     = $scope.redeemData.point_value * $scope.counter;
        //                 $scope.redeemData.timestamp         = new Date();
        //                 $scope.t = newPointsBalance($scope.card.rewards_balance, $scope.redeemData.point_value, $scope.counter);
        //                 $scope.isLoading = true;
        //                 doRedeem();
        //             },
        //             function(error){

        //             }
        //         )

    };

    $scope.cancelRedeem = function () {
        $scope.isClick = false;
    };

}

AddCardModal.$inject = ['$scope', '$state', '$rootScope', 'walletData', 'card', 'destination'];
function AddCardModal($scope, $state, $rootScope, walletData, card, destination) {
    $scope.proceed = function(){
        card.country_code = $rootScope.countryDisplay.name;
        card.country = $rootScope.searchCountry.country;
        walletData.setCardToAdd(card);
        $state.go(destination);
    }
}

CardSuccessfullyAdded.$inject = ['$scope', '$state', '$rootScope', 'ngDialog', 'result', 'destination'];
function CardSuccessfullyAdded($scope, $state, $rootScope, ngDialog, result, destination) {
    $scope.result = result;
    $scope.ok = function(){
        if(result.success){
            $state.go(destination);
        }
        else{
            ngDialog.closeAll();
        }
    }
}





