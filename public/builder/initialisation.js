angular.module('Builder').service('Initialisation',
    ['serviceApplianceCommunicationManager', 'serviceCapabilitiesManager', 'serviceLocalFunctionalitiesManager', 'serviceContextManager', 'serviceCollaborativeFunctionalitiesManager',
    function(serviceApplianceCommunicationManager, serviceCapabilitiesManager, serviceLocalFunctionalitiesManager, serviceContextManager, serviceCollaborativeFunctionalitiesManager) {

		this.initFirstModule = function(nameAvatar) {
            console.log("INFO: 1.1 - Appliance Communication Manager - Initialization");
			serviceApplianceCommunicationManager.init(nameAvatar);
		};

		initSecondModule = function(nameAvatar){    		
            console.log("INFO: 1.2 - Capabilities Manager - Initialization");
            serviceCapabilitiesManager.init(nameAvatar);
        };

        initThirdModule = function(nameAvatar){
            console.log("INFO: 1.3 - Context Manager - Initialization");
        	serviceContextManager.init(nameAvatar);
        };

        initFourthModule = function(nameAvatar){
            console.log("INFO: 1.4 - Local Functionalities Manager - Initialization");
            serviceLocalFunctionalitiesManager.init(nameAvatar);
        };

        initFifthModule = function(nameAvatar){
            console.log("INFO: 1.5 - Collaborative Functionalities Manager - Initialization");
            serviceCollaborativeFunctionalitiesManager.init(nameAvatar);
        };

	}
]);