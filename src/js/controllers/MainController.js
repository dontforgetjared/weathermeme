(function() {
	'use strict';

	var app = angular.module('WeatherMeme');

	app.controller('MainController', ['$scope', '$q', '$timeout', 'WeatherService', 'LocationService', 
		function($scope, $q, $timeout, WeatherService, LocationService) {
			$scope.loc = '';
			$scope.cityName = '';
			$scope.showForm = true;
			$scope.contentLoaded = false;
			$scope.curForecast = {};
			$scope.weeklyForecast = {};
			$scope.clock = '';
			$scope.interval = 1000;

			var dateTime = function() {
				$scope.clock = Date.now();
				$timeout(dateTime, $scope.interval);
			};

			$scope.getByCityName = function() {
				var loc = LocationService.getLatLng($scope.cityName);

				loc.then(function(data) {
					var forecast = WeatherService.getForecast(data.k, data.D);
					forecast.then(function(res) {
						$scope.curForecast = res.currently;
						$scope.weeklyForecast = res.daily;
						$scope.contentLoaded = true;
					});
				});
			};

			//$scope.getByCityName();
			$timeout(dateTime, $scope.interval);
		}
	]);

})();