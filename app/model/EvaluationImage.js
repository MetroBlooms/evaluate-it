Ext.require(['EvaluateIt.model.Site','EvaluateIt.model.Evaluator']);

Ext.define('EvaluateIt.model.EvaluationImage', {
    extend: 'Ext.data.Model',
 
    config: {
        idProperty: 'id', // use with proxy.SQL
		//identifier: 'uuid', // use with proxy.localstorage 
        fields: [
				{name: 'id', type: 'int'}, // pk
				{name: 'srcUri', type: 'string'} // local image location 
		],
        proxy: {
            type: "sql", //"localstorage",
            database: 'Test'
        },
		belongsTo: [
			{ 
			    model: 'EvaluateIt.model.Evaluation', 
			   	name: 'evaluation',
				foreignKey: 'evaluation_id',
      			foreignStore: 'Evaluations'
			}
		]
	}
});


