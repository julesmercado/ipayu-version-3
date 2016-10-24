
mainModule.factory('flags', FlagFactory)

// FlagFactory.$inject = [];

function FlagFactory() {

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

        getAll: function (){
            return flags;
        },
        get: function (code){
            for(var i in flags){
                if(flags.hasOwnProperty(i) && flags[i].code == code){
                    return flags[i];
                }
            }
        }

    }

}
