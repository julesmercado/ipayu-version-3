

mallInfo.factory('mallRequest', function ($rootScope, $http , $httpParamSerializerJQLike, API_ROOT_URL) {
    var mallInfoUrl = 'http://www.ipayu.co/ipayu_cms/controller/';
    var bringmesmiles = 'http://bringmesmiles.com/ipayu/controller/mall_info_controller.php';
    var lightbreak = 'http://lightbreak.zz.mu/ipayu/controller/mall_info_controller.php';
	return {

        requestAllMallCards: function(userId){
            return $http({
                        method: 'GET',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                        url: API_ROOT_URL + 'mall_card_controller.php',
                        params: {'ipayuId':userId, 'requestType': 'getAllMallsWithSort'}
                    });
        },
        requestFeaturedMallsAndNew: function(){
            return $http({
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                        url: lightbreak,
                        data: $httpParamSerializerJQLike( { 'requestType': 'GetMalls_' } )
                    });
        },
        requestMallEvents: function(id){
            return $http({
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                        url: lightbreak,
                        data: $httpParamSerializerJQLike( {'requestType': 'GetEvents_', 'asset_info_id': id} )
                    });
        },
        getReactionsImages: function(){
            return $http({
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                        url: lightbreak,
                        data: $httpParamSerializerJQLike( {'requestType': 'GetReactions_'} )
                    });
        },
        postReaction: function(asset_id, ipayu_id, react_id, date){
            return $http({
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                        url: lightbreak,
                        data: $httpParamSerializerJQLike({'requestType': 'addReaction_', 'asset_event_id': asset_id, 'ipayu_id': ipayu_id, 'reaction_id': react_id, 'datetime_reacted': date})
                    });
        },
        getComments: function(asset_id){
            return $http({
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                        url: lightbreak,
                        data: $httpParamSerializerJQLike( {'requestType': 'GetComments_', 'asset_event_id': asset_id} )
                    });
        },
        postComments: function(asset_id, ipayu_id, desc, date){
            return $http({
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                        url: lightbreak,
                        data: $httpParamSerializerJQLike({'requestType': 'addComment_', 'asset_event_id': asset_id, 'ipayu_id': ipayu_id, 'description': desc, 'datetime_commented': date})
                    });
        },
        getShopsInMall: function(asset_id){
            return $http({
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                        url: lightbreak,
                        data: $httpParamSerializerJQLike({'requestType': 'GetShopsByMall_', 'asset_info_id': asset_id})
                    });
        },
        getCategoriesInShops: function(asset_id){
            return $http({
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                        url: lightbreak,
                        data: $httpParamSerializerJQLike({'requestType': 'GetCategories_'})
                    });
        }

	}

})