

mallInfo.factory('mallCardFactory2', function ($rootScope, mallRequest, $q) {

	

	return {

        fetchAllMallCards: function(userId){
        	var req  = mallRequest.requestAllMallCards(userId);
        	return $q.all([req])
	                    .then(
	                        function(results){
	                            return {
	                                allMallCard: results[0].data
	                            };
	                        }
	                    )
        },
        fetchAllMallsFeaturedAndNew: function(){
			var req = mallRequest.requestFeaturedMallsAndNew();
			return $q.all([req])
	                    .then(
	                        function(results){
	                            return {
	                                all: results[0].data
	                            };
	                        }
	                    )
		},
		fetchMallEvents: function( id ){
			var req = mallRequest.requestMallEvents(id);
			return $q.all([req])
	                    .then(
	                        function(results){
	                            return {
	                                all: results[0].data
	                            };
	                        }
	                    )
		},
		getReactionsImage: function(  ){
			var req = mallRequest.getReactionsImages( );
			return $q.all([req])
	                    .then(
	                        function(results){
	                            return {
	                                all: results[0].data
	                            };
	                        }
	                    )
		},
		postReact: function( asset_id, ipayu_id, react_id, date ){
			var req = mallRequest.postReaction( asset_id, ipayu_id, react_id, date );
			return $q.all([req])
	                    .then(
	                        function(results){
	                            return {
	                                all: results
	                            };
	                        }
	                    )
		},
		getComments: function( events ){
			var req = mallRequest.getComments( events.asset_event_id );
			return $q.all([req])
	                    .then(
	                        function(results){
	                            return {
	                                all: results[0].data
	                            };
	                        }
	                    )
		},
		postComments: function( asset_id, ipayu_id, desc, date ){
			var req = mallRequest.postComments( asset_id, ipayu_id, desc, date );
			return $q.all([req])
	                    .then(
	                        function(results){
	                            return {
	                                all: results
	                            };
	                        }
	                    )
		},
		getShopsInMall: function( asset_id ){
			var req = mallRequest.getShopsInMall( asset_id );
			return $q.all([req])
	                    .then(
	                        function(results){
	                            return {
	                                all: results[0].data
	                            };
	                        }
	                    )
		}

	}

})