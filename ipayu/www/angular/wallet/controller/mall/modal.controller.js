


walletModule.controller('redeemModalCtrl', RedeemModal)
walletModule.controller('addCardModalCtrl', AddCardModal)
walletModule.controller('cardSuccessfullyAddedCtrl', CardSuccessfullyAdded)

RedeemModal.$inject = ['$scope', '$rootScope', '$timeout', 'accountData', 'walletData', 'redeemable', 'wallet'];
function RedeemModal($scope, $rootScope, $timeout, accountData, walletData, redeemable, wallet) {

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
    $scope.redeemable_type = (redeemable.points_type == 'reward')?'Points':'USD';
    $scope.item     = redeemable;

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

    function doRedeem(dataToSend) {
        wallet.redeem(dataToSend)
            .then(function(resolve){
                $rootScope.$broadcast('updateData');
                $scope.isClick = false;
                $scope.isRedeemed = true;
                $scope.isLoading = false;
            })
    }

    function newPointsBalance(points_balance, point_value, counter){
        return Math.round(points_balance - (point_value * counter)).toString().split('.')[0];
    }

    $scope.confirmRedeem = function () {
        wallet.getUserCards({'ipayu_id'	: ipayu_info.ipayu_id, 'type'	: $scope.type})
            .then(function(resolve){
                if(resolve){
                    var cards = resolve[0].data.data.all;
                    var card = {};
                    for(var i = 0; i < cards.length; i++){
                        if(cards[i].card_id == $scope.cardId){
                            card = cards[i];
                            break;
                        }
                    }
                    var card_balance = (redeemable.points_type == 'reward')?card.rewards_balance:card.rebates_balance;
                    var dataToSend = {
                        'ipayu_id' : ipayu_info.ipayu_id,
                        'redeemable_id' : $scope.rewardsID,
                        'datetime_redeemed' : Date.parse(new Date()),
                        'balance'   : card_balance - ($scope.point_value * $scope.counter),
                        'quantity'  : parseInt($scope.counter),
                        'points_used'   : parseInt($scope.point_value * $scope.counter)
                    }
                    $scope.t = newPointsBalance(card_balance, $scope.point_value, $scope.counter);
                    $scope.isLoading = true;
                    doRedeem(dataToSend);
                }
            })
    };

    $scope.cancelRedeem = function () {
        $scope.isClick = false;
    };

}

AddCardModal.$inject = ['$scope', '$state', 'ngDialog', '$rootScope', 'walletData', 'accountData', 'wallet', 'card', 'destination', 'border_class'];
function AddCardModal($scope, $state, ngDialog, $rootScope, walletData, accountData, wallet, card, destination, border_class) {
    var user_info = accountData.getUser();
    $scope.border_class = border_class;
    $scope.proceed = function(){
        card.country_code = $rootScope.countryDisplay.name;
        card.country = $rootScope.searchCountry.country;
        walletData.setCardToAdd(card);
        
        if(destination == 'addmallcard' || destination == 'addshopcard'){
            requestFetured();
        }
        else {
            state_go();
        }
    }
    
    function requestFetured() {
        var type = '';
        if(destination == 'addmallcard') {
            type = 'mall';
        }
        else if (destination == 'addshopcard') {
            type = 'shop';
        }
        wallet.getFeaturedCards({'ipayu_id' : user_info.ipayu_id, 'type' : type})
        .then(function(resolve){
            walletData.setFeaturedCards(resolve[0].data.data);
            state_go();
        })
    }
    
    function state_go() {
        ngDialog.closeAll();
        $state.transitionTo(destination, {}, { 
          reload: true, inherit: false, notify: true
        });
    }
}

CardSuccessfullyAdded.$inject = ['$scope', '$state', '$rootScope', 'ngDialog', 'result', 'destination', 'border_class'];
function CardSuccessfullyAdded($scope, $state, $rootScope, ngDialog, result, destination, border_class) {
    $scope.border_class = border_class;
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





