
mainModule.factory('accountData', AccountData)

// AccountData.$inject = [];

function AccountData() {

    var attempts = 0;

    return {

// Setters
        setUser: function (data) {
            if(data == false){
                localStorage.removeItem("ipayuuserinfo");
            }
            else{
                localStorage.setItem('ipayuuserinfo', JSON.stringify(data));
            }
            return data;
        },

        setNumberOfAttempts: function (att) {
            attempts = att;
        },


// Getters
        getUser: function () {
            var retrievedObject = localStorage.getItem('ipayuuserinfo');
            return JSON.parse(retrievedObject) || [];
        },

        getNumberOfAttempts: function () {
            return attempts;
        }

    }

}

