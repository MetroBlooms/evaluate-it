Ext.define('EvaluateIt.model.EvaluationScorecard', {
    extend: 'EvaluateIt.model.BaseModel',
    config: {
        idProperty: 'id',
        fields: [
            {name: 'id', type: 'int'}, // pk
            {name: 'noLongerExists', type: 'boolean'}, // invalid site: nothing to evaluate!
            {name: 'design', type: 'int'},  // TODO: implement as hasMany from Evaluation (needed for adding other BMP types)
            {name: 'varietyAndHealth', type: 'int'},
            {name: 'visualImpact', type: 'int'},
            {name: 'maintenance', type: 'int'},
            {name: 'environmentalStewardship', type: 'int'},
            {name: 'postedToRemote', type: 'int'},
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
                foreignStore: 'Evaluations',
                getterName: 'getEvaluation',
                setterName: 'setEvaluation'
            }
        ]
    }
});
