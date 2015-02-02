describe('Controllers', function() {
	beforeEach(module('WeatherMeme'));

	var $controller,
		$rootScope,
		position;

	beforeEach(inject(function(_$controller_, _$rootScope_){
	    $controller = _$controller_;
	    $rootScope = _$rootScope_;
	}));

	describe('MainController', function() {

		describe('Geting Location from geolocation api', function() {

			// beforeEach(function() {
			// 	spyOn(navigator.geolocation,"getCurrentPosition").and.callFake(function() {
			//         position = { coords: { latitude: 40.014986, longitude: -105.270546 } };
			// 	    return position;
	  //           });
			// });

			// it('Should return users long and lat', function() {
			// 	var scope = {};
	  //           var controller = $controller('MainController', {$scope: scope}); 
	            
	  //           scope.getLocation();
	  //           $rootScope.$digest();
	  //           expect(scope.loc).toBe('lat=40.014986&lon=-105.270546');
			// });
		});

	});

});