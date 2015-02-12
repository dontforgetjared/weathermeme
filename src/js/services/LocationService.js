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
			},

			getGeo: function() {
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