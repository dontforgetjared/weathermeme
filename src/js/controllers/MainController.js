(function() {
	'use strict';

	var app = angular.module('WeatherMeme');

	app.controller('MainController', ['$scope', '$q', '$timeout', 'WeatherService', 'LocationService', 
		function($scope, $q, $timeout, WeatherService, LocationService) {
			$scope.loc = '';
			$scope.cityName = '';
			$scope.showForm = false;
			$scope.contentLoaded = false;
			$scope.todaysForecast = {};
			$scope.weeklyForecast = {};
			$scope.clock = '';
			$scope.interval = 1000;

			var dateTime = function() {
				$scope.clock = Date.now();
				$timeout(dateTime, $scope.interval);
			};

			$timeout(dateTime, $scope.interval);

			$scope.getByLocation = function() {
				if ('geolocation' in navigator) {
					var promise = LocationService.getLocation();

					promise.then(function(data) {
						$scope.loc = 'lat=' + data.coords.latitude + '&lon=' + data.coords.longitude;

						WeatherService.getTodaysByLocation($scope.loc)
							.then(function(todaysForecast) {
								$scope.todaysForecast = todaysForecast;
								$scope.contentLoaded = true;

								WeatherService.getForecastByLocation($scope.loc)
									.then(function(weeklyForecast) {
										$scope.weeklyForecast = weeklyForecast;
									}, function(error) {
										console.log(error);
									});

							}, function(error) {
								console.log(error);
							});

						

					}, function(error) {
						//show location form
						$scope.showForm = true;
						console.log(error);
					});
				} else {
					//show location form
					$scope.showForm = true;
				}
			};

			$scope.getByCityName = function() {
				WeatherService.getTodaysByCity($scope.cityName)
					.then(function(todaysForecast) {
						$scope.todaysForecast = todaysForecast;
						$scope.contentLoaded = true;

						WeatherService.getForecastByCity($scope.cityName)
							.then(function(weeklyForecast) {
								$scope.weeklyForecast = weeklyForecast;
							}, function(error) {
								console.log(error);
							});	
					}, function(error) {
						console.log(error);
					});
			};

			$scope.getByLocation();
		}
	]);

})();