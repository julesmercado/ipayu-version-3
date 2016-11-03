
    mallInfo.controller( 'mallInfoDirectories', 
        function( $scope , $rootScope , mallCardFactory2 , $stateParams , flags , mallData , $state ){ /*, offlineData*/
            var country = $rootScope.searchCountry.country;
            var mallInfo = mallData.setMallInfo();
            resetMallsArray()
            
            

            startDirectories()

            $scope.scrollUp = function (id) {
                var innerElement = $("#"+id);

                if(innerElement.length) {
                    var f = $("#"+id).offset().top,
                        s = $("#allcardssearch").scrollTop(),
                        d = $("#allcardssearch").position().top;

                    var pos = f + s - d;

                    $("#allcardssearch").animate({
                        scrollTop : pos
                    }, { duration: 'medium', easing: 'swing' });
                }

            };

            $scope.toMallEvents = function( mall ){
                mallData.setMallInfo( mall );
                $state.go( 'mallEvents', {mallId: mall.asset_id} )
            };

            $scope.searchByName = function searchByName( searchItem ){
                var firstLetter = searchItem.charAt(0).toLowerCase();
                dropElementsByFirstLetter( firstLetter );
                // for( var i in $scope.malls[ firstLetter ] ){
                //     if( $scope.malls[firstLetter].length > 0 ){
                //         if( $scope.malls[firstLetter][i].name != searchItem ){
                //             $scope.malls[firstLetter].splice( i , 1 )
                //         }
                //     }
                // }
            };

            $scope.$watch( 'searchCountry.country', function( newValue , oldValue ){
                country = newValue;
                resetMallsArray()
                startDirectories()
            } )

            function startDirectories(){
                fetchAllMalls()
            }
            
            function dropElementsByFirstLetter( firstLetter ){
                for( var i in $scope.malls ){
                    if( i != firstLetter ){
                        // $scope.malls.splice( i , 1 )
                        console.log( i , firstLetter )
                    }
                }
                // console.log( $scope.malls )
            }
            function groupByAlphabet( array ){
                for( var i in array ){
                    var firstLetter = array[i].name.charAt(0).toLowerCase();
                    
                    switch( firstLetter ){
                        case 'a':
                        if( array[i].country == country ){
                            if( $scope.malls[ firstLetter ].length != 0 ){
                                var count = 0;
                                $scope.malls[ firstLetter ].forEach(function(value){
                                  if (value.asset_info_id==array[i].asset_info_id){
                                    count++;
                                    console.log( count )
                                  } 
                                  
                                })
                                if( count == 0 ){$scope.malls[ firstLetter ].push( array[i] )};
                            }else
                            $scope.malls[ firstLetter ].push( array[i] );}
                            break;
                        case 'b':
                        if( array[i].country == country ){
                            if( $scope.malls[ firstLetter ].length != 0 ){
                                var count = 0;
                                $scope.malls[ firstLetter ].forEach(function(value){
                                  if (value.asset_info_id==array[i].asset_info_id){
                                    count++;
                                    console.log( count )
                                  } 
                                  
                                })
                                if( count == 0 ){$scope.malls[ firstLetter ].push( array[i] )};
                            }else
                            $scope.malls[ firstLetter ].push( array[i] );}
                            break;
                        case 'c':
                        if( array[i].country == country ){
                            if( $scope.malls[ firstLetter ].length != 0 ){
                                var count = 0;
                                $scope.malls[ firstLetter ].forEach(function(value){
                                  if (value.asset_info_id==array[i].asset_info_id){
                                    count++;
                                    console.log( count )
                                  } 
                                  
                                })
                                if( count == 0 ){$scope.malls[ firstLetter ].push( array[i] )};
                            }else
                            $scope.malls[ firstLetter ].push( array[i] );}
                            break;
                        case 'd':
                        if( array[i].country == country ){
                            if( $scope.malls[ firstLetter ].length != 0 ){
                                var count = 0;
                                $scope.malls[ firstLetter ].forEach(function(value){
                                  if (value.asset_info_id==array[i].asset_info_id){
                                    count++;
                                    console.log( count )
                                  } 
                                  
                                })
                                if( count == 0 ){$scope.malls[ firstLetter ].push( array[i] )};
                            }else
                            $scope.malls[ firstLetter ].push( array[i] );}
                            break;
                        case 'e':
                        if( array[i].country == country ){
                            if( $scope.malls[ firstLetter ].length != 0 ){
                                var count = 0;
                                $scope.malls[ firstLetter ].forEach(function(value){
                                  if (value.asset_info_id==array[i].asset_info_id){
                                    count++;
                                    console.log( count )
                                  } 
                                  
                                })
                                if( count == 0 ){$scope.malls[ firstLetter ].push( array[i] )};
                            }else
                            $scope.malls[ firstLetter ].push( array[i] );}
                            break;
                        case 'f':
                        if( array[i].country == country ){
                            if( $scope.malls[ firstLetter ].length != 0 ){
                                var count = 0;
                                $scope.malls[ firstLetter ].forEach(function(value){
                                  if (value.asset_info_id==array[i].asset_info_id){
                                    count++;
                                    console.log( count )
                                  } 
                                  
                                })
                                if( count == 0 ){$scope.malls[ firstLetter ].push( array[i] )};
                            }else
                            $scope.malls[ firstLetter ].push( array[i] );}
                            break;
                        case 'g':
                        if( array[i].country == country ){
                            if( $scope.malls[ firstLetter ].length != 0 ){
                                var count = 0;
                                $scope.malls[ firstLetter ].forEach(function(value){
                                  if (value.asset_info_id==array[i].asset_info_id){
                                    count++;
                                    console.log( count )
                                  } 
                                  
                                })
                                if( count == 0 ){$scope.malls[ firstLetter ].push( array[i] )};
                            }else
                            $scope.malls[ firstLetter ].push( array[i] );}
                            break;
                        case 'h':
                        if( array[i].country == country ){
                            if( $scope.malls[ firstLetter ].length != 0 ){
                                var count = 0;
                                $scope.malls[ firstLetter ].forEach(function(value){
                                  if (value.asset_info_id==array[i].asset_info_id){
                                    count++;
                                    console.log( count )
                                  } 
                                  
                                })
                                if( count == 0 ){$scope.malls[ firstLetter ].push( array[i] )};
                            }else
                            $scope.malls[ firstLetter ].push( array[i] );}
                            break;
                        case 'i':
                        if( array[i].country == country ){
                            if( $scope.malls[ firstLetter ].length != 0 ){
                                var count = 0;
                                $scope.malls[ firstLetter ].forEach(function(value){
                                  if (value.asset_info_id==array[i].asset_info_id){
                                    count++;
                                    console.log( count )
                                  } 
                                  
                                })
                                if( count == 0 ){$scope.malls[ firstLetter ].push( array[i] )};
                            }else
                            $scope.malls[ firstLetter ].push( array[i] );}
                            break;
                        case 'j':
                        if( array[i].country == country ){
                            if( $scope.malls[ firstLetter ].length != 0 ){
                                var count = 0;
                                $scope.malls[ firstLetter ].forEach(function(value){
                                  if (value.asset_info_id==array[i].asset_info_id){
                                    count++;
                                    console.log( count )
                                  } 
                                  
                                })
                                if( count == 0 ){$scope.malls[ firstLetter ].push( array[i] )};
                            }else
                            $scope.malls[ firstLetter ].push( array[i] );}
                            break;
                        case 'k':
                        if( array[i].country == country ){
                            if( $scope.malls[ firstLetter ].length != 0 ){
                                var count = 0;
                                $scope.malls[ firstLetter ].forEach(function(value){
                                  if (value.asset_info_id==array[i].asset_info_id){
                                    count++;
                                    console.log( count )
                                  } 
                                  
                                })
                                if( count == 0 ){$scope.malls[ firstLetter ].push( array[i] )};
                            }else
                            $scope.malls[ firstLetter ].push( array[i] );}
                            break;
                        case 'l':
                        if( array[i].country == country ){
                            if( $scope.malls[ firstLetter ].length != 0 ){
                                var count = 0;
                                $scope.malls[ firstLetter ].forEach(function(value){
                                  if (value.asset_info_id==array[i].asset_info_id){
                                    count++;
                                    console.log( count )
                                  } 
                                  
                                })
                                if( count == 0 ){$scope.malls[ firstLetter ].push( array[i] )};
                            }else
                            $scope.malls[ firstLetter ].push( array[i] );}
                            break;
                        case 'm':
                        if( array[i].country == country ){
                            if( $scope.malls[ firstLetter ].length != 0 ){
                                var count = 0;
                                $scope.malls[ firstLetter ].forEach(function(value){
                                  if (value.asset_info_id==array[i].asset_info_id){
                                    count++;
                                    console.log( count )
                                  } 
                                  
                                })
                                if( count == 0 ){$scope.malls[ firstLetter ].push( array[i] )};
                            }else
                            $scope.malls[ firstLetter ].push( array[i] );}
                            break;
                        case 'n':
                        if( array[i].country == country ){
                            if( $scope.malls[ firstLetter ].length != 0 ){
                                var count = 0;
                                $scope.malls[ firstLetter ].forEach(function(value){
                                  if (value.asset_info_id==array[i].asset_info_id){
                                    count++;
                                    console.log( count )
                                  } 
                                  
                                })
                                if( count == 0 ){$scope.malls[ firstLetter ].push( array[i] )};
                            }else
                            $scope.malls[ firstLetter ].push( array[i] );}
                            break;
                        case 'o':
                        if( array[i].country == country ){
                            if( $scope.malls[ firstLetter ].length != 0 ){
                                var count = 0;
                                $scope.malls[ firstLetter ].forEach(function(value){
                                  if (value.asset_info_id==array[i].asset_info_id){
                                    count++;
                                    console.log( count )
                                  } 
                                  
                                })
                                if( count == 0 ){$scope.malls[ firstLetter ].push( array[i] )};
                            }else
                            $scope.malls[ firstLetter ].push( array[i] );}
                            break;
                        case 'p':
                        if( array[i].country == country ){
                            if( $scope.malls[ firstLetter ].length != 0 ){
                                var count = 0;
                                $scope.malls[ firstLetter ].forEach(function(value){
                                  if (value.asset_info_id==array[i].asset_info_id){
                                    count++;
                                    console.log( count )
                                  } 
                                  
                                })
                                if( count == 0 ){$scope.malls[ firstLetter ].push( array[i] )};
                            }else
                            $scope.malls[ firstLetter ].push( array[i] );}
                            break;
                        case 'q':
                        if( array[i].country == country ){
                            if( $scope.malls[ firstLetter ].length != 0 ){
                                var count = 0;
                                $scope.malls[ firstLetter ].forEach(function(value){
                                  if (value.asset_info_id==array[i].asset_info_id){
                                    count++;
                                    console.log( count )
                                  } 
                                  
                                })
                                if( count == 0 ){$scope.malls[ firstLetter ].push( array[i] )};
                            }else
                            $scope.malls[ firstLetter ].push( array[i] );}
                            break;
                        case 'r':
                        if( array[i].country == country ){
                            if( $scope.malls[ firstLetter ].length != 0 ){
                                var count = 0;
                                $scope.malls[ firstLetter ].forEach(function(value){
                                  if (value.asset_info_id==array[i].asset_info_id){
                                    count++;
                                    console.log( count )
                                  } 
                                  
                                })
                                if( count == 0 ){$scope.malls[ firstLetter ].push( array[i] )};
                            }else
                            $scope.malls[ firstLetter ].push( array[i] );}
                            break;
                        case 's':
                        if( array[i].country == country ){
                            if( $scope.malls[ firstLetter ].length != 0 ){
                                var count = 0;
                                $scope.malls[ firstLetter ].forEach(function(value){
                                  if (value.asset_info_id==array[i].asset_info_id){
                                    count++;
                                    console.log( count )
                                  } 
                                  
                                })
                                if( count == 0 ){$scope.malls[ firstLetter ].push( array[i] )};
                            }else
                            $scope.malls[ firstLetter ].push( array[i] );}
                            break;
                        case 't':
                        if( array[i].country == country ){
                            if( $scope.malls[ firstLetter ].length != 0 ){
                                var count = 0;
                                $scope.malls[ firstLetter ].forEach(function(value){
                                  if (value.asset_info_id==array[i].asset_info_id){
                                    count++;
                                    console.log( count )
                                  } 
                                  
                                })
                                if( count == 0 ){$scope.malls[ firstLetter ].push( array[i] )};
                            }else
                            $scope.malls[ firstLetter ].push( array[i] );}
                            break;
                        case 'u':
                        if( array[i].country == country ){
                            if( $scope.malls[ firstLetter ].length != 0 ){
                                var count = 0;
                                $scope.malls[ firstLetter ].forEach(function(value){
                                  if (value.asset_info_id==array[i].asset_info_id){
                                    count++;
                                    console.log( count )
                                  } 
                                  
                                })
                                if( count == 0 ){$scope.malls[ firstLetter ].push( array[i] )};
                            }else
                            $scope.malls[ firstLetter ].push( array[i] );}
                            break;
                        case 'v':
                        if( array[i].country == country ){
                            if( $scope.malls[ firstLetter ].length != 0 ){
                                var count = 0;
                                $scope.malls[ firstLetter ].forEach(function(value){
                                  if (value.asset_info_id==array[i].asset_info_id){
                                    count++;
                                    console.log( count )
                                  } 
                                  
                                })
                                if( count == 0 ){$scope.malls[ firstLetter ].push( array[i] )};
                            }else
                            $scope.malls[ firstLetter ].push( array[i] );}
                            break;
                        case 'w':
                        if( array[i].country == country ){
                            if( $scope.malls[ firstLetter ].length != 0 ){
                                var count = 0;
                                $scope.malls[ firstLetter ].forEach(function(value){
                                  if (value.asset_info_id==array[i].asset_info_id){
                                    count++;
                                    console.log( count )
                                  } 
                                  
                                })
                                if( count == 0 ){$scope.malls[ firstLetter ].push( array[i] )};
                            }else
                            $scope.malls[ firstLetter ].push( array[i] );}
                            break;
                        case 'x':
                        if( array[i].country == country ){
                            if( $scope.malls[ firstLetter ].length != 0 ){
                                var count = 0;
                                $scope.malls[ firstLetter ].forEach(function(value){
                                  if (value.asset_info_id==array[i].asset_info_id){
                                    count++;
                                    console.log( count )
                                  } 
                                  
                                })
                                if( count == 0 ){$scope.malls[ firstLetter ].push( array[i] )};
                            }else
                            $scope.malls[ firstLetter ].push( array[i] );}
                            break;
                        case 'y':
                        if( array[i].country == country ){
                            if( $scope.malls[ firstLetter ].length != 0 ){
                                var count = 0;
                                $scope.malls[ firstLetter ].forEach(function(value){
                                  if (value.asset_info_id==array[i].asset_info_id){
                                    count++;
                                    console.log( count )
                                  } 
                                  
                                })
                                if( count == 0 ){$scope.malls[ firstLetter ].push( array[i] )};
                            }else
                            $scope.malls[ firstLetter ].push( array[i] );}
                            break;
                        case 'z':
                        if( array[i].country == country ){
                            if( $scope.malls[ firstLetter ].length != 0 ){
                                var count = 0;
                                $scope.malls[ firstLetter ].forEach(function(value){
                                  if (value.asset_info_id==array[i].asset_info_id){
                                    count++;
                                    console.log( count )
                                  } 
                                  
                                })
                                if( count == 0 ){$scope.malls[ firstLetter ].push( array[i] )};
                            }else
                            $scope.malls[ firstLetter ].push( array[i] );}
                            break;
                        default:
                            $scope.malls["#"].push( array['num'] );
                    }
                }
            }

            function resetMallsArray(){
                $scope.malls = {
                    a:[],b:[],c:[],d:[],e:[],f:[],g:[],h:[],i:[],j:[],k:[],l:[],m:[],n:[],o:[],p:[],q:[],r:[],s:[],t:[],u:[],v:[],w:[],x:[],y:[],z:[],"num":[]
                };
            }
            function fetchAllMalls(){

                mallCardFactory2.fetchAllMallsFeaturedAndNew( ).then( function( response ){
                    
                    var malls = response.all.data.all_malls;
                    alphabeticalOrder( malls );
                    groupByAlphabet( malls );
                    console.log( $scope.malls )
                    
                } )
            }
            function alphabeticalOrder( array ){
                array.sort( compare )  
                
                //return array;             
            }
            function compare(a,b) {
              if (a.name < b.name)
                return -1;
              if (a.name > b.name)
                return 1;
              return 0;
            }

            
    } )