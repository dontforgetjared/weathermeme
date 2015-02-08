describe('Controllers', function() {
	beforeEach(module('WeatherMeme'));
	beforeEach(module('ngAnimate'));

	var $controller,
		scope,
		q,
		locSrvc,
		position;

	beforeEach(inject(function(_$q_, _$controller_, _$rootScope_, LocationService, WeatherService) {
		q = _$q_;
	    locSrvc = LocationService;
	    weatherSrvc = WeatherService;
	    $controller = _$controller_;
	    scope = _$rootScope_.$new();
	}));

	describe('MainController', function() {
		beforeEach(function() {
			$controller('MainController', {$scope: scope});
		});

		beforeEach(function() {
			spyOn(navigator.geolocation,"getCurrentPosition").and.callFake(function() {
		        position = { coords: { latitude: 40.014986, longitude: -105.270546 } };
		        arguments[0](position);
            });	

            spyOn(weatherSrvc, 'getTodaysByLocation').and.callFake(function() {
            	var deferred = q.defer();
            	deferred.resolve({someFake: 'today'});
            	return deferred.promise;
            });

            spyOn(weatherSrvc, 'getForecastByLocation').and.callFake(function() {
            	var deferred = q.defer();
            	deferred.resolve({someFake: 'weekly'});
            	return deferred.promise;
            });

            spyOn(weatherSrvc, 'getTodaysByCity').and.callFake(function() {
            	var deferred = q.defer();
            	deferred.resolve({someFake: 'todaysByCity'});
            	return deferred.promise;
            });

            spyOn(weatherSrvc, 'getForecastByCity').and.callFake(function() {
            	var deferred = q.defer();
            	deferred.resolve({someFake: 'weeklyByCity'});
            	return deferred.promise;
            });

		});

		describe('Get the forecast by location', function() {
			it('should get the forecast by location', function() {
				scope.getByLocation();
				scope.$digest();
				expect(scope.todaysForecast.someFake).toBe('today');
				expect(scope.weeklyForecast.someFake).toBe('weekly');
			});
		});

		describe('Get the forecast by city name', function() {
			it('should get the forecast by city name', function() {
				scope.getByCityName();
				scope.$digest();
				expect(scope.todaysForecast.someFake).toBe('todaysByCity');
				expect(scope.weeklyForecast.someFake).toBe('weeklyByCity');
			});
		});

	});

});