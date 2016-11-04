mallInfo.directive('collapseDirective', [
	'$rootScope',
	function collapseDirective( $rootScope ){

		return{
			"restrict": "E",
			"scope": {
				"eventMall": "="
			},
			"link": function onLink ( scope , element , atrributeSet ) {
				

			}
		}


}] );