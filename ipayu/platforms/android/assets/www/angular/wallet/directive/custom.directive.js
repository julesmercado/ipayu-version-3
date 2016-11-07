
walletModule.directive('timerCountdown', TimerDirective)
walletModule.directive('stringToTimestamp', StringToTimestamp)
walletModule.directive('downloadExcel', DownloadExcel)


TimerDirective.$inject = ['walletData'];
function TimerDirective(walletData){

    return {
            restrict: 'A',
            scope: {
                thisCoupon: '=coupon'
            },
            link : function(scope, element, attrs){
                var de = attrs.timerCountdown;
                function countdown(){

                    heheTimer = setInterval(function(){
                        theTimer = walletData.getTimeRemaining(de);
                        // console.log(theTimer)
                        if(theTimer.total<=0){
                            scope.thisCoupon.couponHasExpired = true;
                            if(attrs.timerType == 'featuredcoupon'){
                                scope.$emit('hasExpiredFeaturedCoupon', scope.thisCoupon);
                            }
                            else if(attrs.timerType == 'mycoupon'){
                                scope.$emit('hasExpiredCoupon', scope.thisCoupon);
                            }
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
                countdown();

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


DownloadExcel.$inject = ['excel', 'accountData'];
function DownloadExcel(excel, accountData){
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
                    uniq = new Date(),
                    uniq = uniq.getTime(),
                    filename = 'Ipayu_'+ipayu_info.firstname+' '+ipayu_info.lastname+'_Transaction_From_'+from+'_To_'+to+'_'+uniq+'.xls',
                    as = link.split(',');

                userFactory.exportTransaction(ipayu_info.email, as[1], filename)
                                    .then(
                                            function(response){
                                                console.log(response);
                                                window.open( $rootScope.api_url+response.data.filename, '_system');
                                            },
                                            function(error){
                                                console.log(error);
                                            }
                                        )

            })
        }
    }
}

