Ext.define('EvaluateIt.model.EvaluationAward', {
    extend: 'Ext.data.Model',
    
    config: {
         //idProperty: 'id', // use with proxy.SQL 
	identifier: 'uuid', // use with proxy.localstorage 
        fields: [
            {name: 'id', type: 'int'},
            {name: 'specialAwardSpecified', type: 'auto'},
            {name: 'awardType', type: 'int'}
        ],
	belongsTo: [{ model: 'EvaluateIt.model.Evaluation', associationKey: 'evaluationId' }]

    }
});
