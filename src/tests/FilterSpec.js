describe('Filters', function() {
	beforeEach(module('WeatherMeme'));
	beforeEach(module('ngAnimate'));

	describe('Kelvin To Celsius', function() {
		it('Should convert Kelvin to Celsius', inject(function(kelvinToCelsiusFilter) {
			expect(kelvinToCelsiusFilter(275.09)).toEqual(2);
		}));
	});

	describe('Kelvin to Fahrenheit', function() {
		it('Should convert Kelvin to Fahrenheit', inject(function(kelvinToFahrenheitFilter) {
			expect(kelvinToFahrenheitFilter(275.09)).toEqual(35);
		}));
	});

	describe('Wind direction', function() {
		it('should give a wind direction from degrees', inject(function(windDirectionFilter) {
			expect(windDirectionFilter(0)).toBe('N');
			expect(windDirectionFilter(180)).toBe('S');
			expect(windDirectionFilter(34)).toBe('NE');
		}));
	});

	describe('mps to MPH conversion', function() {
		it('should convert meters per second to miles per hour', inject(function(mpsToMphFilter) {
			expect(mpsToMphFilter(1)).toBe('2 MPH');
		}));
	});
});