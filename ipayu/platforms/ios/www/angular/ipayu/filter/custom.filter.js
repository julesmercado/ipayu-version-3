
mainModule.filter('greet', GreetFltr)
mainModule.filter('dashboardfilter', DashboardFilter)


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

function DashboardFilter(){
    return function (input, country){
        if(input.length == 0)
            return input;
        
        var temp = [];
        for(var i in input){
            if(input.hasOwnProperty(i) && input[i].country == country){
                temp.push(input[i]);
                if(temp.length == 3){
                    return temp;
                }
            }
        }
        return temp;
    }
}