
    mallInfo.controller( 'mallInfoEvents', 
        function( $scope, $state, $stateParams , mallCardFactory2 , $rootScope ){ /*, offlineData*/


            mallCardFactory2.fetchMallEvents( $stateParams.mallId ).then( function( response ){
                console.log( response )
                //console.log( offlineData.getUser() );
            } )
            $rootScope.$on( 'open-modal' , function(){
                console.log( "opened modal" )
                mallCardFactory2.getComments( 1 ).then( function( response ){
                    console.log( response );
                } );
            } );

            $scope.comment = function(){

            };
            $scope.react = function(){
                var thisDate = new Date();
                mallCardFactory2.postReact( 1, 141 , 1 , thisDate  ).then( function( response ){
                    console.log( response );
                } );
            };

    } )