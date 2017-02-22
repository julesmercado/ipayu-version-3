

mainModule.factory('preloaderMethod', PreloaderMethod) 


PreloaderMethod.$inject = ['preloader', '$rootScope', '$timeout'];

function PreloaderMethod (preloader, $rootScope, $timeout) {

	return {

		preloadImage: function (allObjects, continueLoading) {
			var allImages = [];
			for (var i = 0; i < allObjects.length; i++) {
				for (var x = 0; x < allObjects[i].length; x++) {
					var tempImage = (allObjects[i][x].card_image)?allObjects[i][x].card_image:allObjects[i][x].image;
					if(tempImage){
						allImages.push(tempImage);
					}
				}
			}
			if(allImages.length == 0){
				if(!continueLoading){$rootScope.doLoading = false;} return;
			}
			else{
				preloader.preloadImages( allImages ).then(
					function handleResolve( allImages ) {
						// Loading was successful.
						console.info( "Preload Successful" );
						if(!continueLoading){
							$timeout(function() {$rootScope.doLoading = false;}, 1000);
						}
					},
					function handleReject( imageLocation ) {
						// Loading failed on at least one image.
						console.error( "Image Failed", imageLocation );
						console.info( "Preload Failure" );
						if(!continueLoading){
							$timeout(function() {$rootScope.doLoading = false;}, 1000);
						}
					},
					function handleNotify( event ) {
						console.info( "Percent loaded:", event.percent );
					}
				);
			}
		}

	}

}