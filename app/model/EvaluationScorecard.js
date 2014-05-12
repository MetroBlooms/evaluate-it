Ext.define('EvaluateIt.model.EvaluationScorecard', {
    extend: 'EvaluateIt.model.BaseModel',
    config: {
        idProperty: 'id',
        fields: [
            {name: 'id', type: 'int'}, // pk
            {name: 'score', type: 'int'}, // score: valid value in (0, 4)
            {name: 'factorType', type: 'int'} // linking id for lookup
        ],
        proxy: {
            type: 'localstorage'
        },
        belongsTo: [
            {
                model: 'EvaluateIt.model.Evaluation',
                associationKey: 'evaluationId'
            }
        ]
    }
});
