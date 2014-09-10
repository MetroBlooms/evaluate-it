describe('EvaluateIt.model.Geolocation', function() {
	it('exists', function() {
		var model = Ext.create('EvaluateIt.model.Geolocation');
		expect(model.$className).toEqual('EvaluateIt.model.Geolocation');
	});

	it('has data', function() {
		var model = Ext.create('EvaluateIt.model.Geolocation', {
			latitude:  44.98,
			longitude: 93.27,
			accuracy:  10.0,
			datestamp: '2014-01-01'
		});
		expect(model.get('latitude')).toEqual(44.98);	
		expect(model.get('longitude')).toEqual(93.27);	
		expect(model.get('accuracy')).toEqual(10.0);	
		expect(model.get('datestamp')).toEqual('2014-01-01');	
	});
});