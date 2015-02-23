(function() {
	'use strict';

	var app = angular.module('WeatherMeme');

	app.controller('MainController', ['$scope', '$q', '$timeout', 'WeatherService', 'LocationService', 
		function($scope, $q, $timeout, WeatherService, LocationService) {
			$scope.cityName = '';
			$scope.contentLoaded = false;
			$scope.curForecast = {};
			$scope.weeklyForecast = {};
			$scope.clock = '';
			$scope.interval = 1000;

			var dateTime = function() {
				$scope.clock = Date.now();
				$timeout(dateTime, $scope.interval);
			};

			$scope.init = function() {
				$scope.cityName = 'Denver, CO';
				$scope.getByCityName();
				$scope.getByLocation();
			};

			$scope.getByCityName = function() {
				var loc = LocationService.getLatLng($scope.cityName);

				loc.then(function(data) {
					var forecast = WeatherService.getForecast(data.k, data.D);
					forecast.then(function(res) {
						$timeout(dateTime, $scope.interval);
						$scope.curForecast = res.currently;
						$scope.weeklyForecast = res.daily;
						$scope.contentLoaded = true;
					});
				});
			};

			$scope.getByLocation = function() {
					var loc = LocationService.getLocation();

					loc.then(function(data) {
						var forecast = WeatherService.getForecast(data.coords.latitude, data.coords.longitude);
						forecast.then(function(res) {
							$timeout(dateTime, $scope.interval);
							$scope.curForecast = res.currently;
							$scope.weeklyForecast = res.daily;
							$scope.contentLoaded = true;	
						});

						var curCity = LocationService.getLocationName(data.coords.latitude, data.coords.longitude);
						curCity.then(function(res) {
							$scope.cityName = res[0].address_components[2].long_name + ', ' + res[0].address_components[4].short_name;
						});
					}, function(error) {
						$scope.cityName = 'Denver, CO';
						$scope.getByCityName();
					}); 
			};

			$scope.init();
			
		}
	]);

})();