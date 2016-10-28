
    mallInfo.controller( 'mallInfoDirectories', 
        function( $scope , $rootScope , mallCardFactory2 , $stateParams , flags ){ /*, offlineData*/
            var country = $rootScope.searchCountry.country;

            $scope.malls = {
                a:[],b:[],c:[],d:[],e:[],f:[],g:[],h:[],i:[],j:[],k:[],l:[],m:[],n:[],o:[],p:[],q:[],r:[],s:[],t:[],u:[],v:[],w:[],x:[],y:[],z:[],"num":[]
            };

            fetchAllMalls()

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

            $scope.$watch( 'searchCountry.country', function( newValue , oldValue ){
                // /console.log( newValue )
            } )
            function groupByAlphabet( array ){
                for( var i in array ){
                    var firstLetter = array[i].name.charAt(0).toLowerCase();
                    console.log( firstLetter )
                    switch( firstLetter ){
                        case 'a':
                        if( array[i].country == country )
                            $scope.malls[ firstLetter ].push( array[i] );
                            break;
                        case 'b':
                        if( array[i].country == country )
                            $scope.malls[ firstLetter ].push( array[i] );
                            break;
                        case 'c':
                        if( array[i].country == country )
                            $scope.malls[ firstLetter ].push( array[i] );
                            break;
                        case 'd':
                        if( array[i].country == country )
                            $scope.malls[ firstLetter ].push( array[i] );
                            break;
                        case 'e':
                        if( array[i].country == country )
                            $scope.malls[ firstLetter ].push( array[i] );
                            break;
                        case 'f':
                        if( array[i].country == country )
                            $scope.malls[ firstLetter ].push( array[i] );
                            break;
                        case 'g':
                        if( array[i].country == country )
                            $scope.malls[ firstLetter ].push( array[i] );
                            break;
                        case 'h':
                        if( array[i].country == country )
                            $scope.malls[ firstLetter ].push( array[i] );
                            break;
                        case 'i':
                        if( array[i].country == country )
                            $scope.malls[ firstLetter ].push( array[i] );
                            break;
                        case 'j':
                        if( array[i].country == country )
                            $scope.malls[ firstLetter ].push( array[i] );
                            break;
                        case 'k':
                        if( array[i].country == country )
                            $scope.malls[ firstLetter ].push( array[i] );
                            break;
                        case 'l':
                        if( array[i].country == country )
                            $scope.malls[ firstLetter ].push( array[i] );
                            break;
                        case 'm':
                        if( array[i].country == country )
                            $scope.malls[ firstLetter ].push( array[i] );
                            break;
                        case 'n':
                        if( array[i].country == country )
                            $scope.malls[ firstLetter ].push( array[i] );
                            break;
                        case 'o':
                        if( array[i].country == country )
                            $scope.malls[ firstLetter ].push( array[i] );
                            break;
                        case 'p':
                        if( array[i].country == country )
                            $scope.malls[ firstLetter ].push( array[i] );
                            break;
                        case 'q':
                        if( array[i].country == country )
                            $scope.malls[ firstLetter ].push( array[i] );
                            break;
                        case 'r':
                        if( array[i].country == country )
                            $scope.malls[ firstLetter ].push( array[i] );
                            break;
                        case 's':
                        if( array[i].country == country )
                            $scope.malls[ firstLetter ].push( array[i] );
                            break;
                        case 't':
                        if( array[i].country == country )
                            $scope.malls[ firstLetter ].push( array[i] );
                            break;
                        case 'u':
                        if( array[i].country == country )
                            $scope.malls[ firstLetter ].push( array[i] );
                            break;
                        case 'v':
                        if( array[i].country == country )
                            $scope.malls[ firstLetter ].push( array[i] );
                            break;
                        case 'w':
                        if( array[i].country == country )
                            $scope.malls[ firstLetter ].push( array[i] );
                            break;
                        case 'x':
                        if( array[i].country == country )
                            $scope.malls[ firstLetter ].push( array[i] );
                            break;
                        case 'y':
                        if( array[i].country == country )
                            $scope.malls[ firstLetter ].push( array[i] );
                            break;
                        case 'z':
                        if( array[i].country == country )
                            $scope.malls[ firstLetter ].push( array[i] );
                            break;
                        default:
                            $scope.malls["#"].push( array['num'] );
                    }
                }
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
                console.log( array )
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