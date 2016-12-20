

mainModule.directive('loading', Loading)
mainModule.directive('showOfflineMessage', ShowOfflineMessage)


Loading.$inject = [];
function Loading () {
	return {
		'templateUrl'	: 'templates/loading.html'
	}
}

ShowOfflineMessage.$inject = [];
function ShowOfflineMessage(){
    return {
        restrict: 'A',
        template: 'Seems that you don\'t have internet connection at the moment.'
    }
}