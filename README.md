Cross platform mobile app built using Sencha Touch 2.4.1 framework and Sench CMD 5.0.3.324 

**This project obsoletes evaluate-it-jqm.**

Use: Garden/Raingarden evaluation tool developed for use by <a href="http://www.metroblooms.org">Metro Blooms</a>

Credits: <a href="http://dev.sencha.com/deploy/touch/examples/production/kitchensink/">Sencha Touch Kitchensink</a>  

Test Platform: Web (see TODO)

Deployment instructions:

*  <a href="http://www.sencha.com/products/touch/license/">Download and install Sencha Touch SDK - OpenSource/GPL license version located under the section "Working in Open Source?"</a>

*  <a href=" http://www.sencha.com/products/sencha-cmd/">Download and install Sencha command utility</a>   

*  clone repo in directory of your choice (/path/to/app/, e.g.~/development)

*  Copy touch-2.4.1 SDK folder from download to system and then cd to SDK directory(e.g., ~/Library/Javascript/sencha/touch-2.4.1)

* Delete app.js and app.json in the folder ~/development/evaluate-it

*  Generate app by running the command: sencha generate app EvaluateIt ~/development/evaluate-it

*  cd ~/development/evaluate-it

*  app.json

*  drop app.js (one that I e-mailed you; see note about app.js below) into ~/development/evaluate-it

*  Test build app by running command: sencha app build testing

*  Configure Cordova environment (DETAILS FORTHCOMING)

**Any time significant changes have been made to the code base, run 'sencha app build testing' to check for errors or warnings**

Note: Global URL variables for the AJAX calls are in the configuration file app.js (not included in this repository, but necessary to run the application. app.js configuration is listed below). You can also use this file for other sensitive configuration data storage. 

	// app.js

	Ext.Loader.setPath({
		'Ext': 'touch/src',
		'Ext.plugin': 'lib/plugin'
	});

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
				'Ext.Map',
				'Ext.plugin.google.Traffic',
				'Ext.plugin.google.Tracker'
		],

		launch : function() {
			EvaluateIt.config = {

				// variables for use in POST/GET method to web server
				// do not publish as part of project

				// new API variables
	
				// TODO: add switch for app to go between dev and prod environments: 
				//       Both in local app db, and via API calls to Web server
				//
				// TODO: document Web API summary of calls
				// ----------------------------

				protocol: 'http://',
				domain: 'ip_name_here',
				dev: '/api/dev',
				live: '/api/live',
				login: '/api/auth/login',
				logout: '/api/auth/logout',
				apiViewEvaluation: '/api/evaluation',
				apiViewNomination: '/api/nomination',
				pullCriterion: '/evaluator_id/',
		    	test: 'staging.',
				production: 'www.',
				action: '/update',
				ad_hoc: '/addWithEvaluation',
				post_response: '/show_post_data',			
				file_response: '/show_file_data',
				file_upload: '/uploadImage',
				mode: 'live' // switch to control use of staging or prouction server


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
	 //loads the views used by the app from the app/view folder
		views: [

			'ClearAll',	
			'EvaluationCriteria',
			'Evaluation',
			'EvaluationList',
			'EvaluationForm',
			'EvaluationAward',
			'EvaluationAwardForm',
			'EvaluationAwardList',
			'SiteGeneral',
			'SiteGeneralForm',
			'SiteGeneralList',
			'SiteGeolocation', 
			'SiteGeolocationList',
			'Geoposition',	
			'Login',
			'Pull',
			'Push',
			'PushList',
			'PushForm',
			'RemoveRecord',
			'RemoveRecordList'
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

		    'Evaluators',
			'ImageQueue',
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
	
			'Evaluation',
			'EvaluationAward',
			'SiteGeneral',
			'SiteGeolocation',
			'Login',
			'Push',
			'RemoveRecord',
			'SiteImageCapture'
		
		]
	});


