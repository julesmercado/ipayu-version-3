mallInfo.directive('commentModal', [
	'$uibModal',
	'$rootScope',
	function commentModalDirective( $uibModal , $rootScope ){

		return{
			"restrict": "A",
			"scope": true,
			"link": function onLink ( scope , element , atrributeSet ) {
				scope.commentClick = function(){

					$rootScope.$broadcast( 'open-modal' );

					$uibModal.open({
					      ariaLabelledBy: 'modal-title',
					      ariaDescribedBy: 'modal-body',
					      templateUrl: '../templates/modals/comment-modal.html',
					      controller: '',
					      controllerAs: ''
					      
					    })
				}
			}
		}

}] );

