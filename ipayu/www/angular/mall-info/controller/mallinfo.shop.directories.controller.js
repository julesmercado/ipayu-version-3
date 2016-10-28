
    mallInfo.controller( 'mallInfoShopDirectories', 
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

            $scope.toShopInfo = function( shop ){
                mallData.setShopInfo( shop );
                $state.go( 'shopInMallInfo', {shopId: shop.asset_id} )
            };

            $scope.$watch( 'searchCountry.country', function( newValue , oldValue ){
                country = newValue;
                resetMallsArray()
                startDirectories()
            } )

            function startDirectories(){
                getShopsInMalls( mallInfo )
            }
            function groupByAlphabet( array ){
                for( var i in array ){
                    var firstLetter = array[i].name.charAt(0).toLowerCase();
                    
                    switch( firstLetter ){
                        case 'a':
                        if( array[i].country == country ){
                            $scope.shops[ firstLetter ].push( array[i] );}
                            break;
                        case 'b':
                        if( array[i].country == country ){
                            $scope.shops[ firstLetter ].push( array[i] );}
                            break;
                        case 'c':
                        if( array[i].country == country ){
                            $scope.shops[ firstLetter ].push( array[i] );}
                            break;
                        case 'd':
                        if( array[i].country == country ){
                            $scope.shops[ firstLetter ].push( array[i] );}
                            break;
                        case 'e':
                        if( array[i].country == country ){
                            $scope.shops[ firstLetter ].push( array[i] );}
                            break;
                        case 'f':
                        if( array[i].country == country ){
                            $scope.shops[ firstLetter ].push( array[i] );}
                            break;
                        case 'g':
                        if( array[i].country == country ){
                            $scope.shops[ firstLetter ].push( array[i] );}
                            break;
                        case 'h':
                        if( array[i].country == country ){
                            $scope.shops[ firstLetter ].push( array[i] );}
                            break;
                        case 'i':
                        if( array[i].country == country ){
                            $scope.shops[ firstLetter ].push( array[i] );}
                            break;
                        case 'j':
                        if( array[i].country == country ){
                            $scope.shops[ firstLetter ].push( array[i] );}
                            break;
                        case 'k':
                        if( array[i].country == country ){
                            $scope.shops[ firstLetter ].push( array[i] );}
                            break;
                        case 'l':
                        if( array[i].country == country ){
                            $scope.shops[ firstLetter ].push( array[i] );}
                            break;
                        case 'm':
                        if( array[i].country == country ){
                            $scope.shops[ firstLetter ].push( array[i] );}
                            break;
                        case 'n':
                        if( array[i].country == country ){
                            $scope.shops[ firstLetter ].push( array[i] );}
                            break;
                        case 'o':
                        if( array[i].country == country ){
                            $scope.shops[ firstLetter ].push( array[i] );}
                            break;
                        case 'p':
                        if( array[i].country == country ){
                            $scope.shops[ firstLetter ].push( array[i] );}
                            break;
                        case 'q':
                        if( array[i].country == country ){
                            $scope.shops[ firstLetter ].push( array[i] );}
                            break;
                        case 'r':
                        if( array[i].country == country ){
                            $scope.shops[ firstLetter ].push( array[i] );}
                            break;
                        case 's':
                        if( array[i].country == country ){
                            console.log( firstLetter );
                            $scope.shops[ firstLetter ].push( array[i] );}
                            break;
                        case 't':
                        if( array[i].country == country ){
                            $scope.shops[ firstLetter ].push( array[i] );}
                            break;
                        case 'u':
                        if( array[i].country == country ){
                            $scope.shops[ firstLetter ].push( array[i] );}
                            break;
                        case 'v':
                        if( array[i].country == country ){
                            $scope.shops[ firstLetter ].push( array[i] );}
                            break;
                        case 'w':
                        if( array[i].country == country ){
                            $scope.shops[ firstLetter ].push( array[i] );}
                            break;
                        case 'x':
                        if( array[i].country == country ){
                            $scope.shops[ firstLetter ].push( array[i] );}
                            break;
                        case 'y':
                        if( array[i].country == country ){
                            $scope.shops[ firstLetter ].push( array[i] );}
                            break;
                        case 'z':
                        if( array[i].country == country ){
                            $scope.shops[ firstLetter ].push( array[i] );}
                            break;
                        default:
                            $scope.shops["#"].push( array['num'] );
                    }
                }
            }

            function resetMallsArray(){
                
                $scope.shops = {
                    a:[],b:[],c:[],d:[],e:[],f:[],g:[],h:[],i:[],j:[],k:[],l:[],m:[],n:[],o:[],p:[],q:[],r:[],s:[],t:[],u:[],v:[],w:[],x:[],y:[],z:[],"num":[]
                };
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

            function getShopsInMalls( mallInfo ){
                mallCardFactory2.getShopsInMall( mallInfo.asset_id ).then( function( response ){
                    var shops = response.all.data;
                    console.log( shops )
                    alphabeticalOrder( shops );
                    groupByAlphabet( shops );
                    console.log( $scope.shops )
                } )
            }
    } )