(function() {
	'use strict';

	var app = angular.module('WeatherMeme');

	app.factory('LocationService', ['$q', function($q) {
		return {
			getLocation: function() {
				var deffered = $q.defer();

				navigator.geolocation.getCurrentPosition(function(position) {
					deffered.resolve(position);
				}, function(error) {
					deffered.reject(error);
				});

				return deffered.promise;
			}
		}
	}]);
})();