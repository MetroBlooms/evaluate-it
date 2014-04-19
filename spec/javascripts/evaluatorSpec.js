describe('EvaluateIt.model.Evaluator', function(){
	it('exists', function() {
		var model = Ext.create('EvaluateIt.model.Evaluator');
		expect(model.$className).toEqual('EvaluateIt.model.Evaluator');
	});

	it('has data', function() {
		var model = Ext.create('EvaluateIt.model.Evaluator', {
			remoteEvaluatorId: 1,
			firstName: 		   'gabriel',
			lastName: 		   'marquez',
			email: 			   'marquez@example.com'
		});
		expect(model.get('remoteEvaluatorId')).toEqual(1);
		expect(model.get('firstName')).toEqual('gabriel');
		expect(model.get('lastName')).toEqual('marquez');
		expect(model.get('email')).toEqual('marquez@example.com');
	});
});