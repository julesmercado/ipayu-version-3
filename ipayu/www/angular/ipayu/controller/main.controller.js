
mainModule.controller('mainCtrl', MainCtrl)


MainCtrl.$inject = ['$rootScope', '$timeout', 'flags', 'ngDialog', '$state', 'accountData', 'sqliteSet'];

function MainCtrl($rootScope, $timeout, flags, ngDialog, $state, accountData, sqliteSet) {


    var tOut;
    $rootScope.doLoading = false;
    function init() {
        $rootScope.headerCountries = flags.getAll();
        $rootScope.countryDisplay = flags.getCountryDisplay();
        $rootScope.countryDisplay.display = false;
        
        $rootScope.showMenu = false;
        $rootScope.hasBG = false;
        $rootScope.menuDisplayed = false;

        $rootScope.searchCountry = {
            'country' : $rootScope.countryDisplay.country
        };
    }
    init();

    $rootScope.menuSwipeLeft = function(){
        alert('Please change to toggleMenu');
    }

// Action event if state changes
    $rootScope.$on('$stateChangeSuccess', 
        function(ev, to, toParams, from, fromParams) {
            $state.previous = { route: from, routeParams: fromParams }
            ngDialog.closeAll();
            if(accountData.getUser().length == 0 && (to.name != 'login' && to.name != 'register' && to.name != 'forgot')){
                $state.go('login');
            }
            init();
    });

// Hide/Show menu
    $rootScope.toggleMenu = function(){
        $timeout.cancel(tOut);
        if(!$rootScope.menuDisplayed){
            $rootScope.menuDisplayed = true;
        }

        $rootScope.showMenu = ($rootScope.showMenu) ? false:true;
        $rootScope.hasBG = ($rootScope.hasBG) ? false:true;

        if(!$rootScope.showMenu){
            tOut = $timeout(function() {
                $rootScope.menuDisplayed = false;
            }, 900);
        }
    }

// Hide/Show country
    $rootScope.toggleShowCountry = function(){
        $rootScope.countryDisplay.display = ($rootScope.countryDisplay.display) ? false:true;
    }

// if user selects a country flag
    $rootScope.selectCountry = function(c){
        $rootScope.searchCountry.country = c.name;
        var countryDisplay = {
            'country'   : c.name,
            'flag'      : c.img,
            'name'      : c.code,
            'display'   : true
        }
        flags.setCountryDisplay(countryDisplay);
        $rootScope.countryDisplay = flags.getCountryDisplay();
    }

    $rootScope.logout = function () {
        sqliteSet.dropTable();
        localStorage.clear();
        $state.go('login');
    }

}
