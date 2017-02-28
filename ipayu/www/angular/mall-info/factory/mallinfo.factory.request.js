

mallInfo.factory('mallRequest', function ($rootScope, $http , $httpParamSerializerJQLike, API_ROOT_URL) {
    var mallInfoUrl = 'http://www.ipayu.co/ipayu_cms/controller/';
    var bringmesmiles = 'http://bringmesmiles.com/ipayu/controller/mall_info_controller.php';
    var lightbreak = 'http://lightbreak.zz.mu/ipayu/controller/mall_info_controller.php';
    var ipayu_v3 = 'http://ipayu.co/ipayu_app_v3/controller/mall_info_controller.php';
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
                        url: ipayu_v3,
                        data: $httpParamSerializerJQLike( { 'requestType': 'GetMalls_' } )
                    });
        },
        requestMallEvents: function(id){
            return $http({
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                        url: ipayu_v3,
                        data: $httpParamSerializerJQLike( {'requestType': 'GetEvents_', 'asset_id': id} )/*asset_info_id*/
                    });
        },
        getReactionsImages: function(){
            return $http({
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                        url: ipayu_v3,
                        data: $httpParamSerializerJQLike( {'requestType': 'GetReactions_'} )
                    });
        },
        postReaction: function(asset_id, ipayu_id, react_id, date, status){
            return $http({
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                        url: ipayu_v3,
                        data: $httpParamSerializerJQLike({'requestType': 'addReaction_', 'event_id': asset_id, 'ipayu_id': ipayu_id, 'reaction_id': react_id, 'event_reaction_datetime': date, 'event_reaction_status':status})
                    });/*asset_event_id*/
        },
        getComments: function(asset_id){
            return $http({
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                        url: ipayu_v3,
                        data: $httpParamSerializerJQLike( {'requestType': 'GetComments_', 'event_id': asset_id} )/*asset_event_id*/
                    });
        },
        postComments: function(asset_id, ipayu_id, desc, date, status){
            return $http({
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                        url: ipayu_v3,
                        data: $httpParamSerializerJQLike({'requestType': 'addComment_', 'event_id': asset_id, 'ipayu_id': ipayu_id, 'event_comment': desc, 'event_comment_datetime': date, 'event_comment_status': status})
                    });/*asset_event_id, description, datetime_commented*/
        },
        getShopsInMall: function(asset_id){
            return $http({
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                        url: ipayu_v3,
                        data: $httpParamSerializerJQLike({'requestType': 'GetShopsByMall_', 'asset_id': asset_id})/*asset_info_id*/
                    });
        },
        getCategoriesInShops: function(asset_id){
            return $http({
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                        url: ipayu_v3,
                        data: $httpParamSerializerJQLike({'requestType': 'GetCategories_'})
                    });
        },
        deleteComment: function(comment_id){
            return $http({
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                        url: ipayu_v3,
                        data: $httpParamSerializerJQLike({'requestType': 'deleteComment_', 'event_comment_id': comment_id})
                    });
        }

	}

})