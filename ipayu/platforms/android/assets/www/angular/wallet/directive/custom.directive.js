
walletModule.directive('timerCountdown', TimerDirective)
walletModule.directive('stringToTimestamp', StringToTimestamp)
walletModule.directive('downloadExcel', DownloadExcel)
walletModule.directive('addCardForm', AddCardForm)
walletModule.directive('promoTimeRemaining', PromoTimeRemaining)
walletModule.directive('onFinishRender', OnFinishRender)
walletModule.directive('pspSetHeight', PspSetHeight)


TimerDirective.$inject = ['customService'];
function TimerDirective(customService){

    return {
            restrict: 'A',
            scope: {
                thisCard: '=card'
            },
            link : function(scope, element, attrs){
                var de = attrs.timerCountdown;
                
                countdown();
                
                function countdown(){
                    heheTimer = setInterval(function(){
                        theTimer = customService.getTimeRemaining(de);
                        if(theTimer.total<=0){
                            scope.thisCard.expired = true;
                            scope.$emit(attrs.timerEmit, scope.thisCard);
                        }
                        else{
                            var days = (theTimer.days == 0)?'':theTimer.days+'d',
                                hours = theTimer.hours,
                                minutes = theTimer.minutes,
                                seconds = theTimer.seconds;
                                element.text(days+' '+hours+':'+minutes+':'+seconds);   
                        }
                      },1000);
                }

             }
        }
}

StringToTimestamp.$inject = ['walletData'];
function StringToTimestamp(walletData){
    return {
        require: 'ngModel',
        link: function(scope, element, attr, ngModel) {
            // view to model
            ngModel.$parsers.push(function(value) {
                return Date.parse(value);
            });
        }
    }
}


DownloadExcel.$inject = ['excel', 'accountData', 'wallet'];
function DownloadExcel(excel, accountData, wallet){
    return {
        restrict: 'A',
        link: function(scope, element, attr, ctrl) {
            element.bind('click', function(){
                var ipayu_info = accountData.getUser(),
                    toExport = excel.getCurrentFilter(),
                    tableId = '#table-transaction',
                    link = excel.tableToExcel(tableId,'sheet name'),
                    from = scope.dateFilter.mindate.replace(/\//g, "-"),
                    to = scope.dateFilter.maxdate.replace(/\//g, "-"),
                    uniq = new Date().getTime(),
                    filename = 'Ipayu_'+ipayu_info.firstname+'_'+ipayu_info.lastname+'_Transaction_From_'+from+'_To_'+to+'_'+uniq+'.xls',
                    as = link.split(',');

                var dataToSend = {
                    'datetime_created'  : Date.parse(new Date()),
                    'file'              : {
                        'Base64'    : as[1],
                        'filename'  : filename
                    }
                }
                
                wallet.sendExportedTable(dataToSend)
                    .then(
                            function(response){
                                if(response){
                                    window.open(response[0].data.data, '_system');
                                    console.log(response);
                                }
                            },
                            function(error){
                                console.log(error);
                            }
                        )

            })
        }
    }
}


AddCardForm.$inject = [];
function AddCardForm() {
    return {
        restrict:   'A',
        scope: false,
        controller: function($scope, flags, accountData){
            var ipayu_info = accountData.getUser();
            $scope.dummy_image = 'http://lightbreak.zz.mu/ipayu/assets/icons/sm.png';
            
            $scope.phonePrefix = flags.getFlagByCode($scope.thisCard.country_code);
            $scope.openToolTip = false;

            $scope.userData = {
                'name' : {'i_value': ipayu_info.firstname + ' ' + ipayu_info.lastname},
                'email': {'i_value': ipayu_info.email},
                'phone': {'i_value': '', 'hasError': true, 'touched': false, 'message' : ''},
                'address': {'i_value': '', 'hasError': true, 'touched': false, 'message' : ''},
                'city': {'i_value': '', 'hasError': true, 'touched': false, 'message' : ''},
                'postal': {'i_value': '', 'hasError': true, 'touched': false, 'message' : ''}
            };

            $scope.$watch('phonePrefix.prefix',
                    function(newValue){
                        $scope.phonePrefix = flags.getFlagByPrefix(newValue);
                    }
                )

            $scope.upPhone = function (reset) {
                if(reset){resetError('phone');}
                var hasError = false;
                $scope.userData.phone.touched = true;
                if(typeof $scope.userData.phone.i_value != 'undefined' && $scope.userData.phone.i_value != '' && $scope.userData.phone.i_value != null){
                    if($scope.userData.phone.i_value.toString().length == $scope.phonePrefix.limit){
                        $scope.userData.phone.hasError = false;
                    }
                    else{
                        hasError = true;
                        $scope.userData.phone.hasError = true;
                        $scope.userData.phone.message = 'Mobile number must contain '+$scope.phonePrefix.limit+' digits';
                    }
                }
                else {
                    $scope.userData.phone.hasError = true;
                    $scope.userData.phone.message = 'This field is required';
                    hasError = true;
                }
                return hasError;
            }

            $scope.upAddress = function(reset){
                if(reset){resetError('address');}
                var hasError = false;
                $scope.userData.address.touched = true;
                if($scope.userData.address.i_value && $scope.userData.address.i_value != ''){
                    $scope.userData.address.hasError = false;
                }
                else{
                    hasError = true;
                    $scope.userData.address.hasError = true;
                    $scope.userData.address.message = 'This field is required';
                }
                return hasError;
            }

            $scope.upCity = function(reset){
                if(reset){resetError('city');}
                var hasError = false;
                $scope.userData.city.touched = true;
                if($scope.userData.city.i_value && $scope.userData.city.i_value != ''){
                    $scope.userData.city.hasError = false;
                }
                else{
                    hasError = true;
                    $scope.userData.city.hasError = true;
                    $scope.userData.city.message = 'This field is required';
                }
                return hasError;
            }

            $scope.upPostal = function(reset){
                if(reset){resetError('postal');}
                var hasError = false;
                $scope.userData.postal.touched = true;
                if($scope.userData.postal.i_value && $scope.userData.postal.i_value != ''){
                    $scope.userData.postal.hasError = false;
                }
                else{
                    hasError = true;
                    $scope.userData.postal.hasError = true;
                    $scope.userData.postal.message = 'This field is required';
                }
                return hasError;
            }

            function resetError(index){
            $scope.openToolTip = true;
                for (var i in $scope.userData) {
                    if ($scope.userData.hasOwnProperty(i) && i != index) {
                        $scope.userData[i].touched = false;
                    }
                }
            }
            
            $scope.addCard = function(){
                var checker = {
                    'phone'		: $scope.upPhone(),
                    'address'	: $scope.upAddress(),
                    'city'		: $scope.upCity(),
                    'postal'	: $scope.upPostal()
                }
                for(var i in checker){
                    if(checker.hasOwnProperty(i) && checker[i] == true){
                        $scope.openToolTip = true;
                        console.log($scope.userData)
                        return;
                    }
                }
                $scope.disableBtn = true;
                var cardDetails = {
                    'requestType'	: 'AddUserCard_',
                    'ipayu_id'		: ipayu_info.ipayu_id,
                    'card_id'		: $scope.thisCard.card_id,
                    'address'		: $scope.userData.address.i_value,
                    'city'			: $scope.userData.city.i_value,
                    'postal_code'	: $scope.userData.postal.i_value,
                    'phone'			: $scope.userData.phone.i_value,
                    'datetime_added': Date.parse(new Date()),
                    'type'			: $scope.cardType
                }
                $scope.$emit($scope.emitMessage, cardDetails);
            }
        }
    }
}


PromoTimeRemaining.$inject = ['customService'];
function PromoTimeRemaining(customService){

    return {
            restrict: 'A',
            link : function(scope, element, attrs){
                var date_end = attrs.promoTimeRemaining;
                
                countdown();
                
                function countdown(){
                    heheTimer = setInterval(function(){
                        theTimer = customService.getTimeRemaining(date_end);
                        if(theTimer.total<=0){
                            scope.$emit(attrs.promoSoloEmit);
                        }
                        else{
                            element.text(theTimer.days+' : '+theTimer.hours+' : '+theTimer.minutes);  
                        }
                      },1000);
                }

             }
        }

}

OnFinishRender.$inject = ['$timeout'];
function OnFinishRender($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit(attr.onFinishRender);
                });
            }
        }
    }
}

PspSetHeight.$inject = [];
function PspSetHeight() {
    return {
        restrict: 'A',
        scope: false,
        link: function(scope, element, attr) {
            if(scope.promoInfo.price == 0) {
                element.css('max-height', '100%');
            }
        }
    }
}