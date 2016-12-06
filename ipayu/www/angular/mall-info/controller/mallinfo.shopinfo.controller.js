
mallInfo.controller( 'shopInfo', 
function( $scope , mallData , $state ){

    $scope.shopInfo = mallData.setShopInfo();

    $scope.download_file = function(file){
        console.log('download')
        window.open(file, '_system');
    }
    
    $scope.showShopDirectories = function(){
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                if(!result.cancelled){
                    // show gif here
                }
            },
            function (error) {
                 alert("Scanning failed: " + error);
            },
            {
                "preferFrontCamera" : false, // iOS and Android
                "showFlipCameraButton" : true, // iOS and Android
                "prompt" : "Place a qrcode inside the scan area", // supported on Android only
                "formats" : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
                "orientation" : "portrait" // Android only (portrait|landscape), default unset so it rotates with the device
            }
        );
    }

} )