var avatar = angular.module('avatar', [
	'CapabilitiesManager',
	'ApplianceCommunicationManager',
	'LocalFunctionalitiesManager',
	'ContextManager',
	'CollaborativeFunctionalitiesManager',
	'Builder'
]);

angular.module('CapabilitiesManager', []);
angular.module('ApplianceCommunicationManager', ['ngResource']);
angular.module('LocalFunctionalitiesManager', ['ngResource']);
angular.module('ContextManager', ['ngResource']);
angular.module('CollaborativeFunctionalitiesManager', []);
angular.module('Builder', []);

avatar.controller('mainCtrl',['$scope', '$http', function ($scope, $http){
	
	$scope.getInfoFunctionalities = function(){
		$http.get('/functionalities-server').
			success(function(data, status, headers, config) {
			$scope.responseHtml = data;
		}).error(function(data, status, headers, config) {
			$scope.responseHtml = "Error: " + status;
		});
	};

	$scope.getInfoFunctionalities = function(functionality){
		$http.get('/functionalities-server/' + functionality).
			success(function(data, status, headers, config) {
			$scope.responseHtml = data;
		}).error(function(data, status, headers, config) {
			$scope.responseHtml = "Error: " + status;
		});
	};

}]);