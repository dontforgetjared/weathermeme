(function() {
	'use strict';

	var app = angular.module('WeatherMeme');

	app.filter('kelvinToCelsius', function() {
		return function(kelvin) {
			var celsius = parseFloat(kelvin) - 273.15;
			return parseInt(Math.round(celsius));
		};
	});

	app.filter('kelvinToFahrenheit', function() {
		return function(kelvin) {
			var fahrenheit = 1.8 * (parseFloat(kelvin) - 273.15) + 32.00;
			return parseInt(Math.round(fahrenheit));
		}
	});

	app.filter('windDirection', function() {
		return function(degrees) {
			var val=parseInt((degrees/22.5)+.5);
			var dir =["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
			return dir[val % 16];
		}
	});

	app.filter('mpsToMph', function() {
		return function(mps) {
			var mph = parseFloat(mps) * 2.24;
			return Math.round(mph) + ' MPH';
		}
	});
})();