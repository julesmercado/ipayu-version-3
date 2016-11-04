
    mallInfo.controller( 'mallInfoEventsFull', 
        function( $scope, $state, $stateParams , mallData , $rootScope , $uibModal ){ /*, offlineData*/

            $scope.info = mallData.setMallEvent();
            $scope.time_created = timeSince( $scope.info.datetime_created );
            $scope.limitText = 190;

            var monthNames = [
              "JAN", "FEB", "MAR",
              "APR", "MAY", "JUN", "JUL",
              "AUG", "SEP", "OCT",
              "NOV", "DEC"
            ];

            var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

            var dateStart = new Date( $scope.info.date_start );
            var dateEnd = new Date( $scope.info.date_end );
            var timeEnd = $scope.info.time_end;
            var timeStart = $scope.info.time_start;
            $scope.dateStart = {
                day: dateStart.getDate(),
                month: monthNames[dateStart.getMonth()],
                year: dateStart.getFullYear()
            };

            $scope.time = {
                start: convert24to12( timeStart ),
                end: convert24to12( timeEnd )
            };
            $scope.datePosted = timeSince( $scope.info.datetime_created );
            
            $scope.dateEnd = {
                day: dateEnd.getDate(),
                month: monthNames[dateEnd.getMonth()],
                year: dateEnd.getFullYear()
            };
            var day = new Date( parseInt( $scope.info.datetime_created ) );
            day = day.getDay( day );

            $scope.day = days[ day ];
            $scope.isCollapsed = false;

            
            function truncateText( text ){
                if( text.length > 190 ){
                    var cutOff = text.substring( 0 , 190 );
                    return cutOff + "...";
                }
            }
            $scope.collapse = function( $event, index ){
                $scope.isNavCollapsed = true;
                $scope.isCollapsed = !$scope.isCollapsed;
                if( $scope.isCollapsed ){
                    $scope.limitText = $scope.info.description.length;
                    angular.element( $event.currentTarget ).removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
                    
                }else{// use the lesser text and normal <p> height
                    $scope.limitText = 190;
                    angular.element( $event.currentTarget ).removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
                }
            };

            $scope.commentClick = function( ){
                mallData.setMallCard( $scope.info )
                console.log( $scope.info )
                $rootScope.$broadcast( 'open-modal', $scope.info );

                $uibModal.open({
                      ariaLabelledBy: 'modal-title',
                      ariaDescribedBy: 'modal-body',
                      templateUrl: '../templates/modals/comment-modal.html',
                      controller: 'modalComments'
                      
                    })
            }

            convert24to12( "20:20:00" )
            function convert24to12(timeStr){
                    var myDate = new Date("4 Feb 2011, 19:00:00");
                    var minutes = timeStr.substring(timeStr.indexOf(':'), timeStr.indexOf(' '));
                    var timeStr = timeStr.substring(0, timeStr.indexOf(':'));
                    var am = true;
                    if (timeStr > 12) {
                       am = false;
                       timeStr -= 12;
                    } else if (timeStr == 12) {
                       am = false;
                    } else if (timeStr == 0) {
                       timeStr = 12;
                    }   
                    return time = timeStr + ":" + minutes + (am ? " am" : " pm");
            }

            function timeSince(date) {

                var seconds = Math.floor((new Date() - date) / 1000);

                var interval = Math.floor(seconds / 31536000);

                if (interval > 1) {
                    return interval + " years";
                }
                interval = Math.floor(seconds / 2592000);
                if (interval > 1) {
                    return interval + " months";
                }
                interval = Math.floor(seconds / 86400);
                if (interval > 1) {
                    return interval + " days";
                }
                interval = Math.floor(seconds / 3600);
                if (interval > 1) {
                    return interval + " hours";
                }
                interval = Math.floor(seconds / 60);
                if (interval > 1) {
                    return interval + " minutes";
                }
                return Math.floor(seconds) + " seconds";
            }

    } )