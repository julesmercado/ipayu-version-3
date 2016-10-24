

(function () {

    'use strict';

    var modules = [];


    angular
        .module('factory.account.data', modules)
        .factory('accountData', AccountData)

    // AccountData.$inject = [];

    function AccountData() {

        return {

            setUser: function (data) {
                if(data == false){
                    localStorage.removeItem("ipayuuserinfo");
                }
                else{
                    localStorage.setItem('ipayuuserinfo', JSON.stringify(data));
                }
                return data;
            },

            getUser: function () {
                var retrievedObject = localStorage.getItem('ipayuuserinfo');
                return JSON.parse(retrievedObject) || [];
            }

        }

    }

})();