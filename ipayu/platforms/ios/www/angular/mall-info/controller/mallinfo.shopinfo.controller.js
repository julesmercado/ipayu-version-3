
mallInfo.controller( 'shopInfo', 
function( $scope , mallData , $state, ngDialog ){

    $scope.shopInfo = mallData.setShopInfo();

    $scope.download_file = function(file){
        console.log('download')
        window.open(file, '_system');
    }
    
    $scope.showShopDirectories = function(){
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                if(!result.cancelled){
                    var spl = result.text.split('.'),
                        mime_type = spl[spl.length - 1];
                    if(mime_type == 'gif') {
                        showRoute(result.text);
                    }
                    else {
                        alert('Cannot resolve url');
                    }
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

    function showRoute(url) {
        ngDialog.open({
            template: 'shopRoute',
            className: 'ngdialog-theme-plain add-card-custom',
            controller: ['$scope', function($scope) {
                $scope.shop_route_url = url;
            }],
            overlay: true,
            showClose: false
        });
    }

} )