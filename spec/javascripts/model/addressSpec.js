describe('EvaluateIt.model.Address', function() {
	it('exists', function() {
		var model = Ext.create('EvaluateIt.model.Address');
		expect(model.$className).toEqual('EvaluateIt.model.Address');
	});

	it('has data', function() {
		var model = Ext.create('EvaluateIt.model.Address', {
			id: 	 1,
			address: '123 Main St',
			city: 	 'Minneapolis',
			state: 	 'MN',
			zipcode: '55555',
			county:  'Hennepin'
		});
		expect(model.get('id')).toEqual(1);
		expect(model.get('address')).toEqual('123 Main St');
		expect(model.get('city')).toEqual('Minneapolis');
		expect(model.get('state')).toEqual('MN');
		expect(model.get('zipcode')).toEqual('55555');
		expect(model.get('county')).toEqual('Hennepin');
	});
});