(function() {
	'use strict';

	var app = angular.module('WeatherMeme');

	app.controller('MainController', ['$scope', '$q', 'WeatherService', function($scope, $q, WeatherService) {
		$scope.location = '';

		$scope.getTodays = function() {
			var promise = WeatherService.getTodaysForecast($scope.location);

			promise.then(function(data) {
				console.log(data);
			});

		}

	}]);

})();