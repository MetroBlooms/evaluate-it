// TODO:
// 1. Determine optimal accuracy for geolocation
// 2. Implement Phonegap photo gallery upload in PushMaster.js
// 3. Hide specialAward Speficied unless 'Other' chosen from list
// 4. Finish API call testing and implement ad hoc evaluation POST
// 5. Test! Test! Test!
// 6. Implement https://github.com/bricemason/sencha-cordova-builder
// 7. Address changes????
// 8. Nokia maps????
// 9. Filter evaluations as per state of completion


//<debug>
Ext.Loader.setPath({
    'Ext': 'touch/src',
	'Ext.plugin': 'lib/plugin'
});

//</debug>

//</debug>

/**
 * Ext.application is the heart of your app. It sets the application name, can specify the icon and startup images to
 * use when your app is added to the home screen, and sets up your application's dependencies - usually the models,
 * views and controllers that your app uses.
 */
Ext.application({
    name: 'EvaluateIt', 
    requires: [
			'EvaluateIt.view.ColorPatterns', 
			'Ext.device.Geolocation',
			//'Ext.util.Geolocation',
			'Ext.Map',
        	'Ext.plugin.google.Traffic',
        	'Ext.plugin.google.Tracker'
	],

	launch : function() {
		
        Ext.Viewport.add([

            //{ xtype: 'loginview' },
            //{ xtype: 'logoffview' }

        ]);
		
		EvaluateIt.config = {

			// TODO: implement new API
			// -----------------------------
		
			// To make updates using our testing database, the URL will be this:
			// http://staging.metroblooms.org/api/
	
			// and the live database will be this:
			// http://www.metroblooms.org/api/

			// usage: 
			// http://staging.metroblooms.org/api/dev/show_post_data -> update post method
			// http://staging.metroblooms.org/api/dev/show_get_data -> update get method
			// http://staging.metroblooms.org/api/dev/show_request_data -> return HTTP response only

			// http://www.metroblooms.org/api/live/show_post_data
			// http://www.metroblooms.org/api/live/show_get_data
			// http://www.metroblooms.org/api/live/show_request_data

			// Search for evaluations, and filter by the evaluator ID, like this
			// http://staging.metroblooms.org/api/evaluation/evaluator_id/265
			

			// ----------------------------


			
			// variables for use in POST/GET method to web server
			// do not publish as part of project

			// NOTE: POST JSON to server 
			//"http://www.metroblooms.org/applive/updateData.php", // to POST updates/edits to db
			// url : "http://www.metroblooms.org/applive/showPostedData.php",  // only returns the response
			// use the URL http://www.metroblooms.org/applive/* to use the live database, 
			// use the URL of http://www.metroblooms.org/app/*Ó for the development database

			/*var webServer = 'http://metroblooms.org',
				collectionDevelopment = 'app',
				collectionProduction = 'applive',
				testHttpResponse = 'showPostedData.php',
				postResults = 'updateData.php',
				// set variables for testing: need to add selection for these in "Data management" page in index.html
				environ = 'dev',
				action = 'response',	
				
				
				// http://www.metroblooms.org/app/evaluations.php?callback=&evaluator_id=112
				// to load site with garden and address objects
				// var url ="http://www.metroblooms.org/app/gardens.php?output=json&callback=?";
				// grab all evaluation data specific to an evaluator_id
				
				evaluator_id = 265, // need variable evaluator_id!! // becky = 216
				callback = 'evaluations.php?callback=&evaluator_id='; */

			// new API
	
			protocol: 'http://',
			domain: 'metroblooms.org',
			dev: '/api/dev',
			live: '/api/live',
			apiViewEvaluation: '/api/evaluation',
			apiViewNomination: '/api/nomination',
			pullCriterion: '/evaluator_id/',
		    test: 'staging.',
			live: 'www.',
			action: '/update',
			post_response: '/show_post_data',			
			file_response: '/show_file_data',
			file_upload: '/uploadImage',

			//POST file:  http://staging.metroblooms.org/api/nomination/uploadImage 

			//http://staging.metroblooms.org/api/dev/show_file_data
			// http://staging.metroblooms.org/api/dev/show_get_data
			// http://staging.metroblooms.org/api/dev/show_post_data
			// http://staging.metroblooms.org/api/dev/show_request_data

		    // url = 'http://staging.metroblooms.org/api/evaluation/evaluator_id/265',
				
			/*url =  EvaluateIt.config.protocol;
			url += EvaluateIt.config.test;
			url += EvaluateIt.config.domain;
			url += EvaluateIt.config.apiView;
			url += EvaluateIt.config.pullCriterion;*/

	
			webServer: 'http://metroblooms.org', // protocol + domain
			collectionDevelopment:  'app',
			collectionProduction: 'applive',
			evaluator_id: 265, 
			callback: 'evaluations.php?evaluator_id=',
			testHttpResponse: 'showPostedData.php',
			postResults: 'updateData.php'

			

		}
	},
    
    //sets up the icon and startup screens for when the app is added to a phone/tablet home screen
    startupImage: {
        '320x460': 'resources/startup/Default.jpg', // Non-retina iPhone, iPod touch, and all Android devices
        '640x920': 'resources/startup/640x920.png', // Retina iPhone and iPod touch
        '640x1096': 'resources/startup/640x1096.png', // iPhone 5 and iPod touch (fifth generation)
        '768x1004': 'resources/startup/768x1004.png', //  Non-retina iPad (first and second generation) in portrait orientation
        '748x1024': 'resources/startup/748x1024.png', //  Non-retina iPad (first and second generation) in landscape orientation
        '1536x2008': 'resources/startup/1536x2008.png', // : Retina iPad (third generation) in portrait orientation
        '1496x2048': 'resources/startup/1496x2048.png' // : Retina iPad (third generation) in landscape orientation
    },

    isIconPrecomposed: false,
    icon: {
        57: 'resources/icons/icon.png',
        72: 'resources/icons/icon@72.png',
        114: 'resources/icons/icon@2x.png',
        144: 'resources/icons/icon@144.png'
    },

    //loads the views used by the app from the app/view folder
    views: [
	
		'Geoposition',	
		'Login',
		'Evaluation',
		'EvaluationList',
		'SiteEvaluationForm',
		'Award',
		'AwardList',
		'EvaluationAwardForm',
		'General',
		'GeneralList',
		'EvaluationGeneralForm',
		'Geolocation', 
		'GeolocationList',
        'Pull',
		'Push',
		'PushList',
		'PushForm'
    ],

	models: [ 
	
		'SiteEvaluation', // Kludge until proper model can be implemented
		'Option' 
		/*'Site', // Proper model for implementation
		'Evaluator',
		'Geolocation',
		'Address',
		'Evaluation',
		'EvaluationFeature',
		'EvaluationAward',
		'EvaluationFactorScorecard',
		'SiteMaintainer' */

	],

    //loads app/store/Options.js, which contains the tree data for our main navigation NestedList
    stores: [

		'Options',  
		'SiteEvaluations',
		'ImageQueue'
		/*'Evaluations', 
		'Addresses', 
		'Sites', 
		'Evaluators',
		'Geolocations',
		'SiteMaintainers'*/

	],
 
    //app has Phone and Tablet modes, which rearrange the screen based on the type
    //of device detected
    profiles: [
	
		'Tablet', 
		'Phone'
	
	],

	//ancillary views
	controllers: [
	
		'Login',
		'GeolocationMaster',
		'SiteEvaluationMaster',
		'EvaluationAwardMaster',
		'EvaluationGeneralMaster',
		'PushMaster',
		'SiteImageCapture'
	
	]
});
