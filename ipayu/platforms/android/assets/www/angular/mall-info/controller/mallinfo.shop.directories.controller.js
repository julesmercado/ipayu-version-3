
    mallInfo.controller( 'mallInfoShopDirectories', 
        function( $scope , $rootScope , mallCardFactory2 , $stateParams , flags , mallData , $state , customService ){ /*, offlineData*/
            var country = $rootScope.searchCountry.country;
            var mallInfo = mallData.setMallInfo();
            $scope.searchData = '';
            $scope.searchResult = 0;
            $scope.selectedCat = '';
            //resetMallsArray()
            
            

            startDirectories()
            getCategoriesInShops()
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
            $scope.selected = function( data ){
                $scope.selectedCat = data;
            }
            $scope.$watch( 'selectedCat', function( newVal, oldValue ){
                getShopsInMalls( mallInfo )
            } )
            $scope.toShopInfo = function( shop ){
                mallData.setShopInfo( shop );
                $state.go( 'shopInMallInfo', {shopId: shop.asset_info_id} )
            };

            $scope.$watch( 'searchCountry.country', function( newValue , oldValue ){
                country = newValue;
                //resetMallsArray()
                startDirectories()
            } )

            function startDirectories(){
                getShopsInMalls( mallInfo )
            }
               
            function compare(a,b) {
              if (a.name < b.name)
                return -1;
              if (a.name > b.name)
                return 1;
              return 0;
            }

            function getShopsInMalls( mallInfo ){
                mallCardFactory2.getShopsInMall( mallInfo.asset_info_id ).then( function( response ){
                    var shops = response.all.data;
                    shops = customService.filterByCategory(shops, $scope.selectedCat);
                    shops = customService.filterByCountry(shops, $rootScope.countryDisplay.country);
                    $scope.all_shops = contruct_data( shops );
                    $scope.filterCards = function(){
                        $scope.all_shops = contruct_data(shops);
                    }
                } )
            }
            function getCategoriesInShops(){
                mallCardFactory2.getCategoriesInShops().then( function( response ){
                    $scope.categories = response.all.data;
                } )
            }

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