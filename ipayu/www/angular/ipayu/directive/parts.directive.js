

mainModule.directive('loading', LoadingDrctv)


LoadingDrctv.$inject = [];

function LoadingDrctv () {
	return {
		'templateUrl'	: 'templates/loading.html'
	}
}