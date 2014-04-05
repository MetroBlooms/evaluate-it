Ext.define('EvaluateIt.model.Evaluator', {
    extend: 'Ext.data.Model',
    
    config: {
    idProperty: 'id', // use with proxy.SQL 
	// TODO: need to add require for use of uuid
	// 'Ext.data.identifier.Uuid'
	//identifier: 'uuid', // use with proxy.localstorage 
        fields: [
            {name: 'remoteEvaluatorId', type: 'int'}, // linking id to remote JSON
            {name: 'firstName', type: 'auto'},
            {name: 'lastName', type: 'auto'},
	    	{name: 'email', type: 'auto'}
        ],
        proxy: {
            type: "sql", //"localstorage",
            database: 'Test'
        },
	    hasOne:
		[
			{ 
				model: 'EvaluateIt.model.Evaluation', 
				name: 'evaluation'
			}
		]

    }
});
