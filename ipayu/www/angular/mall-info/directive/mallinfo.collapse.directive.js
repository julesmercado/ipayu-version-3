mallInfo.directive('collapseDirective', [
	function collapseDirective(){

		return{
			"restrict": "A",
			"scope": true,
			"link": function onLink ( scope , element , atrributeSet ) {
				scope.isCollapsed = false;

			    scope.mainText = "You can, of course, use your own text, and not just the Lorem ipsum text. Make sure your IMG code is above the first P tag, however.Save your work and view the results in your browserasdfasdIMG code is above the first P tag, however.Save your work and view the results in your browser asdfasd";
			    scope.text = truncateText( scope.mainText );


			    function truncateText( text ){
			    	if( text.length > 190 ){
			    		var cutOff = text.substring( 0 , 190 );
			    		return cutOff + "...";
			    	}
			    }

			    scope.collapseThis = function collapseThis(){
			    	scope.isNavCollapsed = true;
			    	scope.isCollapsed = !scope.isCollapsed;
			    	//collapsed change the height of <p> and use the longer original text
			    	if( scope.isCollapsed ){
			    		scope.text = scope.mainText;
			    		$(".collapser").addClass('glyphicon-chevron-up').removeClass('glyphicon-chevron-down');
			    	}else{// use the lesser text and normal <p> height
			    		scope.text = truncateText( scope.mainText );
			    		$(".collapser").addClass('glyphicon-chevron-down').removeClass('glyphicon-chevron-up');
			    	}
			    }
			}
		}

}] );