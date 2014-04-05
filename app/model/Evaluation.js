Ext.require(['EvaluateIt.model.Site','EvaluateIt.model.Evaluator']);

Ext.define('EvaluateIt.model.Evaluation', {
    extend: 'Ext.data.Model',
 
    config: {
        //idProperty: 'id', // use with proxy.SQL
		identifier: 'uuid', // use with proxy.localstorage
        fields: [
			{name: 'id', type: 'string'}, // pk
			{name: 'category', type: 'string'}, //used to categorize for selection of view 
	    	{name: 'remoteEvaluationId', type: 'int'}, // linking id to remote JSON
			{name: 'remoteEvaluatorId', type: 'int'}, // linking id to remote JSON
            {name: 'dateOfEvaluation', type: 'date'}, // date evaluation done
            {name: 'datePostedToRemote', type: 'date'}, // date successfully uploaded to remote
	    	//{name: 'evaluation_id', type: 'int'}, // linking id for associations
            {name: 'evaluationType', type: 'int'}, // type of evaluation done - to be added in the future`
			//{name: 'site_id', type: 'int'},	// linking id for associations
 			{name: 'noLongerExists', type: 'boolean'}, // invalid site: nothing to evaluate!
            {name: 'comments', type: 'string'} // general comments

        ],
        proxy: {
            type: "sql", //"localstorage",
            database: 'Test'
        },
		associations: [

            {
                type: 'hasOne',
                model:	'EvaluateIt.model.Evaluator',
                associationKey: 'evaluatorId'
            },
            {
                type: 'hasOne',
                model: 'EvaluateIt.model.EvaluationAward',
                associationKey: 'evaluationAwardId'
            },
            {
                type: 'hasMany',
                model: 'EvaluateIt.model.EvaluationFactorScorecard',
                name: 'evaluationFactorScorecards'
            },
            {
                type: 'hasMany',
                model: 'EvaluateIt.model.EvaluationFeature',
                name: 'evaluationFactorFeatures'
            },
            {
                type: 'belongsTo',
                model: 'EvsluateIt.model.Site',
                associationKey: 'siteId'
            }
        ]
    }
});

