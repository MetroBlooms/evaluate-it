Ext.define('EvaluateIt.model.EvaluationFeature', {
    extend: 'Ext.data.Model',
    
    config: {
         //idProperty: 'id', // use with proxy.SQL 
	identifier: 'uuid', // use with proxy.localstorage 
        fields: [
            {name: 'id', type: 'int'},
            {name: 'featureType', type: 'int'}
        ],
	belongsTo: [{ model: 'EvaluateIt.model.Evaluation', associationKey: 'evaluationId' }]
    }
});
