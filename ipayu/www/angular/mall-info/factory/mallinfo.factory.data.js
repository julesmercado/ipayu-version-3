

mallInfo.factory('mallData', function ($rootScope) {

	var mallInfo = {};
	var shopInfo = {};
	var mallCard = {};
	return {
		setMallInfo: function( mall ){
			if( mall ){
				mallInfo = mall;
				
			}else{
				return mallInfo;
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