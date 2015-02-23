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