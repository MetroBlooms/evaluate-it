Ext.define('EvaluateIt.model.Evaluation', {
    extend: 'EvaluateIt.model.BaseModel',
    config: {
        idProperty: 'id',
		fields: [
			{name: 'id', type: 'int'}, // pk
			{name: 'category', type: 'string'}, //used to categorize for selection of view 
	    	{name: 'remoteEvaluationId', type: 'int'}, // linking id to remote JSON
			{name: 'dateOfEvaluation', type: 'date'}, // date evaluation done
            //{name: 'date_raw', type: 'string'}, // date evaluation done
            {name: 'datePostedToRemote', type: 'date'}, // date successfully uploaded to remote
	    	{name: 'evaluationType', type: 'int'}, // type of evaluation done - to be added in the future`
			{name: 'site_id', type: 'string'},	// linking id for associations
            {name: 'siteMaintainer', type: 'string'}, // TODO: implement as hasMany from Site
            // sessionStorage.evaluator_id =  loginResponse.evaluator_id;
            // Ajax response: json.evaluator.evaluator_id
            {name: 'evaluator_id', type: 'int'},
            {name: 'rainGarden',  type: 'boolean'},
            {name: 'rainBarrel', type: 'boolean'},
 			{name: 'comments', type: 'string'}, // general comments
            {name: 'imageUri', type: 'string'}, //device's uri of image to be uploaded
            {name: 'evaluationAward_id', type: 'string'}

        ],
        proxy: {
            type: 'localstorage'
        },
        belongsTo: [
            {
                model: 'EvaluateIt.model.Site',
                name: 'Site',
                primaryKey: 'id',
                foreignKey: 'site_id',
                foreignStore: 'Sites'
            }
        ],
        hasOne: [
            {
                model: 'EvaluateIt.model.EvaluationAward',
                getterName: 'getEvaluationAward',
                setterName: 'setEvaluationAward',
                name: 'EvaluationAward',
                primaryKey: 'id',
                foreignKey: 'evaluationAward_id',
                foreignStore: 'EvaluationAwards'
            },
            {
                model: 'EvaluateIt.model.EvaluationScorecard',
                getterName: 'getEvaluationScorecard',
                setterName: 'setEvaluationScorecard',
                name: 'EvaluationScorecard',
                primaryKey: 'id',
                foreignKey: 'evaluation_id',
                foreignStore: 'EvaluationScorecards'
            }
        ],
        hasMany: [

            {
                model: 'EvaluateIt.model.EvaluationFeature',
                name: 'EvaluationFeature',
                primaryKey: 'id',
                foreignKey: 'evaluation_id',
                associationKey: 'EvaluationFeature',
                foreignStore: 'EvaluationFeatures'
            }
        ]
    }
});

