//Ext.require(['Ext.data.proxy.SQL']);

Ext.define('EvaluateIt.model.SiteEvaluation', {
    extend: 'Ext.data.Model',
	requires: [
		'Ext.data.identifier.Uuid'
	],
	// TO DO: this is a temporary kludge until the following is implemented in its entirety: http://appointsolutions.com/2012/07/using-model-associations-in-sencha-touch-2-and-ext-js-4/

    //extend: 'EvaluateIt.model.Abstract',
    
    config: {
        //idProperty: 'id', // use with proxy.SQL 
		identifier: 'uuid', // use with proxy.localstorage 
        fields: [
	
			{name: 'site_id', type: 'int'},	
           	{name: 'remoteSiteId', type: 'int'},

/*
 			{name: 'address.address', mapping: 'address.address', type: 'string'},
            {name: 'address.city', mapping: 'address.city', type: 'string'},
            {name: 'address.state', mapping: 'address.state', type: 'string'},
            {name: 'address.zipcode', mapping: 'address.zipcode', type: 'string'},
			{name: 'address.neighborhood', mapping: 'address.neighborhood', type: 'string'},

			{name: 'evaluation.category', mapping: 'evaluation.category', type: 'string'}, //used to categorize for selection of view 
	    	{name: 'evaluation.remoteEvaluationId', mapping: 'evaluation.remoteEvaluationId', type: 'int'},
			{name: 'evaluation.remoteEvaluatorId', mapping: 'evaluation.remoteEvaluatorId', type: 'int'},
            {name: 'evaluation.sumRating', mapping: 'evaluation.sumRating', type: 'int'},
            {name: 'evaluation.dateloadedToDevice', mapping: 'evaluation.dateloadedToDevice', type: 'date'},
            {name: 'evaluation.datePostedToRemote', mapping: 'evaluation.datePostedToRemote', type: 'date'},
            {name: 'evaluation.dateUpdated', mapping: 'evaluation.dateUpdated', type: 'date'},
            {name: 'evaluation.evaluation.dateOfEvaluation', mapping: 'evaluation.dateOfEvaluation', type: 'date'},
            {name: 'evaluation.noLongerExists', mapping: 'evaluation.noLongerExists', type: 'boolean'},
            {name: 'evaluation.comments', mapping: 'evaluation.comments', type: 'string'},
            {name: 'evaluation.evaluationType', mapping: 'evaluation.evaluationType', type: 'int'},
			
			{name: 'siteMaintainer.name', mapping: 'siteMaintainer.name', type: 'string'},

			{name: 'evaluator.remoteEvaluatorId', mapping: 'evaluator.remoteEvaluatorId', type: 'string'},


			{name: 'geolocation.latitude', mapping: 'geolocation.latitude', type: 'float'},
            {name: 'geolocation.longitude', mapping: 'geolocation.longitude', type: 'float'},
            {name: 'geolocation.accuracy', mapping: 'geolocation.accuracy', type: 'float'},
            {name: 'geolocation.datestamp', mapping:  'geolocation.datestamp', type: 'string'}
*/
			{name: 'address', mapping: 'site.address.address', type: 'string'},
            {name: 'city', mapping: 'site.address.city', type: 'string'},
            {name: 'state', mapping: 'site.address.state', type: 'string'},
            {name: 'zipcode', mapping: 'site.address.zipcode', type: 'string'},
			{name: 'neighborhood', mapping: 'site.address.neighborhood', type: 'string'},
			{name: 'county', mapping: 'site.address.county', type: 'string'},

			{name: 'category', mapping: 'evaluation.category', type: 'string'}, //used to categorize for selection of view 
	    	{name: 'remoteEvaluationId', mapping: 'evaluation.remoteEvaluationId', type: 'int'},
			{name: 'remoteEvaluatorId', mapping: 'evaluation.remoteEvaluatorId', type: 'int'},
            {name: 'sumRating', mapping: 'evaluation.sumRating', type: 'int'},
            {name: 'dateloadedToDevice', mapping: 'evaluation.dateloadedToDevice', type: 'date'},
            {name: 'datePostedToRemote', mapping: 'evaluation.datePostedToRemote', type: 'date'},
            {name: 'dateUpdated', mapping: 'evaluation.dateUpdated', type: 'date'},
            {name: 'dateOfEvaluation', mapping: 'evaluation.dateOfEvaluation', type: 'date'}, 
            {name: 'noLongerExists', mapping: 'evaluation.noLongerExists', type: 'boolean'},
            {name: 'comments', mapping: 'evaluation.comments', type: 'string'},
            {name: 'evaluationType', mapping: 'evaluation.evaluationType', type: 'int'},

			{name: 'visualImpact', mapping: 'evaluationFactorScorecard.useOfColoisualImpact', type: 'int'},
			{name: 'varietyAndHealth', mapping: 'evaluationFactorScorecard.varietyAndHealth', type: 'int'},
			{name: 'design', mapping: 'evaluationFactorScorecard.design', type: 'int'},
			{name: 'maintenance', mapping: 'evaluationFactorScorecard.maintenance', type: 'int'},
			{name: 'environmentalStewardship', mapping: 'evaluationFactorScorecard.environmentalStewardship', type: 'int'},
			
			{name: 'name', mapping: 'site.siteMaintainer.name', type: 'string'},

			{name: 'remoteEvaluatorId', mapping: 'evaluator.remoteEvaluatorId', type: 'string'},

			{name: 'latitude', mapping: 'geolocation.latitude', type: 'float'},
            {name: 'longitude', mapping: 'geolocation.longitude', type: 'float'},
            {name: 'accuracy', mapping: 'geolocation.accuracy', type: 'float'},
            {name: 'datestamp', mapping:  'geolocation.datestamp', type: 'string'},             
			
			{name: 'awardId', mapping:  'evaluationAward.rainGarden', type: 'string'},
            {name: 'specialAwardSpecified', mapping:  'evaluationAward.specialAwardSpecified', type: 'string'},
            
			{name: 'rainGarden', mapping:  'evaluationFeature.rainGarden', type: 'string'},
            //{name: 'rainBarrel', mapping:  'evaluationFeature.rainBarrel', type: 'string'},
		
			{name: 'imageUri', mapping: 'siteImage.imageUri', type: 'string'} // local path to image

        ],
		proxy: {
        	type: "localstorage",  //"sql"
			reader : {
            	type : 'json'
        	}

           //database: 'Yo'
        }
    }
});

