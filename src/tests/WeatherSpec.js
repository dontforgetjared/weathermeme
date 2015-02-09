'use strict';

describe("Weather Service", function() {

	var scope, weatherSrvc, result, $q, $scope, httpBackend, apiKey;

	beforeEach(module("WeatherMeme"));
	beforeEach(module("ngAnimate"));

	beforeEach(function() {
		inject(function($httpBackend, WeatherService, API_KEY) {
			httpBackend = $httpBackend;
			weatherSrvc = WeatherService;
			apiKey = API_KEY;
		})
	});

	// describe('Forecast by city name', function() {
	// 	it('should get todays weather by city name', function() {	
	// 		httpBackend.when('GET', 'http://api.openweathermap.org/data/2.5/weather?q=Boulder,Co&APPID=' + apiKey)
	//  			.respond({cod: 200});
	//  		var todays = weatherSrvc.getTodaysByCity('Boulder,Co');
	//  		httpBackend.flush();
	// 		expect(todays.$$state.value.cod).toBe(200);	
	// 	});

	// 	it('should get the 7 day forecast by city name', function() {			
	// 		httpBackend.when('GET', 'http://api.openweathermap.org/data/2.5/forecast/daily?q=Boulder,Co&cnt=7&APPID=' + apiKey)
	//  			.respond({cod: 200});
	//  		var tenDay = weatherSrvc.getForecastByCity('Boulder,Co');
	//  		httpBackend.flush();
	// 		expect(tenDay.$$state.value.cod).toBe(200);	
	// 	});
	// });

	// describe('Forecast by location', function() {
	// 	it('should get todays weather by city name', function() {	
	// 		httpBackend.when('GET', 'http://api.openweathermap.org/data/2.5/weather?lon=-105.0621818&lat=40.0394514&APPID=' + apiKey)
	//  			.respond({cod: 200});
	//  		var todays = weatherSrvc.getTodaysByLocation('lon=-105.0621818&lat=40.0394514');
	//  		httpBackend.flush();
	// 		expect(todays.$$state.value.cod).toBe(200);	
	// 	});	

	// 	it('should get the 7 day forecast by city name', function() {			
	// 		httpBackend.when('GET', 'http://api.openweathermap.org/data/2.5/forecast/daily?lon=-105.0621818&lat=40.0394514&cnt=7&APPID=' + apiKey)
	//  			.respond({cod: 200});
	//  		var tenDay = weatherSrvc.getForecastByLocation('lon=-105.0621818&lat=40.0394514');
	//  		httpBackend.flush();
	// 		expect(tenDay.$$state.value.cod).toBe(200);	
	// 	});
	// });
	
	describe("forecast by location", function() {
		it("should get the forecast by location", function() {
			httpBackend.when("GET", "https://api.forecast.io/forecast/" + apiKey + "/40.0394514,-105.0621818")
	  			.respond({timezone: "America/Denver"});	

	  		var forecast = weatherSrvc.getForecastByLocation("40.0394514", "-105.0621818");
	  		httpBackend.flush();
	  		expect(forecast.$$state.value.timezone).toBe("America/Denver");
		});
	});

});