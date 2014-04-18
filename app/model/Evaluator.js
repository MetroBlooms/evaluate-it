Ext.define('EvaluateIt.model.Evaluator', {
    extend: 'Ext.data.Model',
    
    config: {
        idProperty: 'id',
        fields: [
            {name: 'id', type: 'int'}, // pk
            {name: 'remoteEvaluatorId', type: 'int'}, // linking id to remote JSON
            {name: 'firstName', type: 'auto'},
            {name: 'lastName', type: 'auto'},
	    	{name: 'email', type: 'auto'}
        ],
        proxy: {
            type: "sql",
            database: 'Test'
        },
	    associations:
		[
			{
                type: 'hasOne',
				model: 'EvaluateIt.model.Evaluation', 
				name: 'evaluation'
			}
		]

    }
});
