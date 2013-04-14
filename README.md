Cross platform mobile app built using Sencha Touch 2.1.1 framework 

**This project obsoletes evaluate-it-jqm.**

Use: Garden/Raingarden evaluation tool developed for use by <a href="http://www.metroblooms.org">Metro Blooms</a>

Credits: <a href="http://dev.sencha.com/deploy/touch/examples/production/kitchensink/">Sencha Touch Kitchensink</a>  

Test Platform: Web (see TODO)

Deployment instructions:
*  <a href="http://www.sencha.com/products/touch/download/">Download and install Sencha Touch SDK</a>
*  <a href="http://www.sencha.com/products/sencha-cmd/download">Download and install Sencha command utility</a>
*  cd ./touch-2.x/examples   
*  clone repo   
*  sencha generate app EvaluateIt evaluate-it
*  cd evaluate-it
*  sencha app build testing

Testing: Start script localHttpServerStart.sh (simple Python Web server) in ./touch-2.x folder and connect via URL http://localhost:8000/examples/evaluate-it (you can set this in ./touch-2.x/examples/examples.json)

TODO: 
*  Add detailed description 
*  Add geolocation Google maps view, with ability to save coordinates
*  Add cookie auth for remote data push/pull 
*  Remove dependency on path in ./touch-2.x/examples 
*  Add Phonegap framework for file upload API for image gallery selection/upload;
*  Add unit and integration tests (using Jasmine)
*  Bundle Phonegap builds for Android/iOS deployment
*  Field test!
*  Add normalized model (see comments in app/model/SiteEvaluation.js)

Note: You will need to configure the global URL variables for the AJAX calls in the configuraiton file app.js (not included in this repository, but necessary to run the application. app.js configuration is listed below). You can also use this file for other sensitive configuration data storage. 


    // app.js
	Ext.Loader.setPath({
		'Ext': '../../src'
	});

	Ext.application({
		name: 'EvaluateIt', //'EvaluateIt',
		requires: ['EvaluateIt.view.ColorPatterns', 'Ext.device.Geolocation'], // ['EvaluateIt.view.ColorPatterns']

		launch : function() {
			EvaluateIt.config = {

				// variables for use in POST/GET method to web server
				// do not publish as part of project

				webServer: 'http://ip_name_here',
				collectionDevelopment: 'app', // set on server to use development database 
				collectionProduction: 'applive', // set on server to use live database
				evaluator_id: insert_fixed_id_here , // need variable evaluator_id (dependent on development of cookie auth piece)
				callback: insert_calback_function_for_cors_request_here,
				testHttpResponse: 'showPostedData.php', // give server response
				postResults: 'updateData.php'  // update data on server

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
			
			'SiteEvaluationEdit',
			'Evaluation',
			'EvaluationList',
			'Geolocation', 
			'GeolocationList',
			'GeolocationEdit',
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
			'SiteEvaluations'
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
		
			'GeolocationMaster',
			'SiteEvaluationMaster',
			'PushMaster'
		
		]
	});

