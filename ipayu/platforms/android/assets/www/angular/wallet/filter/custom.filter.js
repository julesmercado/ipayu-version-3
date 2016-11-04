

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
			return new Date(date).getTime() / 1000;
		}

		var dateFrom = parseTimestamp(from);
		var dateTo = parseTimestamp(to);
		
		var result = [];
		for (var i=0; i < items.length; i++){
			var transactionDate = items[i].date;
			if (transactionDate >= dateFrom && transactionDate <= dateTo)  {
				result.push(items[i]);
			}
		}
		excel.setCurrentFilter(result);
		return result;
	};
}

