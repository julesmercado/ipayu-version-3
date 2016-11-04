mallInfo.directive('mallEvents', MallEvents );

MallEvents.$inject = [ '$rootScope' ];

function MallEvents( $rootScope ){

		return{
			"restrict": "A",
			"scope": true,
			"link": function onLink ( scope , element , atrributeSet ) {
				
				
			}
		}

}