Ext.define('EvaluateIt.model.EvaluationFactorScorecard', {
    extend: 'Ext.data.Model',
    
    config: {
        //idProperty: 'id', // use with proxy.SQL 
	identifier: 'uuid', // use with proxy.localstorage 
        fields: [
            {name: 'id', type: 'int'},
            {name: 'score', type: 'int'},
            {name: 'factorType', type: 'int'}
        ],
	belongsTo: [{ model: 'EvaluateIt.model.Evaluation', associationKey: 'evaluationId' }]

    }
});
