(function() {
	'use strict';

	var app = angular.module('WeatherMeme');

	app.constant('API_KEY', '788b84c9e9ab097698b4b16a6bb18704');
	app.constant('WEATHER_API', 'http://api.openweathermap.org/data/2.5/');

	app.factory('WeatherService', ['$http', '$q', 'API_KEY', 'WEATHER_API', function($http, $q, API_KEY, WEATHER_API) {
		return {		
			getTodaysByCity: function(cityName) {
				var deferred = $q.defer();

				$http.get(WEATHER_API + 'weather?q=' + encodeURI(cityName) + '&APPID=' + API_KEY)
					.success(function(res) {
						var status = res.cod;
						if(status == 200) {
							deferred.resolve(res);
						}
					}).error(function(error) {
						deferred.reject(error);
					});

				return deferred.promise;
			},

			getForecastByCity: function(cityName) {
				var deferred = $q.defer();

				$http.get(WEATHER_API + 'forecast/daily?q=' + encodeURI(cityName) + '&cnt=7&APPID=' + API_KEY)
					.success(function(res) {
						var status = res.cod;
						if(status == 200) {
							deferred.resolve(res);
						}
					}).error(function(error) {
						deferred.reject(error);
					});

				return deferred.promise;
			},

			getTodaysByLocation: function(location) {
				var deferred = $q.defer();

				$http.get(WEATHER_API + 'weather?' + encodeURI(location) + '&APPID=' + API_KEY)
					.success(function(res) {
						var status = res.cod;
						if(status == 200) {
							deferred.resolve(res);
						}
					}).error(function(error) {
						deferred.reject(error);
					});

				return deferred.promise;
			},

			getForecastByLocation: function(location) {
				var deferred = $q.defer();
				$http.get(WEATHER_API + 'forecast/daily?' + encodeURI(location) + '&cnt=7&APPID=' + API_KEY)
					.success(function(res) {
						var status = res.cod;
						if(status == 200) {
							deferred.resolve(res);
						}
					}).error(function(error) {
						deferred.reject(error);
					});

				return deferred.promise;
			} 
		}
	}]);
})();