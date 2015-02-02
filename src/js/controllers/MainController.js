(function() {
	'use strict';

	var app = angular.module('WeatherMeme');

	app.controller('MainController', ['$scope', '$q', 'WeatherService', 'LocationService', function($scope, $q, WeatherService, LocationService) {
		$scope.loc = '';
		$scope.position;

		$scope.getLocation = function() {
			if ('geolocation' in navigator) {
				console.log('foo');
				var promise = LocationService.getLocation();

				promise.then(function(data) {
					console.log(data);
				}, function(error) {
					console.log(error);
				});
			} else {
				console.log('bar');
				$scope.loc = '';
			}
		};

		$scope.getTodays = function() {
			var promise = WeatherService.getTodaysForecast($scope.loc);

			promise.then(function(data) {
				console.log(data);
			});

		};

		$scope.getLocation();
	}]);

})();