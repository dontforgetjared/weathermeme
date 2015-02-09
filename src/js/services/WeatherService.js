(function() {
	'use strict';

	var app = angular.module('WeatherMeme');

	app.constant('API_KEY', '86b4ed42d8cbf4a2923a4f187bd839f1');
	app.constant('WEATHER_API', 'https://api.forecast.io/forecast/');

	app.factory('WeatherService', ['$http', '$q', 'API_KEY', 'WEATHER_API', function($http, $q, API_KEY, WEATHER_API) {
		return {		
			getForecastByLocation: function(lat, lon) {
				var deffered = $q.defer();

				$http.get(WEATHER_API + API_KEY + '/' + lat + ',' + lon)
					.success(function(res) {
						deffered.resolve(res);
					})
					.error(function(error) {
						deffered.reject(error);
					});

				return deffered.promise;
			}	
		}
	}]);
})();