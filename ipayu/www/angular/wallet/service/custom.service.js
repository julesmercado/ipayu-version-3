
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
            else{ alert(message) }
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

	    paginate: function (data, cols, rows, currentPage, pageSize, for_shop) {
			var hasMore = false,
				start = currentPage*pageSize,
				data = data.slice(start),
				returnData = [],
				temp = [],
				remove_last_column = false,
				full = false;

			for (var i = 0; i < data.length; i++) {
				if(temp.length != cols){
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
				if(returnData.length == rows) {
					if(returnData[rows-1].length == cols){
						if(!for_shop){
							returnData[rows-1][cols-2] = false;
						}
						returnData[rows-1][cols-1] = true;
						hasMore = true;
						full = true;
						break;
					}
				}
			}

			var last_row = returnData.slice(-1)[0];
			if(last_row && !full && !for_shop){
				var last_col = returnData[returnData.indexOf(last_row)].slice(-1)[0];
				if(remove_last_column){
					returnData[returnData.indexOf(last_row)][last_row.indexOf(last_col)] = true;
				}
				else{
					if(last_row.length == cols){
						returnData.push(new Array(true))
					}
					else{
						returnData[returnData.indexOf(last_row)][last_row.indexOf(last_col) + 1] = true;
					}
				}
			}
			else if(!full && !for_shop){
				returnData.push(new Array(true))
			}
			return {'data':returnData, 'has_more':hasMore};
	    },

    	groupByFirstLetter: function(allCards, country, searchData, mallInfo){
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
						firstLetter = tempFirstLetter;
						var alpha = this.getAlpha(firstLetter, mallInfo);
						all.push(alpha);
					}
					else {
						var pos = data[i].name.toLowerCase().indexOf(searchData.toLowerCase());
						if(pos == 0){
							firstLetter = tempFirstLetter;
							var alpha = this.getAlpha(firstLetter, mallInfo);
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

    	},

    	getAlpha: function(firstLetter, mallInfo){
    		var alpha = new Array();
    		if(mallInfo){
				alpha[0] = firstLetter;
				alpha[1] = [];
    		}
    		else{
				alpha[0] = firstLetter;
				alpha[1] = [[]];
    		}
    		return alpha;
    	},

		filterByCategory: function(data, cat){
			if(cat == '') {
				return data;
			}
			var returnData = [];
			for (var i = 0; i < data.length; i++) {
			var checker = false;
				for (var x = 0; x < data[i].category_name.length; x++) {
					var value = data[i].category_name[x].name;
					if(value == cat) {
						checker = true;
					}
				}
				if(checker) {
					returnData.push(data[i]);
				}
			}
			return returnData;
		}
	}

}