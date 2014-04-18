Ext.require(['EvaluateIt.model.Site','EvaluateIt.model.Evaluator']);

Ext.define('EvaluateIt.model.EvaluationImage', {
    extend: 'Ext.data.Model',
 
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
		associations: [
			{
                type: 'belongsTo',
			    model: 'EvaluateIt.model.Evaluation', 
			   	name: 'evaluation'
            }
		]
	}
});


