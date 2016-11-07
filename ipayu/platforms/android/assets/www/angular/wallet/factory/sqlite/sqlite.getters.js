
walletModule.factory('sqliteGet', SqliteGetters)

SqliteGetters.$inject = ['$rootScope', '$cordovaSQLite', '$q', '$rootScope'];

function SqliteGetters($rootScope, $cordovaSQLite, $q, $rootScope) {

    return {

        user: function(){
            var defferred = $q.defer();
            var query = "SELECT id , first_name , last_name , profile_image, email, gender, country FROM ipayu_user";
            user_info = false;
            $rootScope.ipayu_db.transaction(function(transaction) {
            transaction.executeSql(query, [],
                function (tx, result) {
                    defferred.resolve({
                        data: result.rows.item(0)
                    })
                },
                function(error){
                    console.log(error.message);
                    defferred.reject(error.message);
                });
            });
            return defferred.promise;
        },

        transactions: function(type, card_id){
            var defferred = $q.defer();
            var query = "SELECT transaction_id, transaction_type, card_id, balance, image, item_name, mall_name, point_value, quantity, r_image, rebate, sales_amount, shop_name, timestamp, transaction_date, type, card_type, rewardsgift_id FROM card_transactions WHERE card_type = ? AND card_id = ?";
            $rootScope.ipayu_db.transaction(function(transaction) {
                transaction.executeSql(query, [type, card_id],
                    function (tx, result) {
                        var temp = [];
                        for (var i = 0; i < result.rows.length; i++) {
                            temp.push(result.rows.item(i));
                        }
                        defferred.resolve({
                                data: temp
                            })
                    },
                    function(error){
                        defferred.reject(error.message);
                    });
                });
            return defferred.promise;
        },

        redeemables: function(type, card_id){
            var defferred = $q.defer();
            var query = "SELECT card_id, asset_id, card_type, image, item_name, item_quantity, point_value, quantity_remaining, rewardsgift_id, shop_id FROM card_redeemables WHERE card_type = ? AND card_id = ?";
            $rootScope.ipayu_db.transaction(function(transaction) {
                transaction.executeSql(query, [type, card_id],
                    function (tx, result) {
                        var temp = [];
                        for (var i = 0; i < result.rows.length; i++) {
                            temp.push(result.rows.item(i));
                        }
                        defferred.resolve({
                                data: temp
                            })
                    },
                    function(error){
                        console.log(error.message);
                        defferred.reject(error.message);
                    });
                });
            return defferred.promise;
        },

        cardInfo: function(type, card_id){
            var defferred = $q.defer();
            var query = "SELECT card_id, user_has_card_id, date_end, image, name, points_balance, rebates_balance, card_type, ct FROM card_infos WHERE card_type = ? AND card_id = ?";
            $rootScope.ipayu_db.transaction(function(transaction) {
                transaction.executeSql(query, [type, card_id],
                    function (tx, result) {
                        console.log(result);
                        if(result.rows.length == 0){
                            defferred.resolve({
                                data: []
                            })
                        }
                        else{
                            defferred.resolve({
                                data: result.rows.item(0)
                            })
                        }
                    },
                    function(error){
                        console.log(error.message);
                        defferred.reject(error.message);
                    });
            });
            return defferred.promise;
        },
    }

}

