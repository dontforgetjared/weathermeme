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
			spyOn(weatherSrvc, 'getForecast').and.callFake(function() {
            	var deferred = q.defer();
            	deferred.resolve({currently: {summary: 'Clear'}});
            	return deferred.promise;
            });

            spyOn(locSrvc, 'getLocation').and.callFake(function() {
            	var deferred = q.defer();
            	deferred.resolve({ latitude: 40.014986, longitude: -105.270546 });
            	return deferred.promise;
            });

            spyOn(locSrvc, 'getLatLng').and.callFake(function() {
            	var deferred = q.defer();
            	deferred.resolve({ latitude: 40.014986, longitude: -105.270546 });
            	return deferred.promise;
            });
		});

		// afterEach(function() {
		// 	scope.$apply();
		// });

// 		describe('Get the forecast by location', function() {
// 			it('should get the forecast by location', function() {
// 				scope.getByLocation();
// 				scope.$digest();
// 				expect(scope.todaysForecast.someFake).toBe('today');
// 				expect(scope.weeklyForecast.someFake).toBe('weekly');
// 			});
// 		});

		describe('Get the forecast by city name', function() {
			it('should get the forecast by city name', function() {
				scope.getByCityName();	
				scope.$digest();
				expect(scope.curForecast.summary).toBe('Clear');
			});
		});

	});

});