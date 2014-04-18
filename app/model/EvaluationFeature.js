Ext.define('EvaluateIt.model.EvaluationFeature', {
    extend: 'Ext.data.Model',
    
    config: {
        idProperty: 'id',
        fields: [
            {name: 'id', type: 'int'}, // pk
            {name: 'featureType', type: 'int'} // linking id for lookup
        ],
        proxy: {
            type: "sql",
            database: 'Test'
        },
	    associations: [
            {   type: 'belongsTo',
                model: 'EvaluateIt.model.Evaluation',
                associationKey: 'evaluationId'
            }
        ]
    }
});
