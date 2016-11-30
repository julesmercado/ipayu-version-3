
    mallInfo.controller( 'shopInfo', 
        function( $scope , mallData , $state ){ /*, offlineData*/
            
            $scope.shopInfo = mallData.setShopInfo();
        
            $scope.download_file = function(file){
                console.log('download')
                window.open(file, '_system');
                
            }
            
    } )