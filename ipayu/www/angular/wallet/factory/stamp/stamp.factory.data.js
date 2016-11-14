
mainModule.factory('stampData', StampData)


StampData.$inject = ['storages'];
function StampData(storages) {

    return {

// Setters
        setUserStamps: function (data) {
            localStorage.setItem(storages.ipayustampcards, JSON.stringify(data));
            return data;
        },

        setFeaturedStamps: function (data, type) {
            localStorage.setItem(storages.ipayufeaturedstamps, JSON.stringify(data));
            return data;
        },

        setUsedStamps: function (data, type) {
            localStorage.setItem(storages.ipayuusedstamps, JSON.stringify(data));
            return data;
        },


// Getters
        getUserStamps: function () {
            var retrievedObject = localStorage.getItem(storages.ipayustampcards);
            return JSON.parse(retrievedObject) || [];
        },

        getFeaturedStamps: function () {
            var retrievedObject = localStorage.getItem(storages.ipayufeaturedstamps);
            return JSON.parse(retrievedObject) || [];
        },

        getUsedStamps: function () {
            var retrievedObject = localStorage.getItem(storages.ipayuusedstamps);
            return JSON.parse(retrievedObject) || [];
        },


        addUserStamp: function(data){
            var retrievedObject = localStorage.getItem(storages.ipayustampcards);
            retrievedObject = JSON.parse(retrievedObject) || [];
            retrievedObject.push(data);

            retrievedObject.sort(function(a, b){
                if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                return 0;
            });
            localStorage.setItem(t, JSON.stringify(retrievedObject));
        },

    }

}