(function() {
	'use strict';

	var app = angular.module('WeatherMeme', ['ngAnimate']);

})();
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
					$scope.contentLoaded = false;
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
					$scope.contentLoaded = false;
					var curCity = LocationService.getLocationName(data.coords.latitude, data.coords.longitude);
					curCity.then(function(res) {
						$scope.cityName = res[0].address_components[2].long_name + ', ' + res[0].address_components[4].short_name;
					});

					var forecast = WeatherService.getForecast(data.coords.latitude, data.coords.longitude);
					forecast.then(function(res) {
						$timeout(dateTime, $scope.interval);
						$scope.curForecast = res.currently;
						$scope.weeklyForecast = res.daily;
						$scope.contentLoaded = true;	
					});
				}, function(error) {
					$scope.contentLoaded = false;
					$scope.cityName = 'Denver, CO';
					$scope.getByCityName();
				}); 
			};

			$scope.init();
			
		}
	]);

})();
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
(function() {
	'use strict';

	var app = angular.module('WeatherMeme');

	app.factory('LocationService', ['$q', '$window', function($q, $window) {
		return {
			getLocation: function() {
				var deffered = $q.defer();

				if ($window.navigator && $window.navigator.geolocation){
					$window.navigator.geolocation.getCurrentPosition(function(position) {
						deffered.resolve(position);
					}, function(error) {
						deffered.reject({message: error.message, code: error.code });
					});
				} else {
					deffered.reject({error: 'Geolocation failed'});
				}

				return deffered.promise;
			},

			getLocationName: function(lat, lng) {
				var deffered = $q.defer();
				var reverseGeocode = new google.maps.LatLng(lat, lng);
				var geocoder = new google.maps.Geocoder();
				geocoder.geocode({'latLng': reverseGeocode}, function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						deffered.resolve(results);
					} else {
						deffered.reject(status);
					}
				});

				return deffered.promise;
			},

			getLatLng: function(cityName) {
				var deffered = $q.defer();
				var geocoder = new google.maps.Geocoder();
				geocoder.geocode({ 'address': cityName }, function(res, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						deffered.resolve(res[0].geometry.location);
					} else {
						deffered.reject(status);
					}
				});

				return deffered.promise;
			}
		}
	}]);
})();
(function() {
	'use strict';

	var app = angular.module('WeatherMeme');

	app.constant('API_KEY', '86b4ed42d8cbf4a2923a4f187bd839f1');
	app.constant('WEATHER_API', 'https://api.forecast.io/forecast/');

	app.factory('WeatherService', ['$http', '$q', 'API_KEY', 'WEATHER_API', function($http, $q, API_KEY, WEATHER_API) {
		return {		
			getForecast: function(lat, lon) {
				var deffered = $q.defer();

				$http.get('//jsonp.nodejitsu.com/?url=' + encodeURI(WEATHER_API + API_KEY + '/' + lat + ',' + lon))
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