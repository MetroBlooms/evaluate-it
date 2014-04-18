Ext.define('EvaluateIt.model.EvaluationAward', {
    extend: 'Ext.data.Model',
    
    config: {
        idProperty: 'id',
        fields: [
            {name: 'id', type: 'int'}, // pk
            {name: 'specialAwardSpecified', type: 'auto'}, // string description for choice of "other"
            {name: 'awardType', type: 'int'} // linking id for lookup
        ],
        proxy: {
            type: "sql",
            database: 'Test'
        },
        associations: [
            {
                type: 'belongsTo',
                model: 'EvaluateIt.model.Evaluation'
            }
        ]
    }
});
