Ext.require(['EvaluateIt.model.Site','EvaluateIt.model.Evaluator']);

Ext.define('EvaluateIt.model.Evaluation', {
    extend: 'Ext.data.Model',
 
    config: {
        //idProperty: 'id', // use with proxy.SQL 
		//identifier: 'uuid', // use with proxy.localstorage 
        fields: [
			{name: 'key_id', type: 'string'},
			{name: 'category', type: 'string'}, //used to categorize for selection of view 
	    	{name: 'remoteEvaluationId', type: 'int'},
			{name: 'remoteEvaluatorId', type: 'int'},
            //{name: 'sumRating', type: 'int'},
            //{name: 'dateloadedToDevice', type: 'date'},
            //{name: 'datePostedToRemote', type: 'date'},
            //{name: 'dateUpdated', type: 'date'},
            {name: 'dateOfEvaluation', type: 'date'},
            //{name: 'noLongerExists', type: 'boolean'},
            //{name: 'comments', type: 'string'},
	    	{name: 'evaluation_id', type: 'int'},
            {name: 'evaluationType', type: 'int'},
			{name: 'site_id', type: 'int'}	
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


/*Ext.create("Ext.data.Store", {
  model: "EvaluateIt.model.Evaluation",
  storeId: 'Evaluation',
  proxy: {
    type: "sql"
  },
  autoLoad:true
});*/


