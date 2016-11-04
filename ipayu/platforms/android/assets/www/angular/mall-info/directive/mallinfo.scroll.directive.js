

var modules = [ ]; /*, 'offline'*/



mallInfo.directive("scroll", function ($window) {
    return function(scope, element, attrs) {

        var raw = element[0];

            element.bind('scroll', function () {
            	var max = 1;
                var scrollTop = (element.scrollTop() <= 99)?element.scrollTop():99
                	scrollTop = (scrollTop/10);
                	scrollTop = scrollTop.toString().substr(0,1);
                var sub = "."+scrollTop;
                var opacity = max - sub;
                $("#fade-on-scroll").css("opacity", opacity);
            });
    };
});
