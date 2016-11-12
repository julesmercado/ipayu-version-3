
walletModule.factory('stamp', StampFactory)

StampFactory.$inject = ['$q', 'stampRequest'];

function StampFactory($q, stampRequest) {

    function thenFunc(response) {
        // console.log(response);
        return response;
    }

    function errFunc(err){
        console.log(err);
    }

    return {

        getUserStamps: function (id, ignore) {
            var req_stamp = stampRequest.getUserStamps(id, ignore);
            return $q.all([req_stamp])
                .then(thenFunc, errFunc)
        }

    }

}