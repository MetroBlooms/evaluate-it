Ext.define('EvaluateIt.model.Evaluator', {
    extend: 'Ext.data.Model',
    
    config: {
    idProperty: 'id', // use with proxy.SQL 
	// TODO: need to add require for use of uuid
	// 'Ext.data.identifier.Uuid'
	//identifier: 'uuid', // use with proxy.localstorage 
        fields: [
            {name: 'remoteEvaluatorId', type: 'int'},
            {name: 'firstName', type: 'auto'},
            {name: 'lastName', type: 'auto'},
	    	{name: 'email', type: 'auto'}
        ],
	proxy: {
           type: "localstorage"//,
           //database: 'Yo'
        }/*,
	
	belongsTo: 
		[
			{ 
				model: 'EvaluateIt.model.Evaluation', 
				associationKey: 'evaluationId',
				name: 'evaluation',
				instanceName: 'evaluation',
				getterName: 'getEvaluation',
				setterName: 'setEvaluation',
				foreignKey: 'evaluation_id' 
			}
		]*/

    }
});
