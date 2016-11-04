mallInfo.controller('reactions', ReactionsDirective );


function ReactionsDirective( $rootScope , $scope , mallCardFactory2 , mallData , accountData ){

				
	mallCardFactory2.getReactionsImage( ).then( function( response ){
        var reactions = response.all.data;
        $scope.reactions = reactions.reverse();
		for( var i in $scope.reactions ){
			$scope.reactions[i].class = 'reaction-' + $scope.reactions[i].name;
		}
    } )

    $scope.postReactions = function(){
    	var data = mallData.setMallCard();
    	var user = accountData.getUser();
    	var date = new Date();
    	mallCardFactory2.postComments( data.asset_event_id , user.ipayu_id , $scope.commentModel , Date.parse(date) ).then( function( response ){
            console.log( response );
            console.log($scope)
        } );
    }

}