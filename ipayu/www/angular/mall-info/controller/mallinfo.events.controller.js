
    mallInfo.controller( 'mallInfoEvents', 
        function( $scope, $state, $stateParams , mallCardFactory2 , $rootScope ){ /*, offlineData*/


            mallCardFactory2.fetchMallEvents( $stateParams.mallId ).then( function( response ){
                $scope.limitText = [];
                $scope.events = response.all.data;
                for( var i in $scope.events ){
                    $scope.limitText[i] = 190;
                }
                
            } )
            
            


            $scope.comment = function(){

            };
            $scope.react = function(){
                var thisDate = new Date();
                mallCardFactory2.postReact( 1, 141 , 1 , thisDate  ).then( function( response ){
                    
                } );
            };

            

    } )