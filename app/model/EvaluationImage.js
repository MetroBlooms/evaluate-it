Ext.define('EvaluateIt.model.EvaluationImage', {
    extend: 'EvaluateIt.model.BaseModel',
    config: {
        idProperty: 'id',
        fields: [
            {name: 'id', type: 'int'}, // pk
			{name: 'srcUri', type: 'string'} // local image location
		],
        proxy: {
            type: "sql",
            database: 'Test'
        },
        belongsTo: [
			{
			    model: 'EvaluateIt.model.Evaluation', 
			   	name: 'evaluation'
            }
		]
	}
});


