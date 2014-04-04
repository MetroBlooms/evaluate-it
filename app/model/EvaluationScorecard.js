Ext.define('EvaluateIt.model.EvaluationScorecard', {
    extend: 'Ext.data.Model',
    
    config: {
        idProperty: 'id', // use with proxy.SQL
	    //identifier: 'uuid', // use with proxy.localstorage
        fields: [
            {name: 'id', type: 'int'}, // pk
            {name: 'score', type: 'int'}, // score: valid value in (0, 4)
            {name: 'factorType', type: 'int'} // linking id for lookup
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
