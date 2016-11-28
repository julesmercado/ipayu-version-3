
mainModule.factory('stampData', StampData)


StampData.$inject = ['storages'];
function StampData(storages) {

    var all_available = [],
        card_to_add = [];
    
    function dataFromStorage(storage) {
        var retrievedObject = localStorage.getItem(storage);
        return JSON.parse(retrievedObject) || [];
    }
    
    return {
        
        allAvailableCard: function(data){
            if(data){
                all_available = data;
            }
            return all_available;
        },

        cardToAdd: function(data){
            if(data){
                card_to_add = data;
            }
            return card_to_add;
        },
        
        userStamps: function (data) {
            if(data){
                localStorage.setItem(storages.ipayustampcards, JSON.stringify(data));
                return data;
            }
            return dataFromStorage(storages.ipayustampcards)
        },
        
        featuredStamps: function (data) {
            if(data){
                localStorage.setItem(storages.ipayufeaturedstamps, JSON.stringify(data));
                return data;
            }
            return dataFromStorage(storages.ipayufeaturedstamps)
        },
        
        usedStamps: function (data) {
            if(data){
                localStorage.setItem(storages.ipayuusedstamps, JSON.stringify(data));
                return data;
            }
            return dataFromStorage(storages.ipayuusedstamps)
        }
        
    }

}