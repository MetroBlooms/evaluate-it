Ext.define('EvaluateIt.model.EvaluationScorecard', {
    extend: 'EvaluateIt.model.BaseModel',
    config: {
        idProperty: 'id',
        fields: [
            {name: 'id', type: 'int'}, // pk
            {name: 'design', type: 'int'},
            {name: 'varietyAndHealth', type: 'int'},
            {name: 'visualImpact', type: 'int'},
            {name: 'maintenance', type: 'int'},
            {name: 'environmentalStewardship', type: 'int'},
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
