
mainModule.factory('account', AccountFactory)

AccountFactory.$inject = ['$q', 'accountRequest'];

function AccountFactory($q, accountRequest) {

    function thenFunc(response) {
         console.log(response);
        return response;
    }

    function errFunc(err){
        console.log(err);
    }

    return {

        register: function (data) {
            var req_register = accountRequest.register(data);
            return $q.all([req_register])
                .then(thenFunc, errFunc)
        },
        getQuestions: function () {
            var req_questions = accountRequest.getQuestions();
            return $q.all([req_questions])
                .then(thenFunc, errFunc)
        },
        checkIfExist: function (data, type) {
            var req_email = accountRequest.checkIfExist(data, type);
            return $q.all([req_email])
                .then(thenFunc, errFunc)
        },
        login: function(username, password){
            var req_login = accountRequest.login(username, password);
            return $q.all([req_login])
                .then(thenFunc, errFunc)
        },
        resetPassword: function(data){
            var req_reset = accountRequest.resetPassword(data);
            return $q.all([req_reset])
                .then(thenFunc, errFunc)
        },
        changePassword: function(data){
            var req_changepass = accountRequest.changePassword(data);
            return $q.all([req_changepass])
                .then(thenFunc, errFunc)
        },
        getNotifications: function(data){
            var req_notification = accountRequest.getNotifications(data);
            return $q.all([req_notification])
                .then(thenFunc, errFunc)
        }

    }

}