Ext.define('EvaluateIt.model.EvaluationImage', {
    extend: 'EvaluateIt.model.BaseModel',
    config: {
        idProperty: 'id',
        fields: [
            {name: 'id', type: 'int'}, // pk
			{name: 'srcUri', type: 'string'}, // local image location
            {name: 'evaluation_id', type: 'string'}
		],
        proxy: {
            type: 'localstorage'
        },
        belongsTo: [
			{
                model: 'EvaluateIt.model.Evaluation',
                name: 'Evaluation',
                primaryKey: 'id',
                foreignKey: 'evaluation_id',
                foreignStore: 'Evaluations'
            }
		]
	}
});


