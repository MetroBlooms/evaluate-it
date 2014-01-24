Ext.require(['EvaluateIt.model.Site','EvaluateIt.model.Evaluator']);

Ext.define('EvaluateIt.model.EvaluationImage', {
    extend: 'Ext.data.Model',
 
    config: {
        //idProperty: 'id', // use with proxy.SQL 
		//identifier: 'uuid', // use with proxy.localstorage 
        fields: [
				{name: 'id', type: 'string'}, // pk
				{name: 'srcUri', type: 'string'} // local image location 
			
	
        ],
		proxy: {
        	type: "localstorage"
        },

		belongsTo: [
			{ 
			    model: 'EvaluateIt.model.Evaluation', 
			    //associationKey: 'siteId',
				name: 'site',
				//instanceName: 'site',
			    //getterName: 'getSite',
			    //setterName: 'setSite',
      			foreignKey: 'evaluation_id',
      			foreignStore: 'Evaluations'
			}
		]
	}
});


