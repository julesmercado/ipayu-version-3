mallInfo.directive('reactionsDirective', ReactionsDirective );

ReactionsDirective.$inject = [ '$rootScope' ];

function ReactionsDirective( $rootScope ){

		return{
			"restrict": "A",
			"scope": {},
			"link": function onLink ( scope , element , atrributeSet ) {
				
				$rootScope.$on( "broadcast-reactions-images" , function( evt , data ){
					scope.reactions = data.reverse();
					for( var i in scope.reactions ){
						scope.reactions[i].class = 'reaction-' + scope.reactions[i].name;
					}
					
					
				} )
			}
		}

}