var express = require('express');
var router = express.Router();
var fs = require('fs');
/*
var getCore = require('../public/modules/RDF-REST.JS/src/cores/factory.js').getCore;
var graph = require('../public/modules/RDF-REST.JS/src/graph.js').graph;
var iri = require('../public/modules/RDF-REST.JS/src/rdfnode.js').iri;
var namespace = require('../public/modules/RDF-REST.JS/src/rdfnode.js').namespace;
var nt = require('../public/modules/RDF-REST.JS/src/serializers/nt.js').nt;
require('../public/modules/RDF-REST.JS/src/parsers/debug.js');
require('../public/modules/RDF-REST.JS/src/serializers/jsonld.js');
*/

// The list of functionalities in the server
listFunctionalities = [];

// SERVICES
// HomePage
router.get('/', function(request, response, next) {
	response.render('index', {title: 'Avatar Architecture'});
});

// GET the CIMA object information
router.get('/cima/:nameAvatar', function(request, response, next) {
	var resource = __dirname + '/../public/resources/data/data_' + request.params.nameAvatar + '.jsonld';
	responseServer(resource, response);
	return true;
});

// GET the context of an avatar
router.get('/context/:nameAvatar', function(request, response, next) {
	var resource = __dirname + '/../public/resources/contexts/' + request.params.nameAvatar + '.jsonld';
	responseServer(resource, response);
	return true;
});

// GET the information of a capability
router.get('/capabilities/:capability', function(request, response, next) {
	var resource = __dirname + '/../public/resources/capabilities/' + request.params.capability + '.json';
	responseServer(resource, response);
	return true;
});

// GET the information of a functionality
router.get('/functionalities/:functionality', function(request, response, next) {
	var resource = __dirname + '/../public/resources/functionalities/' + request.params.functionality + '.json';
	responseServer(resource, response);
	return true;
});

// GET the list of functionalities from a repository
router.get('/find-functionalities/:capabilities', function(request, response, next) {
    var functionalitiesResponse = { "functionalities" : [] }; 
	var capabilitiesArray = request.params.capabilities.split(",");
	var resource = __dirname + '/../public/resources/repository/functionalities.jsonld';
		fs.readFile(resource, 'utf8', function (error, data) {
		if (!error) {
			data = JSON.parse(data);
			var result;
			var context = data['@context'].asawoo;
			var contextFunctionality = context + 'Functionality';
			var contextIsImplementedBy = context + 'isImplementedBy';
			for(var i=0; i<data['@graph'].length; i++) {
				var idEleGraph = (data['@graph'][i])['@id'];
				var typeEleGraph = (data['@graph'][i])['@type'];
				var isFunctionality = false;
				if (typeEleGraph) {				
					for (var t=0; t<typeEleGraph.length; t++) {
						if (typeEleGraph[t]==contextFunctionality) {
							isFunctionality = true;
						}
					}
					if (isFunctionality) {
						var functionalityFound = data['@graph'][i];
						var functionalityIsImplementedBy = functionalityFound[contextIsImplementedBy];
						if (functionalityIsImplementedBy) {
							for(var j=0; j<capabilitiesArray.length; j++) {
								if (functionalityIsImplementedBy['@id'] == context + capabilitiesArray[j]) {
									// The functionality that implements the capability with the idElementGraph has been found
									functionalitiesResponse.functionalities.push(functionalityFound);
								}
							}
						}
					}
				}
			}
			response.send(functionalitiesResponse);
		} else {
			console.log('Error: ' + error);
			response.send(functionalitiesResponse);
		}
	});
	return true;
});

// POST to expose the functionalities of an avatar
// We add them to our application, more speficially to our listFunctionalitites
router.post('/expose-functionalities', function(request, response, next) {
	response.send(listFunctionalities);
	return true;
});

router.post('/expose-functionalities/:av', function(request, response, next) {
	var param = request.params.av.split(",");
	addFunctionalities(param);
	response.send(listFunctionalities);
	return true;
});

// GET a functionality if it exists (variable: listFunctionalities)
// It searchs for it in the server and then shows the information
// in the  /resources/functionalities directory
router.get('/functionalities-server/:functionality', function(request, response, next) {
	var param = request.params.functionality;
	if (contains(param)) {
		var resource = __dirname + '/../public/resources/functionalities/' + param + '.json';
		responseServer(resource, response);
	} else {
		response.send("The functionality doesn't exist");
	}
	return true;
});

// GET list of functionalities that exists (variable: listFunctionalities)
router.get('/functionalities-server', function(request, response, next) {
	response.send(listFunctionalities);
	return true;
});



// FUNCTIONS
// Checks if a functionality exists in the server
var contains = function(item) {
	for (var i=0; i<listFunctionalities.length; i++){
		if (listFunctionalities[i] === item)
			return true;
	}
	return false;
}

// Add a list of functionalities to the list in the server
var addFunctionalities = function(functionalities) {
	console.log(111);
	console.log(functionalities);
	for (var i=0; i<functionalities.length; i++){
		for (var j=0; j<listFunctionalities.length; j++) {
			if (functionalities[i] == listFunctionalities[j])
				break;
		}
		if (j==listFunctionalities.length) {
			listFunctionalities.push(functionalities[i]);
		}
	}
}

// Checl for a file in the server and create the response with it
var responseServer = function(resource, response) {
	fs.readFile(resource, 'utf8', function (error, data) {		
		if (!error) {
			data = JSON.parse(data);
			response.writeHead(200, {"Content-Type": "application/json"});
			response.end(JSON.stringify(data));
		} else {
			console.log('Error: ' + error);
			response.writeHead(404);
			response.end('404 Not Found');
		}
	});
}

module.exports = router;