mallInfo.directive('commentModal', [
	'$uibModal',
	'$rootScope',
	'mallData',
	function commentModalDirective( $uibModal , $rootScope , mallData ){

		return{
			"restrict": "A",
			"scope": true,
			"link": function onLink ( scope , element , atrributeSet ) {
				
			}
		}

}] );

