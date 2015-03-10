angular.module('ApplianceCommunicationManager').factory('ApplianceCommunicationManager', 
    ['CimaObject',    
    function(CimaObject) {

    var ApplianceCommunicationManager = function(nameAvatar){
        this.nameAvatar = nameAvatar;
        this.capabilities = [];
        this.contextValues = ['contextValue1','contextValue2','contextValue3'];
    };

    // Getters
    ApplianceCommunicationManager.prototype.getCimaObject = function()  {
        return this.cimaObject;
    };

    ApplianceCommunicationManager.prototype.getCapabilities = function()  {
        return this.capabilities;
    }

    ApplianceCommunicationManager.prototype.getContextValues = function()  {
        return this.contextValues;
    }

    // Load the information of the CIMA Object and store the capabilities and functionalities
    ApplianceCommunicationManager.prototype.loadCimaObject = function()  {
        var self = this;
        promiseCimaObject = CimaObject.get({data:self.nameAvatar}, function() {
                                console.log("INFO: 1.1.1 - Storing and formatting the capabilities of the object in the Appliance Communication Manager :");
                                if (promiseCimaObject.object && promiseCimaObject.object[0] && promiseCimaObject.object[0].capabilities) {
                                    self.cimaObject = promiseCimaObject.object[0];
                                    self.fillInformation();
                                    console.log("Capabilities: ");
                                    console.log(self.capabilities);
                                } else {
                                    self.cimaObject = new CimaObject();
                                    console.log("The CIMA Object reference has no capabilities");
                                }
                            });
        return promiseCimaObject;
    };

    // Load the information of the CIMA Object and store the capabilities
    ApplianceCommunicationManager.prototype.fillInformation = function()  {
        var self = this;
        var triples = self.cimaObject.capabilities; 
        for(var i=0; i<triples.length; i++) {
            if (self.isCapability(triples[i])) {
                self.capabilities.push(triples[i]['@id']);
            }
        }
    }

    // Check if a triple is a capability
    ApplianceCommunicationManager.prototype.isCapability = function(triple)  {
        if (triple['@type']) {
            for(var i=0; i<triple['@type'].length; i++) {
                if (triple['@type'][i] == "http://www.asawoo.com/functionality#Capability") {
                    return true;
                }
            }
        }
        return false;
    }

    return ApplianceCommunicationManager;

}]);