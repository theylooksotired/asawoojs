angular.module('Builder').controller('builderCtrl',
	[ '$scope', 'Initialisation', '$http',
	function($scope, Initialisation, $http) { 
    
    	$scope.createAvatar = function(nameAvatar) {
            Initialisation.initFirstModule(nameAvatar);
    	};
    
    }
]);