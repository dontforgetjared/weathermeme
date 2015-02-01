'use strict';

describe("Weather Service", function() {

	var scope, weatherSrvc, result, $q, $scope, httpBackend;

	beforeEach(module('WeatherMeme'));

	beforeEach(function() {
		inject(function($httpBackend, _$q_, _$rootScope_, WeatherService) {
			httpBackend = $httpBackend;
			weatherSrvc = WeatherService;
			$q = _$q_;
			$scope = _$rootScope_;
		})
	});

	describe("Today's forecast service", function() {
		beforeEach(function() {
			spyOn(weatherSrvc, 'getTodaysForecast');
		});
		
		it("should call today's forecast from weather service", function() {
			weatherSrvc.getTodaysForecast('Boulder,CO');
			expect(weatherSrvc.getTodaysForecast).toHaveBeenCalled();
		});	
	});

	describe("Today's forecast Weather API call", function() {
		it("should get today's forecast json", function() {
			httpBackend.when('GET', 'http://api.openweathermap.org/data/2.5/weather?q=Boulder,Co')
	 			.respond({cod: 200});
	 		var data = weatherSrvc.getTodaysForecast('Boulder,Co');
	 		httpBackend.flush();

	 		expect(data.$$state.value.cod).toBe(200);
		});
	});

	describe("10 day forecast service", function() {
		beforeEach(function() {
			spyOn(weatherSrvc, 'getTenDayForecast');
		});
		
		it("should call ten day forecast from weather service", function() {
			weatherSrvc.getTenDayForecast('Boulder,CO');
			expect(weatherSrvc.getTenDayForecast).toHaveBeenCalled();
		});	
	});

	describe("Ten day forecast Weather API call", function() {
		it("should get the ten day forecast json", function() {
			httpBackend.when('GET', 'http://api.openweathermap.org/data/2.5/forecast?q=Boulder,Co')
	 			.respond({cod: 200});
	 		var data = weatherSrvc.getTenDayForecast('Boulder,Co');
	 		httpBackend.flush();

	 		expect(data.$$state.value.cod).toBe(200);
		});
	});

});