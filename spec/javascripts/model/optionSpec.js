describe('EvaluateIt.model.Option', function(){
	it('exists', function() {
		var model = Ext.create('EvaluateIt.model.Option');
		expect(model.$className).toEqual('EvaluateIt.model.Option');
	});

	it('has data', function() {
		var model = Ext.create('EvaluateIt.model.Option', {
			id: 	     1,
			category:    'garden',
			text: 	     'text',
			source:      'source',
			animation:   'na',
			limit:       1,
			preventHide: true,
			view:        'view'
		});
		expect(model.get('id')).toEqual(1);
		expect(model.get('category')).toEqual('garden');
		expect(model.get('text')).toEqual('text');
		expect(model.get('source')).toEqual('source');
		expect(model.get('animation')).toEqual('na');
		expect(model.get('limit')).toEqual(1);
		expect(model.get('preventHide')).toBeTruthy();
		expect(model.get('view')).toEqual('view');
	});
});