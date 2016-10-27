
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

    var flags = [ 
                    {"name": "Singapore", "code": "SG", "img":"sg.png"}, 
                    {"name": "Philippines", "code": "PH", "img":"PH.png"}, 
                    {"name": "Laos", "code": "LA", "img":"laos.png"}, 
                    {"name": "Thailand", "code": "TH", "img":"thailand.png"}, 
                    {"name": "Myanmar", "code": "MM", "img":"myanmar.png"},
                    {"name": "Cambodia", "code": "KH", "img":"cambodia.png"}, 
                    {"name": "Indonesia", "code": "ID", "img":"indonesia.png"}, 
                    {"name": "Brunei", "code": "BN", "img":"brunei.png"}
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

        getAll: function (){
            return flags;
        },
        get: function (code){
            for(var i in flags){
                if(flags.hasOwnProperty(i) && flags[i].code == code){
                    return flags[i];
                }
            }
        },


        setUpCountryDisplay: function (code) {
            for (var i = 0; i < flags.length; i++) {
                if(flags[i].code == code){
                    countryDisplay = {
                        flag : flags[i].img,
                        name : flags[i].code,
                        country: flags[i].name,
                        display : false
                    };
                    return;
                }
            }
        }

    }
}
