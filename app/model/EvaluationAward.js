Ext.define('EvaluateIt.model.EvaluationAward', {
    extend: 'EvaluateIt.model.BaseModel',
    config: {
        idProperty: 'id',
        fields: [
            {name: 'id', type: 'int'}, // pk
            {name: 'specialAwardSpecified', type: 'auto'}, // string description for choice of "other"
            {name: 'awardType', type: 'int'}, // linking id for lookup
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
