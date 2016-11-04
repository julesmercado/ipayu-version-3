
mainModule.factory('flags', FlagFactory)

// FlagFactory.$inject = [];

function FlagFactory() {

    var loginCount = 0, doubleTap = 0;

    var countryDisplay = {
        flag : '',
        name : '',
        country: '',
        display : false
    };

    var all_flags = [ 
                        {'name':"Singapore",   'code':"SG",   'img':"sg.png",           'prefix':"+65",     'limit':8}, 
                        {'name':"Philippines", 'code':"PH",   'img':"PH.png",           'prefix':"+63",     'limit':10}, 
                        {'name':"Laos",        'code':"LA",   'img':"laos.png",         'prefix':"+60",     'limit':10}, 
                        {'name':"Thailand",    'code':"TH",   'img':"thailand.png",     'prefix':"+66",     'limit':10}, 
                        {'name':"Myanmar",     'code':"MM",   'img':"myanmar.png",      'prefix':"+855",    'limit':10},
                        {'name':"Cambodia",    'code':"KH",   'img':"cambodia.png",     'prefix':"+84",     'limit':10}, 
                        {'name':"Indonesia",   'code':"ID",   'img':"indonesia.png",    'prefix':"+673",    'limit':10}, 
                        {'name':"Brunei",      'code':"BN",   'img':"brunei.png",       'prefix':"+95",     'limit':10}
                    ];

    return {
        // Setters
        setLoginCount: function (count) {
            loginCount = count;
        },
        setDoubleTap: function (taps) {
            doubleTap = taps;
        },
        setCountryDisplay: function (country) {
            countryDisplay = country;
        },

        // Getters
        getLoginCount: function () {
            return loginCount;
        },
        getDoubleTap: function () {
            return doubleTap;
        },
        getCountryDisplay: function () {
            return countryDisplay;
        },
        getFlagByCode: function(code){
            var temp = angular.copy(all_flags);
            for (var i = 0; i < temp.length; i++) {
                if(temp[i].code == code){
                    return temp[i];
                }
            }
        },
        getFlagByPrefix: function (prefix){
            var temp = angular.copy(all_flags);
            for (var i = 0; i < temp.length; i++) {
                if(temp[i].prefix == prefix){
                    return temp[i];
                }
            }
        },
        getAll: function (){
            return all_flags;
        },
        setUpCountryDisplay: function (code) {
            for (var i = 0; i < all_flags.length; i++) {
                if(all_flags[i].code == code){
                    countryDisplay = {
                        flag : all_flags[i].img,
                        name : all_flags[i].code,
                        country: all_flags[i].name,
                        display : false
                    };
                    return;
                }
            }
        }

    }
}
