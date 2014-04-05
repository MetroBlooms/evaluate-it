Ext.define('EvaluateIt.model.EvaluationFeature', {
    extend: 'Ext.data.Model',
    
    config: {
        idProperty: 'id', // use with proxy.SQL
	    //identifier: 'uuid', // use with proxy.localstorage
        fields: [
            {name: 'featureType', type: 'int'} // linking id for lookup
        ],
        proxy: {
            type: "sql", //"localstorage",
            database: 'Test'
        },
	    belongsTo: [
            {
                model: 'EvaluateIt.model.Evaluation',
                associationKey: 'evaluationId'
            }
        ]
    }
});
