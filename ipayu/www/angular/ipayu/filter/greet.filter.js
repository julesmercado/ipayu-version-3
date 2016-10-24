

(function () {

  'use strict';

  var modules = [];

  angular
    .module('filter.greet', modules)
    .filter('greet', GreetFltr)


  // GreetFltr.$inject = ['$scope', '$rootScope', 'flags'];

  function GreetFltr() {

    return function(input) {
      if (input < 12) {
        return 'Good Morning';
      } else if (input >= 12 && input <= 17) {
        return 'Good Afternoon';
      } else if (input > 17 && input <= 24) {
        return 'Good Evening';
      } else {
        return "Good Day";
      }
    }

  }


})();