Ext.define('EvaluateIt.model.EvaluationAward', {
    extend: 'EvaluateIt.model.BaseModel',
    config: {
        idProperty: 'id',
        fields: [
            {name: 'id', type: 'int'},
            {name: 'specialAwardSpecified', type: 'auto'},
            {name: 'awardType', type: 'int'},
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
