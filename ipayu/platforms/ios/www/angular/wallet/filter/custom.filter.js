

walletModule.filter('redeemfilter', Redeemfilter)
walletModule.filter('daterangefilter', Daterangefilter)
walletModule.filter('capitalize', Capitalize)
walletModule.filter('readabledate', ReadableDate)


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
            return Date.parse(new Date(date));
		}
        
        function getDate(date){
            var thisDate = new Date(parseInt(date)),
                d = thisDate.getDate(),
                m = thisDate.getMonth() + 1,
                y = thisDate.getFullYear();
            return parseTimestamp(m+'/'+d+'/'+y);
        }

		var dateFrom = parseTimestamp(from);
		var dateTo = parseTimestamp(to);
		
		var result = [];
        
        for(var i in items){
            if(items.hasOwnProperty(i)){
                var transactionDate = getDate(items[i].date);
                if (transactionDate >= dateFrom && transactionDate <= dateTo)  {
                    result.push(items[i]);
                }
            }
        }
        
		excel.setCurrentFilter(result);
		return result;
	};
}

Redeemfilter.$inject = [];
function Capitalize(){
    return function(input) {
        return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
}

ReadableDate.$inject = ['$filter'];
function ReadableDate($filter){
    return function(date){
        return $filter('date')(date, 'MMMM dd, yyyy');
    }
}

