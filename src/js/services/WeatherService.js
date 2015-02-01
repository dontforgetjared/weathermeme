(function() {
	'use strict';

	var app = angular.module('WeatherMeme');

	app.factory('WeatherService', ['$http', '$q', function($http, $q) {
		return {		
			getTodaysForecast: function(location) {
				var deferred = $q.defer();

				$http.get('http://api.openweathermap.org/data/2.5/weather?q=' + location)
					.success(function(data) {
						deferred.resolve(data);
					}).error(function() {
						deferred.reject('error');
					});

				return deferred.promise;
			},

			getTenDayForecast: function(location) {
				var deferred = $q.defer();

				$http.get('http://api.openweathermap.org/data/2.5/forecast?q=' + location)
					.success(function(data) {
						deferred.resolve(data);
					}).error(function() {
						deferred.reject('error');
					});

				return deferred.promise;
			}
		}
	}]);
})();