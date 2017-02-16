angular
	.module('countryApp.services', [])
	.constant('resourceUrl', 'https://restcountries.eu/rest/v1/all')
	.factory('listFactory', listFactory)

	function listFactory($resource, resourceUrl) {
		return $resource(resourceUrl)
	}