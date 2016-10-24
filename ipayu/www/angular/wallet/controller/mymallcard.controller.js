

var modules = [];

walletModule.controller('myMallCardCtrl', MyMallCardCtrl)


MyMallCardCtrl.$inject = ['$scope'];

function MyMallCardCtrl($scope) {
	console.log("hi");
}
