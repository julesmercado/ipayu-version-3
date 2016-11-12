
    mallInfo.controller( 'modalComments', 
        function( $scope , mallData , $rootScope , mallCardFactory2 , accountData, $uibModalInstance ){ /* , offlineData*/
            
            $scope.comment_length = 0;
            
            $scope.$watch( function(){
            	return mallData.setMallCard()
            }, function( newValue , oldValue ){
            	getComment( newValue );
            } )

            $rootScope.$on( 'open-modal' , function( evt, data ){
                mallCardFactory2.getComments( data ).then( function( response ){
                    $scope.comments = response.data;
                } );
            } );

            $scope.postComments = function(){
            	var data = mallData.setMallCard();
            	var user = accountData.getUser();
            	var date = new Date();
                if( $scope.commentModel ){
                    mallCardFactory2.postComments( data.asset_event_id , user.ipayu_id , $scope.commentModel , Date.parse(date) ).then( function( response ){
                        $scope.commentModel = "";
                        getComment( data );
                    } );
                }
            	
            }
            
            $scope.closeModal = function(){
                 $uibModalInstance.close();
            }
            
            function scrollToBottom(){
                var pos = document.getElementById("comments-container-box").scrollHeight;
                $("#comments-container-box").animate({
                    scrollTop : pos
                }, { duration: 'medium', easing: 'swing' });
            }

            function getComment( value ){
            	mallCardFactory2.getComments( value ).then( function( response ){
                    $scope.comments = response.all.data || [];
                    $scope.comment_length = $scope.comments.length;
                    setTimeout(function(){scrollToBottom();}, 10)
                    $rootScope.$broadcast('get_events');
                });
            }
    } )
    
    