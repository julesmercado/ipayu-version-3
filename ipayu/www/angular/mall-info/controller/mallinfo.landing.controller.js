

    mallInfo.controller('mallinfolanding', mall_info_controller)

    	function mall_info_controller( $scope , $timeout , $state , mallCardFactory2 , mallData , customService , $rootScope  ){
        

                startInfoLanding();

                $scope.$watch( 'searchCountry.country', function( newValue , oldValue ){
                    
                    //resetMallsArray()
                    startInfoLanding()
                } )

                $scope.swipeLeft = swipeLeft;$scope.swipeRight = swipeRight;


                $scope.toMallEvents = function( mall ){
                    mallData.setMallInfo( mall );
                    $state.go( 'mallEvents', {mallId: mall.asset_id} )
                };

                function startInfoLanding(){
                    mallCardFactory2.fetchAllMallsFeaturedAndNew().then( function( response ){


                        var mallsFeaturedAndNew = response.all.data;
                        var featured = customService.filterByCountry( mallsFeaturedAndNew.featured_malls , $rootScope.countryDisplay.country );
                        var newMalls = customService.filterByCountry( mallsFeaturedAndNew.new_post , $rootScope.countryDisplay.country );

                        console.log( featured )
                        console.log( newMalls )
                        $scope.indexFeatured = 0; $scope.indexNewMalls = 0; 

                        $scope.featured = eightPerView( featured );
                        $scope.newMalls = eightPerView( newMalls );
                        
                    } );
                }
                function swipeLeft( array , constrain ){

                    
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
                    
                    
                    if( $scope.indexFeatured >= 0 ){
                    
                        switch( constrain ){
                            case 'featured': $scope.indexFeatured = $scope.indexFeatured - 1;
                                break;
                            case 'malls': $scope.indexNewMalls = $scope.indexNewMalls - 1;
                                break;
                            default:
                        }
                         if( $scope.indexFeatured === -1 || $scope.indexNewMalls === -1 ){
                    

                            
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
