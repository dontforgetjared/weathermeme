describe("Location Service", function() {
	var locSrvc, $q, $rootScope, position;

	beforeEach(module('WeatherMeme'));
	beforeEach(module('ngAnimate'));

	beforeEach(function() {
		inject(function(_$q_, _$rootScope_, LocationService) {
			locSrvc = LocationService;
			$q = _$q_;
			$rootScope = _$rootScope_.$new();
		})
	});

	describe("Geo location", function() {
		it('should call getLocation()', function() {
			spyOn(locSrvc, 'getLocation');
			locSrvc.getLocation();
			expect(locSrvc.getLocation).toHaveBeenCalled();
		});	

		it("should return a users lon and lat", function() {	
			spyOn(navigator.geolocation,"getCurrentPosition").and.callFake(function() {
		        position = { coords: { latitude: 40.014986, longitude: -105.270546 } };
		        arguments[0](position);
            });		
			
			var promise = locSrvc.getLocation();
			
			promise.then(function(data) {
				expect(data.coords.latitude === 40.014986 && data.coords.longitude === -105.270546).toBeTruthy();
			});

			$rootScope.$digest();
		});
	});
});