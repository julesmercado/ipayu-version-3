

mallInfo.factory('mallData', function ($rootScope) {

	return {

		// setters
			setMallCard: function ( data ) {
				if(data == false){
					localStorage.removeItem("mallcards");
				}
				else{
					localStorage.setItem('mallcards', JSON.stringify(data));
				}
				return data;
			},
			setFrequently: function ( data ) {
				if(data == false){
					localStorage.removeItem("mallFrequently");
				}
				else{
					localStorage.setItem('mallFrequently', JSON.stringify(data));
				}
				return data;
			},
			setLastUsed: function ( data ) {
				if(data == false){
					localStorage.removeItem("mallLastUsed");
				}
				else{
					localStorage.setItem('mallLastUsed', JSON.stringify(data));
				}
				return data;
			},
			setAllMalls: function ( data ) {
				if(data == false){
					localStorage.removeItem("allMalls");
				}
				else{
					localStorage.setItem('allMalls', JSON.stringify(data));
				}
				return data;
			},
			setCategories: function ( data ) {
				if(data == false){
					localStorage.removeItem("mallCategories");
				}
				else{
					localStorage.setItem('mallCategories', JSON.stringify(data));
				}
				return data;
			},
			setMallCardList: function(data){
				if(data == false){
					localStorage.removeItem("mallCardList");
				}
				else{
					localStorage.setItem('mallCardList', JSON.stringify(data));
				}
				return data;
			},
			setMallCardRewards: function(data){
				if(data == false){
					localStorage.removeItem("mallCardRewards");
				}
				else{
					localStorage.setItem('mallCardRewards', JSON.stringify(data));
				}
				return data;
			},
			setMallCardTransaction: function(data){
				if(data == false){
					localStorage.removeItem("mallCardTransaction");
				}
				else{
					localStorage.setItem('mallCardTransaction', JSON.stringify(data));
				}
				return data;
			},
			setMallCardInfo: function(data){
				if(data == false){
					localStorage.removeItem("mallCardInfo");
				}
				else{
					localStorage.setItem('mallCardInfo', JSON.stringify(data));
				}
				return data;
			},
			setMallAllCards: function(data){
				if(data == false){
					localStorage.removeItem("MallAllCards");
				}
				else{
					localStorage.setItem('MallAllCards', JSON.stringify(data));
				}
				return data;
			},





		// getters
			getMallCard: function(){
				var retrievedObject = localStorage.getItem('mallcards');
				return JSON.parse(retrievedObject) || [];
			},
			getLastUsed: function(){
				var retrievedObject = localStorage.getItem('mallLastUsed');
				return JSON.parse(retrievedObject) || [];
			},
			getFrequently: function(){
				var retrievedObject = localStorage.getItem('mallFrequently');
				return JSON.parse(retrievedObject) || [];
			},
			getAllMalls: function () {
				var retrievedObject = localStorage.getItem('allMalls');
				return JSON.parse(retrievedObject) || [];
			},
			getCategories: function () {
				var retrievedObject = localStorage.getItem('mallCategories');
				return JSON.parse(retrievedObject) || [];
			},
			getMallCardList: function () {
				var retrievedObject = localStorage.getItem('mallCardList');
				return JSON.parse(retrievedObject) || [];
			},
			getMallCardRewards: function () {
				var retrievedObject = localStorage.getItem('mallCardRewards');
				return JSON.parse(retrievedObject) || [];
			},
			getMallCardTransaction: function () {
				var retrievedObject = localStorage.getItem('mallCardTransaction');
				return JSON.parse(retrievedObject) || [];
			},
			getMallCardInfo: function(){
				var retrievedObject = localStorage.getItem('mallCardInfo');
				return JSON.parse(retrievedObject) || [];
			},
			getMallAllCards: function(){
				var retrievedObject = localStorage.getItem('MallAllCards');
				return JSON.parse(retrievedObject) || [];
			},



		// add

		addMyMallCards: function(data){
			var retrievedObject = localStorage.getItem('mallcards');
			retrievedObject = JSON.parse(retrievedObject) || [];
			retrievedObject.push(data);

			retrievedObject.sort(function(a, b){
				if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
				if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
				return 0;
			});
			localStorage.setItem('mallcards', JSON.stringify(retrievedObject));
		},

		
	}

})