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
	
	describe("forecast by location", function() {
		it("should get the forecast by location", function() {
			httpBackend.when("GET", "//jsonp.nodejitsu.com/?url=https://api.forecast.io/forecast/" + apiKey + "/40.0394514,-105.0621818")
	  			.respond({timezone: "America/Denver"});	

	  		var forecast = weatherSrvc.getForecast("40.0394514", "-105.0621818");
	  		httpBackend.flush();
	  		expect(forecast.$$state.value.timezone).toBe("America/Denver");
		});
	});

});