

    mallInfo.controller('mallinfolanding', mall_info_controller)

    	function mall_info_controller( $scope , $timeout , $state , mallCardFactory2  ){
        

                mallCardFactory2.fetchAllMallsFeaturedAndNew().then( function( response ){


                    var mallsFeaturedAndNew = response.all.data;
                    $scope.indexFeatured = 0; $scope.indexNewMalls = 0; $scope.featured = eightPerView( mallsFeaturedAndNew.featured_malls );
                    $scope.newMalls = eightPerView( mallsFeaturedAndNew.new_post );
                    console.log( response )
                } );

                $scope.swipeLeft = swipeLeft;$scope.swipeRight = swipeRight;


                $scope.toMallEvents = function( id ){
                    $state.go( 'mallEvents', {mallId: id} )
                };

                function swipeLeft( array , constrain ){

                    console.log( array )
                    if( $scope.indexFeatured <= array.length-1 ){
                        

                        switch( constrain ){

                            case 'featured': $scope.indexFeatured = $scope.indexFeatured + 1;
                                break;
                            case 'malls': $scope.indexNewMalls = $scope.indexNewMalls + 1;
                                break;
                            default:
                        }
                        if( $scope.indexFeatured === array.length || $scope.indexNewMalls === array.length ){
                            

                            $timeout(function() {
                                switch( constrain ){

                                    case 'featured': $scope.indexFeatured = $scope.indexFeatured - 1;
                                        break;
                                    case 'malls': $scope.indexNewMalls = $scope.indexNewMalls - 1;
                                        break;

                                    default:
                                }
                            }, 300);
                            
                        }
                    }
                }
                function swipeRight( array , constrain ){
                    
                    console.log( "right" )
                    if( $scope.indexFeatured >= 0 ){
                    
                        switch( constrain ){
                            case 'featured': $scope.indexFeatured = $scope.indexFeatured - 1;
                                break;
                            case 'malls': $scope.indexNewMalls = $scope.indexNewMalls - 1;
                                break;
                            default:
                        }
                         if( $scope.indexFeatured === -1 || $scope.indexNewMalls === -1 ){
                    

                            console.log( "sulod" , $scope.indexFeatured )
                            $timeout(function() {
                                switch( constrain ){
                                    case 'featured':$scope.indexFeatured = $scope.indexFeatured + 1;
                                        break;
                                    case 'malls': $scope.indexNewMalls = $scope.indexNewMalls + 1;
                                        break;
                                    default:
                                }
                            }, 300);
                            
                        }
                    }
                }
                function eightPerView( array ){
                    var batchedArray = [];
                    var fourPairArray = [];
                    var fourTempArray = [];
                    for(var i in array){
                        fourTempArray.push( array[i] )
                        if( fourTempArray.length === 4 ){

                            fourPairArray.push( fourTempArray )
                            fourTempArray = [];
                            if( fourPairArray.length === 2 ){
                                batchedArray.push( fourPairArray )
                                fourTempArray = [];
                                fourPairArray = [];
                            }
                            
                            
                        }
                        if( i == array.length-1 ){
                            fourPairArray.push( fourTempArray )
                            batchedArray.push( fourPairArray )
                            fourTempArray = [];
                            fourPairArray = [];
                        }
                    }
                   return batchedArray;
                }
        
    	}
