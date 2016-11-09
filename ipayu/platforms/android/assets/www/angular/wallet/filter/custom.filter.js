

walletModule.filter('redeemfilter', Redeemfilter)
walletModule.filter('daterangefilter', Daterangefilter)

Redeemfilter.$inject = [];
function Redeemfilter(){

	return function(items, points){
		var res = [];
		for (var i = 0; i < items.length; i++) {
			if(items[i].point_value <= points){
				res.push(items[i]);
			}   
		}
		return res;
	}
}

Daterangefilter.$inject = ['excel'];
function Daterangefilter(excel){

	return function(items, from, to) {

		function parseTimestamp(date){
            console.log(date)
            return Date.parse(new Date(date));
		}

		var dateFrom = parseTimestamp(from);
		var dateTo = parseTimestamp(to);
        
        console.log(dateFrom)
        console.log(dateTo)
		
		var result = [];
		for (var i=0; i < items.length; i++){
			var transactionDate = items[i].date;
            console.log(items[i].date)
			if (transactionDate >= dateFrom && transactionDate <= dateTo)  {
				result.push(items[i]);
			}
		}
		excel.setCurrentFilter(result);
		return result;
	};
}

