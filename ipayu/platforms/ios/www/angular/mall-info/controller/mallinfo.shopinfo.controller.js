
    mallInfo.controller( 'shopInfo', 
        function( $scope , mallData , $state ){ /*, offlineData*/
            
            $scope.shopInfo = mallData.setShopInfo();
            
    } )