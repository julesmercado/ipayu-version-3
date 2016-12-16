

mallInfo.factory('mallData', function ($rootScope) {

	var mallInfo = {};
	var shopInfo = {};
	var mallCard = {};
	var mallEvent = {};
	return {
		setMallInfo: function( mall ){
			if( mall ){
				mallInfo = mall;
				
			}else{
				return mallInfo;
			}
		},
		setMallEvent: function( mallEvents ){
			if( mallEvents ){
				mallEvent = mallEvents;
				
			}else{
				return mallEvent;
			}
		},
		setShopInfo: function( shop ){
			if( shop ){
				shopInfo = shop;
				
			}else{
				return shopInfo;
			}
		},
		setMallCard: function( card ){
			if( card ){
				mallCard = card;
				
			}else{
				return mallCard;
			}
		}
		
	}

})