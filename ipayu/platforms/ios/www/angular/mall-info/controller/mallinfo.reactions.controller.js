mallInfo.controller('reactions', ReactionsDirective );


function ReactionsDirective( $rootScope , $scope , mallCardFactory2 , mallData , accountData ){

    var ctr = 0;
    
	mallCardFactory2.getReactionsImage( ).then( function( response ){
        var reactions = response.all.data;
        $scope.reactions = reactions.reverse();
		for( var i in $scope.reactions ){
			$scope.reactions[i].class = 'reaction-' + $scope.reactions[i].name;
		}
    } )

    $scope.postReactions = function(event, reaction){
        console.log(ctr)
        if(ctr != 0){
            var data = mallData.setMallCard();
            var user = accountData.getUser();
            var date = new Date();
            
            mallCardFactory2.postReact(event.asset_event_id, user.ipayu_id, reaction.reaction_id, Date.parse(date))
            .then( function( response ){
                $rootScope.$broadcast('get_events');
            });
        }
        else {
            ctr++;
        }
        
    }
    

}