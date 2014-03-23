Ext.require(['EvaluateIt.model.Site','EvaluateIt.model.Evaluator']);

Ext.define('EvaluateIt.model.Evaluation', {
    extend: 'Ext.data.Model',
 
    config: {
        //idProperty: 'id', // use with proxy.SQL 
		//identifier: 'uuid', // use with proxy.localstorage 
        fields: [
			{name: 'id', type: 'string'}, // pk
			{name: 'category', type: 'string'}, //used to categorize for selection of view 
	    	{name: 'remoteEvaluationId', type: 'int'}, // linking id to remote JSON
			{name: 'remoteEvaluatorId', type: 'int'}, // linking id to remote JSON
            {name: 'dateOfEvaluation', type: 'date'}, // date evaluation done
            {name: 'datePostedToRemote', type: 'date'}, // date successfully uploaded to remote
	    	{name: 'evaluation_id', type: 'int'}, // linking id for associations
            {name: 'evaluationType', type: 'int'}, // type of evaluation done - to be added in the future`
			{name: 'site_id', type: 'int'},	// linking id for associations
 			{name: 'noLongerExists', type: 'boolean'}, // invalid site: nothing to evaluate!
            {name: 'comments', type: 'string'} // general comments

        ],
		proxy: {
        	type: "localstorage"
        },


		/*hasOne: [
			{ 
				model:	'EvaluateIt.model.Evaluator' 
			}
		],*/
		belongsTo: [
			{ 
			    model: 'EvaluateIt.model.Site', 
			    //associationKey: 'siteId',
				name: 'site',
				//instanceName: 'site',
			    //getterName: 'getSite',
			    //setterName: 'setSite',
      			primaryKey: 'key_id',
      			foreignKey: 'site_id',
      			foreignStore: 'Sites'
			}/*,
			{ 
			    model: 'EvaluateIt.model.Evaluator',  
			    associationKey: 'evaluator_id', 
			    name: 'evaluator',
		            instanceName: 'evaluator',
			    getterName: 'getEvaluator',
			    setterName: 'setEvaluator',
			    foreignKey: 'evaluator_id'  
			}*/
		]


//	hasOne: [{ model: 'EvaluateIt.model.EvaluationAward' }],
//      hasMany: [{ model: 'EvaluateIt.model.EvaluationFactorScorecard' }],
//	hasMany: [{ model: 'EvaluateIt.model.EvaluationFeature' }],
    }
});

