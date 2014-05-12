Ext.define('EvaluateIt.model.EvaluationFeature', {
    extend: 'EvaluateIt.model.BaseModel',
    config: {
        idProperty: 'id',
        fields: [
            {name: 'id', type: 'int'}, // pk
            {name: 'featureType', type: 'int'} // linking id for lookup
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
