//Ext.require(['Ext.data.proxy.SQL']);

Ext.define('EvaluateIt.model.SiteEvaluation', {
    extend: 'Ext.data.Model',
	requires: [
		'Ext.data.identifier.Uuid'
	],
	// TO DO: this is a temporary kludge until the following is implemented in its entirety: http://appointsolutions.com/2012/07/using-model-associations-in-sencha-touch-2-and-ext-js-4/

    
	config: {
        //idProperty: 'id', // use with proxy.SQL 
		identifier: 'uuid', // use with proxy.localstorage 
        fields: [
	
			{name: 'site_id', type: 'int'},	
           	{name: 'remoteSiteId', type: 'int'},

			// TODO: normalize structure as per outlined sections below

			// Address model
			{name: 'address', mapping: 'site.address.address', type: 'string'},
            {name: 'city', mapping: 'site.address.city', type: 'string'},
            {name: 'state', mapping: 'site.address.state', type: 'string'},
            {name: 'zipcode', mapping: 'site.address.zipcode', type: 'string'},
			{name: 'neighborhood', mapping: 'site.address.neighborhood', type: 'string'},
			{name: 'county', mapping: 'site.address.county', type: 'string'},

			// Evaluation model
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
			// EvaluationFactorScorecard model: must have all 5 categories
			{name: 'visualImpact', mapping: 'evaluationFactorScorecard.useOfColoisualImpact', type: 'int'},
			{name: 'varietyAndHealth', mapping: 'evaluationFactorScorecard.varietyAndHealth', type: 'int'},
			{name: 'design', mapping: 'evaluationFactorScorecard.design', type: 'int'},
			{name: 'maintenance', mapping: 'evaluationFactorScorecard.maintenance', type: 'int'},
			{name: 'environmentalStewardship', mapping: 'evaluationFactorScorecard.environmentalStewardship', type: 'int'},
			
			// SiteMaintainer
			{name: 'name', mapping: 'site.siteMaintainer.name', type: 'string'},

			// Evaluator model
			{name: 'remoteEvaluatorId', mapping: 'evaluator.remoteEvaluatorId', type: 'string'},

			// Geolocation model
			{name: 'latitude', mapping: 'geolocation.latitude', type: 'float'},
            {name: 'longitude', mapping: 'geolocation.longitude', type: 'float'},
            {name: 'accuracy', mapping: 'geolocation.accuracy', type: 'float'},
            {name: 'datestamp', mapping:  'geolocation.datestamp', type: 'string'},             
		
			// EvaluationAward model	
			{name: 'awardId', mapping:  'evaluationAward.rainGarden', type: 'string'},
            {name: 'specialAwardSpecified', mapping:  'evaluationAward.specialAwardSpecified', type: 'string'},
           
			// EvaluationFeature model 
			{name: 'rainGarden', mapping:  'evaluationFeature.rainGarden', type: 'string'},
            //{name: 'rainBarrel', mapping:  'evaluationFeature.rainBarrel', type: 'string'},
	
			// need EvaluationImage model (see http://code.medula.cl/article_Picture-capture-and-uploader-app-with-ST2.html)	
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

