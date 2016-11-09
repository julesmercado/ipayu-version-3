
    mallInfo.controller( 'mallInfoEvents', 
        function( $scope, $state, $stateParams , mallCardFactory2 , $rootScope , mallData ){ /*, offlineData*/

            $scope.mallInfo = mallData.setMallInfo();
            mallCardFactory2.fetchMallEvents( parseInt( $stateParams.mallId ) ).then( function( response ){
                $scope.limitText = [];
                $scope.events = response.all.data;
                console.log($scope.events)
                for( var i in $scope.events ){
                    $scope.limitText[i] = 190;
                }
                
            } )
            
            
            $scope.toMallEventsFull = function toMallEventsFull( mallEvent ){
                mallData.setMallEvent( mallEvent );
                $state.go( 'mallEventFull' );
            }

            $scope.comment = function(){

            };
            $scope.react = function(){
                var thisDate = new Date();
                mallCardFactory2.postReact( 1, 141 , 1 , thisDate  ).then( function( response ){
                    console.log( response )
                } );
            };

            

    } )