
    mallInfo.controller( 'mallInfoDirectories', 
        function( $scope , $rootScope , mallCardFactory2 , $stateParams , flags , mallData , $state , customService ){ /*, offlineData*/
            var country = $rootScope.searchCountry.country;
            var mallInfo = mallData.setMallInfo();
            //resetMallsArray()
            
            

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
                $state.go( 'mallEvents', {mallId: mall.asset_info_id} )
            };

            $scope.$watch( 'searchCountry.country', function( newValue , oldValue ){
                country = newValue;
                //resetMallsArray()
                startDirectories()
            } )

            function startDirectories(){
                fetchAllMalls()
            }
            
            
            function fetchAllMalls(){

                mallCardFactory2.fetchAllMallsFeaturedAndNew( ).then( function( response ){
                    
                    var malls = response.all.data.all_malls;
                    $scope.all_malls = contruct_data( malls );
                    // alphabeticalOrder( malls );
                    // groupByAlphabet( malls );
                    $scope.filterCards = function(){
                        $scope.all_malls = contruct_data(malls);
                    }
                    
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

            //unified code functions

            $scope.searchData = '';
            $scope.searchResult = 0;

            function contruct_data(data){
                $scope.searchResult = 0;
                var firstLetter = '';
                var group = customService.groupByFirstLetter(data, $rootScope.searchCountry.country, $scope.searchData , true);
                var tempFirstLetter = '';

                for (var i = 0; i < group.length; i++) {
                    for (var x = 0; x < data.length; x++) {
                        var pos = data[x].name.toLowerCase().indexOf($scope.searchData.toLowerCase());
                        var checkFirstLetter = data[x].name.substr(0, 1).toUpperCase().match('[A-Z]');
                        if(!checkFirstLetter){
                            tempFirstLetter = 'num';
                        }
                        else{
                            tempFirstLetter = data[x].name.substr(0, 1).toUpperCase();
                        }
                        if(group[i][0] == tempFirstLetter && data[x].country == $rootScope.searchCountry.country && pos == 0) {
                            $scope.searchResult++;
                            var rows = group[i][1].length;
                            group[i][1].push(data[x]);
                            // var columnsInRow = group[i][1][rows-1].length;
                            // if(columnsInRow == 2) {
                            //     group[i][1][rows] = [];
                            //     group[i][1][rows].push(data[x]);
                            // }
                            // else {
                            //     group[i][1][rows-1].push(data[x]);
                            // }
                        }
                    }
                }
                return group;
            }
            
    } )