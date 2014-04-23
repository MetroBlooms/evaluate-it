Ext.define('EvaluateIt.model.Evaluator', {
    extend: 'EvaluateIt.model.BaseModel',
    
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
                type: 'hasMany',
				model: 'EvaluateIt.model.Evaluation',
				name: 'evaluation',
                primaryKey: 'id',
                foreignStore: 'Evaluations'
			}
		]

    }
});
