
mainModule.factory('accountData', AccountData)

// AccountData.$inject = [];

function AccountData() {

    var attempts = 0,
        doubleTap = 0;

    return {

// Setters
        setUser: function (data) {
            localStorage.setItem('ipayuuserinfo', JSON.stringify(data));
        },
        setTopThreeFrequent: function (data) {
            localStorage.setItem('ipayutopthreefrequent', JSON.stringify(data));
        },
        setNumberOfAttempts: function (att) {
            attempts = att;
        },

        setDoubleTap: function (tap) {
            doubleTap = tap;
        },


// Getters
        getUser: function () {
            var retrievedObject = localStorage.getItem('ipayuuserinfo');
            return JSON.parse(retrievedObject) || [];
        },
        getTopThreeFrequent: function (data) {
            var retrievedObject = localStorage.getItem('ipayutopthreefrequent');
            return JSON.parse(retrievedObject) || [new Array(), new Array(), new Array()];
        },

        getNumberOfAttempts: function () {
            return attempts;
        },
        getDoubleTap: function () {
            return doubleTap;
        }

    }

}

