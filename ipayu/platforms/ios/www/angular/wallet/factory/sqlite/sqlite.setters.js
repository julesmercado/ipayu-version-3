
walletModule.factory('sqliteSet', SqliteSetters)

SqliteSetters.$inject = ['$rootScope', '$cordovaSQLite', '$q', '$rootScope'];

function SqliteSetters($rootScope, $cordovaSQLite, $q, $rootScope) {

	$rootScope.ipayu_db = null;

    return {
    	setUpDatabase: function(){
			// $rootScope.ipayu_db = $cordovaSQLite.openDB({ name: "ipayu.db", location: 'default' });
			$rootScope.ipayu_db = window.openDatabase("ipayu.db", '1', 'ipayu', 1024 * 1024 * 100);
			if(!$rootScope.ipayu_db){
				console.log('SQLite is not supported.');
			}
			else{
				console.log('SQLite is supported.');
			}
			return;
		},

		createTable: function(){
	        var userSQL = 'CREATE TABLE IF NOT EXISTS ipayu_user (id integer primary key, first_name text, last_name text, profile_image text, email text, gender text, status_message text, country text)';
	        var mallcardSql = 'CREATE TABLE IF NOT EXISTS mall_card (id integer primary key, mall_card_id integer, image text, country text, mall_id integer, name text, date_end text, date_start text, last_used text, frequently text, mycard text)';
	        var shopcardSql = 'CREATE TABLE IF NOT EXISTS shop_card (id integer primary key, shop_card_id integer, image text, country text, shop_id integer, name text, date_end text, date_start text, last_used text, frequently text, mycard text)';

	        var cardTransactionSql = 'CREATE TABLE IF NOT EXISTS card_transactions (transaction_id integer, transaction_type text, card_id integer, balance text, image text, item_name text, mall_name text, point_value text, quantity text, r_image text, rebate text, sales_amount text, shop_name text, timestamp text, transaction_date text, type text, card_type text, rewardsgift_id text, UNIQUE(transaction_id, transaction_type, card_id))';
	        var cardRedeemSql = 'CREATE TABLE IF NOT EXISTS card_redeemables (card_id integer, asset_id text, card_type text, image text, item_name text, item_quantity text, point_value text, quantity_remaining text, rewardsgift_id text, shop_id text, UNIQUE(rewardsgift_id, card_id))';
	        var cardInfosSql = 'CREATE TABLE IF NOT EXISTS card_infos (card_id integer, user_has_card_id text, date_end text, image text, name text, points_balance text, rebates_balance text, card_type text, ct text, UNIQUE(card_type, card_id) )'

			$rootScope.ipayu_db.transaction(function(transaction) {
				transaction.executeSql(userSQL);
			    transaction.executeSql(mallcardSql);
			    transaction.executeSql(shopcardSql);
			    transaction.executeSql(cardTransactionSql);
			    transaction.executeSql(cardRedeemSql);
			    transaction.executeSql(cardInfosSql);
			},
				function (r){
					console.log('Transaction ERROR: ' + r.message);
				},
				function (){
					console.log('Table successfully created');
				}
			);
		},

		user: function(data){
			var deferred = $q.defer();
			$rootScope.ipayu_db.transaction(function(transaction) {
				var executeQuery = "INSERT OR REPLACE INTO ipayu_user (id , first_name , last_name , profile_image, email, gender, country) VALUES (?,?,?,?,?,?,?)";
				transaction.executeSql(executeQuery, [data.id, data.firstname, data.lastname, data.image, data.email, data.gender, data.code],
					function(tx, result) {
						console.log("Inserted");
						deferred.resolve(result);
					},
					function(error){
						console.log(error.message);
						deferred.reject(error.message);
					}
				);
			});
			return deferred.promise;
		},

		transaction: function(data){
			var deferred = $q.defer();
			var executeQuery = "INSERT OR REPLACE INTO card_transactions (transaction_id, transaction_type, card_id , balance, image, item_name, mall_name, point_value, quantity, r_image, rebate, sales_amount, shop_name, timestamp, transaction_date, type, card_type, rewardsgift_id) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
				$rootScope.ipayu_db.transaction(function(transaction) {
					transaction.executeSql(executeQuery, [data.transaction_id, data.type, data.card_id, data.balance, data.image, data.item_name, data.mall_name, data.point_value, data.quantity, data.r_image, data.rebate, data.sales_amount, data.shop_name, data.timestamp, data.transaction_date, data.type, data.card_type, data.rewardsgift_id],
						function(tx, result) {
							console.log("Inserted");
							deferred.resolve(result);
						},
						function(error){
							deferred.reject(error.message);
							console.log(error.message);
						}
					);
				});
			return deferred.promise;
		},
		redeemables: function(data){
			var deferred = $q.defer();
			
				$rootScope.ipayu_db.transaction(function(transaction) {
					var executeQuery = "INSERT OR REPLACE INTO card_redeemables (card_id, asset_id, card_type, image, item_name, item_quantity, point_value, quantity_remaining, rewardsgift_id, shop_id) VALUES(?,?,?,?,?,?,?,?,?,?)";
					transaction.executeSql(executeQuery, [data.card_id, data.asset_id, data.card_type, data.image, data.item_name, data.item_quantity, data.point_value, data.quantity_remaining, data.rewardsgift_id, data.shop_id],
						function(tx, result) {
							console.log("Inserted");
							deferred.resolve(result);
						},
						function(error){
							deferred.reject(error.message);
							console.log(error.message);
						}
					);
				});
			return deferred.promise;
		},
		cardInfo: function(data){
			var deferred = $q.defer();
			$rootScope.ipayu_db.transaction(function(transaction) {
					var executeQuery = "INSERT OR REPLACE INTO card_infos (card_id, user_has_card_id, date_end, image, name, points_balance, rebates_balance, card_type, ct) VALUES(?,?,?,?,?,?,?,?,?)";
					transaction.executeSql(executeQuery, 
						[
							data.card_id, data.user_has_card_id, data.date_end, data.image, data.name, 
							data.points_balance, data.rebates_balance, data.card_type, data.ct
						],
						function(tx, result) {
							console.log("Inserted");
							deferred.resolve(result);
						},
						function(error){
							console.log(error.message);
							deferred.reject(error.message);
						}
					);
				});
			return deferred.promise;
		},

		dropTable: function(){
			user_info = false;
			mallcards = false;
			var userSQL = "DROP TABLE IF EXISTS ipayu_user";
			var mallcardSql = "DROP TABLE IF EXISTS mall_card";
			var shopcardSql = "DROP TABLE IF EXISTS shop_card";
			var card_redeemables = "DROP TABLE IF EXISTS card_redeemables";
			var card_transactions = "DROP TABLE IF EXISTS card_transactions";
			var card_infos = "DROP TABLE IF EXISTS card_infos";

			$rootScope.ipayu_db.transaction(function(transaction) {
				transaction.executeSql(userSQL);
			    transaction.executeSql(mallcardSql);
			    transaction.executeSql(shopcardSql);
			    transaction.executeSql(card_transactions);
			    transaction.executeSql(card_redeemables);
			    transaction.executeSql(card_infos);
			},
				function (r){
					console.log('Transaction ERROR: ' + r.message);
				},
				function (){
					console.log('Table successfully dropped');
				}
			);
		},
    }

}
