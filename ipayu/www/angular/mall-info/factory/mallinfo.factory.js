

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
		postReact: function( asset_id, ipayu_id, react_id, date ){
			var req = mallRequest.requestMallEvents( asset_id, ipayu_id, react_id, date );
			return $q.all([req])
	                    .then(
	                        function(results){
	                            return {
	                                all: results
	                            };
	                        }
	                    )
		},
		getComments: function( asset_id ){
			var req = mallRequest.requestMallEvents( asset_id );
			return $q.all([req])
	                    .then(
	                        function(results){
	                            return {
	                                all: results
	                            };
	                        }
	                    )
		},
		postComments: function( asset_id, ipayu_id, desc, date ){
			var req = mallRequest.requestMallEvents( asset_id, ipayu_id, desc, date );
			return $q.all([req])
	                    .then(
	                        function(results){
	                            return {
	                                all: results
	                            };
	                        }
	                    )
		}
	}

})