
(function($, undefined){

	function createDemos(){
		var aa = document.getElementById('forDateRanger');


		var date = $("<div id='date' />").appendTo(aa),
			simple = $("<div id='slider' />").appendTo(aa),
			modifiable = $("<div id='modifiable' />").appendTo(aa);

		// simple.sliderDemo();
		// date.dateSliderDemo();

		var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

		var dateNow = new Date();
		var d = dateNow.getDate();
		var m = dateNow.getMonth();
		var y = dateNow.getFullYear();

	    // bounds: {min: new Date(2012, 0, 1), max: new Date(2012, 2, 31, 12, 59, 59)},
	    // defaultValues: {min: new Date(2012, 1, 10), max: new Date(2012, 2, 22)},

		  date.dateRangeSlider({
		  	symmetricPositionning: true,
		    bounds: {min: new Date(y, m-3), max: new Date(y, m, d)},
		    defaultValues: {min: new Date(y, m-1, d), max: new Date(y, m, d)},
		    step: {days: 1},
		    scales: [{
		      first: function(value){ return value; },
		      end: function(value) {return value; },
		      next: function(value){
		        var next = new Date(value);
		        return new Date(next.setMonth(value.getMonth() + 1));
		      },
		      label: function(value){
		        return months[value.getMonth()];
		      },
		      format: function(tickContainer, tickStart, tickEnd){
		        tickContainer.addClass("myCustomClass");
		      }
		    }]
		  });

	}

	$(document).ready(function(){
		createDemos();
	});


	function getYear(date){
		var newdate = new Date(date);
	    return newdate.getFullYear();
	}
	function getMonth(date){
		var newdate = new Date(date);
	    return newdate.getMonth() + 1;
	}
	function getDay(date){
		var newdate = new Date(date);
	    return newdate.getDate();
	}

	$(document).on("valuesChanging", ".ui-rangeSlider", function(e, data){

		var min = getMonth(data.values.min)+'/'+getDay(data.values.min)+'/'+getYear(data.values.min);
		var max = getMonth(data.values.max)+'/'+getDay(data.values.max)+'/'+getYear(data.values.max);

		var minIn = $('#mindate');
		minIn.val(min);
		minIn.trigger("change");

		var maxIn = $('#maxdate');
		maxIn.val(max);
		maxIn.trigger("change");

	});


})(jQuery);
