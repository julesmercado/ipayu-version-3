

mallInfo.factory('mallRequest', function ($rootScope, $http) {
    var mallInfoUrl = 'http://www.ipayu.co/ipayu_cms/controller/';
    var bringmesmiles = 'http://bringmesmiles.com/ipayu/controller/mall_info_controller.php';
	return {

        requestAllMallCards: function(userId){
            return $http({
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                        url: $rootScope.api_url + 'mall_card_controller.php',
                        params: {'ipayuId':userId, 'requestType': 'getAllMallsWithSort'}
                    });
        },
        requestFeaturedMallsAndNew: function(){
            return $http({
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                        url: mallInfoUrl + 'card_controller.php',
                        params: {'requestType': 'getAllFeaturedMall'}
                    });
        },
        requestMallEvents: function(id){
            return $http({
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        url: bringmesmiles,
                        params: {'requestType': 'GetEvents_', 'asset_info_id': id}
                    });
        },
        postReaction: function(asset_id, ipayu_id, react_id, date){
            return $http({
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        url: bringmesmiles,
                        params: {'requestType': 'addReaction_', 'asset_event_id': asset_id, 'ipayu_id': ipayu_id, 'react_id': react_id, 'date': date}
                    });
        },
        getComments: function(asset_id){
            return $http({
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        url: bringmesmiles,
                        params: {'requestType': 'GetComments_', 'asset_event_id': asset_id}
                    });
        },
        postComments: function(asset_id, ipayu_id, desc, date){
            return $http({
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        url: bringmesmiles,
                        params: {'requestType': 'addReaction_', 'asset_event_id': asset_id, 'ipayu_id': ipayu_id, 'description': desc, 'date': date}
                    });
        }

	}

})