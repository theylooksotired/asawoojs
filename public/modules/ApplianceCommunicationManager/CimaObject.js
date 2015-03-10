angular.module('ApplianceCommunicationManager').factory('CimaObject',
	['$resource',
	function($resource){
		return $resource('resources/data/:data.jsonld', {data: '@id'});
	}
]);