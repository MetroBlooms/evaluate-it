Ext.define('EvaluateIt.model.EvaluationAward', {
    extend: 'Ext.data.Model',
    
    config: {
         //idProperty: 'id', // use with proxy.SQL 
	    identifier: 'uuid', // use with proxy.localstorage
        fields: [
            {name: 'specialAwardSpecified', type: 'auto'}, // string description for choice of "other"
            {name: 'awardType', type: 'int'} // linking id for lookup
        ],
        proxy: {
            type: "sql", //"localstorage",
            database: 'Test'
        },
        hasOne: [
            {
                model: 'EvaluateIt.model.Evaluation'
            }
        ]
    }
});
