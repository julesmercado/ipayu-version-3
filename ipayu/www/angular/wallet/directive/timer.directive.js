
walletModule.directive('timerCountdown', TimerDirective);


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