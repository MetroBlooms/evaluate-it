Ext.define('EvaluateIt.model.Evaluation', {
    extend: 'EvaluateIt.model.BaseModel',
    config: {
        idProperty: 'id',
		fields: [
			{name: 'id', type: 'int'}, // pk
			{name: 'category', type: 'string'}, //used to categorize for selection of view 
	    	{name: 'remoteEvaluationId', type: 'int'}, // linking id to remote JSON
			{name: 'dateOfEvaluation', type: 'date'}, // date evaluation done
            {name: 'datePostedToRemote', type: 'date'}, // date successfully uploaded to remote
	    	{name: 'evaluationType', type: 'int'}, // type of evaluation done - to be added in the future`
			{name: 'site_id', type: 'string'},	// linking id for associations
            {name: 'evaluator_id', type: 'string'}, // linking id to remote JSON
 			{name: 'noLongerExists', type: 'boolean'}, // invalid site: nothing to evaluate!
            {name: 'comments', type: 'string'} // general comments

        ],
        proxy: {
            type: "sql",
            database: 'Test'
        },
		associations: [

            {
                type: 'belongsTo',
                model: 'EvaluateIt.model.Site',
                name: 'site',
                primaryKey: 'id',
                foreignKey: 'site_id',
                foreignStore: 'Sites'
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
            }


        ]
    }
});

