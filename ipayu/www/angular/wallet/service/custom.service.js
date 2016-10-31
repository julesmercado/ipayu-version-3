
walletModule.factory('customService', CustomService)

CustomService.$inject = [];
function CustomService() {

	return {

	    alert: function (message, title, button_text) {
            if(navigator.notification){
                navigator.notification.alert(
                    message || '',
                    function(){return 0;},
                    title || 'Ipayu Alert',
                    button_text || 'Ok'
                );
            }
            else{ alert(message)}
        },

	    filterByCountry: function(cards, country, chunk, chunkSize){
	        var filtered = [];
	        for (var i = 0; i < cards.length; i++) {
	            if(cards[i].country == country){
	                filtered.push(cards[i]);
	            }   
	        }
	        if(chunk){return this.chunk(filtered, chunkSize || 2);}
	        else{return filtered}
	        
	    },

	    chunk: function(arrayData, chunkSize){
	        return [].concat.apply([],
	            arrayData.map(function(elem,i) {
	                return i%chunkSize ? [] : [arrayData.slice(i,i+chunkSize)];
	            })
	        );
	    },

	    paginate: function (data, cols, rows, currentPage, pageSize) {
			var hasMore = false,
				start = currentPage*pageSize,
				data = data.slice(start),
				returnData = [],
				temp = [],
				remove_last_column = false;

			for (var i = 0; i < data.length; i++) {
				if(temp.length != cols-1){
					temp.push(data[i]);
					remove_last_column = false;
				}
				else{
					returnData.push(temp);
					temp = [];
					temp.push(data[i]);
					remove_last_column = true;
				}
				if(i == data.length-1){
					returnData.push(temp);
				}
				if(returnData.length == rows-1) {
					if(returnData[rows-1].length == cols-1){
						returnData[rows-1][col-2] = false;
						hasMore = true;
						remove_last_column = true;
						break;
					}
				}
			}

			var last_row = returnData.slice(-1)[0];

			if(last_row){
				var last_col = returnData[returnData.indexOf(last_row)].slice(-1)[0];
				if(remove_last_column){
					returnData[returnData.indexOf(last_row)][last_row.indexOf(last_col)] = true;
				}
				else{
					returnData[returnData.indexOf(last_row)][last_row.indexOf(last_col) + 1] = true;
				}
			}
			else{
				returnData.push(new Array(true))
			}
			return {'data':returnData, 'has_more':hasMore};
	    },

    	groupByFirstLetter: function(allCards, country, searchData){
			var data = allCards;
			var all = [];

			var firstLetter = '';
			var tempFirstLetter = '';

			for (var i = 0; i < data.length; i++) {

				var checkFirstLetter = data[i].name.substr(0, 1).toUpperCase().match('[A-Z]');
				if(!checkFirstLetter){
					tempFirstLetter = 'num';
				}
				else{
					tempFirstLetter = data[i].name.substr(0, 1).toUpperCase();
				}

				if(tempFirstLetter != firstLetter && data[i].country == country) {
					if(searchData == '') {
						var alpha = new Array();
						firstLetter = tempFirstLetter;
						alpha[0] = firstLetter;
						alpha[1] = [[]];
						all.push(alpha);
					}
					else {
						var pos = data[i].name.toLowerCase().indexOf(searchData.toLowerCase());
						if(pos == 0){
							var alpha = new Array();
							firstLetter = tempFirstLetter;
							alpha[0] = firstLetter;
							alpha[1] = [[]];
							all.push(alpha);
						}
					}
				}
			}
			
		    all.sort(function(a, b){
		        if(a[0] > b[0]) return -1;
		        if(a[0] < b[0]) return 1;
		        return 0;
		    })
			return all.reverse();

    	}
	}

}