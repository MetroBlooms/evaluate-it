Cross platform mobile app built using Sencha Touch 2.3.1 framework 

**This project obsoletes evaluate-it-jqm.**

Use: Garden/Raingarden evaluation tool developed for use by <a href="http://www.metroblooms.org">Metro Blooms</a>

Credits: <a href="http://dev.sencha.com/deploy/touch/examples/production/kitchensink/">Sencha Touch Kitchensink</a>  

Test Platform: Web (see TODO)

Deployment instructions:
*  <a href="http://www.sencha.com/products/touch/download/">Download and install Sencha Touch SDK - OpenSource/GPL license version</a>
*  <a href="http://www.sencha.com/products/sencha-cmd/download">Download and install Sencha command utility</a>   
*  clone repo in directory of your choice (/path/to/app/, e.g.~/development)
*  cd to Sencha Touch SDK directory (e.g., ~/Library/Javascript/sencha/touch-2.3.1)
*  sencha generate app EvaluateIt ~/development/evaluate-it
*  cd ~/development/evaluate-it
*  vi app.js (modify as per below)
*  vi .sencha/app/sencha.cfg (add '${app.dir}/lib/plugin' to app.classpath as per line below)

    app.classpath=${app.dir}/app.js,${app.dir}/app,${app.dir}/lib/plugin
*  drop app.js (one that I e-mailed you; see note about app.js below) into ~/development/evaluate-it
*  sencha app build testing
*  Download and install <a href="http://phonegap.com/download/#">Phonegap</a> for your desired environment
*  Configure your native development environment

**note: I am running Cordova version 2.5.0 for this project, since it was the most stable version at the time of testing. Version 2.6.0 had several issues that would break the application, and 2.7.0 was an unknown. You will need to install the appropriate cordova library based on your mobile OS (See http://docs.phonegap.com/en/2.7.0/guide_getting-started_index.md.html#Getting%20Started%20Guides for platform specific details).**

Testing via browser: Start script localHttpServerStart.sh (simple Python Web server) in ./evaluate-it folder and connect via URL http://localhost:8000 (note: Sencha Touch does not support Firefox)

**Any time significant changes have been made to the code base, run 'sencha app build testing' to check for errors or warnings**

TODO: 
*  Add detailed description 
*  Add directions for bundling Phonegap builds for Android/iOS deployment

**Currently using kludge for Android and iOS; implement and test more uniform solution: https://github.com/bricemason/sencha-cordova-builder**

*  Add unit and integration tests (using Jasmine)
*  Add normalized model (see comments in app/model/SiteEvaluation.js)
*  Switch to Nokia maps API
*  Fix image upload issues on iOS
*  Add multi-image binding to single evluation
*  Improve style and form flow
*  Add user selected geopositioning accuracy
*  Etc.

Note: You will need to configure the global URL variables for the AJAX calls in the configuration file app.js (not included in this repository, but necessary to run the application. app.js configuration is listed below). You can also use this file for other sensitive configuration data storage. 

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


