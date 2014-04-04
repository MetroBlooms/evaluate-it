Ext.define('EvaluateIt.model.EvaluationAward', {
    extend: 'Ext.data.Model',
    
    config: {
         //idProperty: 'id', // use with proxy.SQL 
	    identifier: 'uuid', // use with proxy.localstorage
        fields: [
            {name: 'id', type: 'int'}, // pk
            {name: 'specialAwardSpecified', type: 'auto'}, // string description for choice of "other"
            {name: 'awardType', type: 'int'} // linking id for lookup
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
