// TODO:
// 1. Hide specialAward Specified unless 'Other' chosen from list (lower priority)
// 2. Test! Test! Test!
// 3. Implement https://github.com/bricemason/sencha-cordova-builder (lower priority)
// 4. Address changes???? (lower priority)
// 5. Nokia maps???? (lower priority)
// 6. Implement Award model to better control code reference usage  (lower priority)
// 7. Add "on-the-fly" switch for mode of API access between staging and production (lower priority)

// check push http response: if error, do not upload image
// geolocation: if obtained, then allow to plot on map without geopositioning
// datepicker: fix default date issue of 12/31/1969
// flag after select image
// flag after push
// address changes

Ext.Loader.setPath({
    'Ext': 'touch/src'
	//'Ext.plugin': 'lib/plugin'
});


/**
 * Ext.application is the heart of your app. It sets the application name, can specify the icon and startup images to
 * use when your app is added to the home screen, and sets up your application's dependencies - usually the models,
 * views and controllers that your app uses.
 */
Ext.application({
    name: 'EvaluateIt', 
    requires: [
			'Ext.device.Geolocation',
            'Ext.device.Camera',
			'Ext.Map',
        	'EvaluateIt.utils.UtilityService',
            'EvaluateIt.utils.Base64',
            'EvaluateIt.utils.DataService',
            'Ext.data.proxy.Sql'
	],

	launch : function() {
		
        Ext.Viewport.add([

            //{ xtype: 'loginview' },
            //{ xtype: 'logoffview' }

        ]);

        document.addEventListener('deviceready', function () {
            if (Ext.os.is.iOS && Ext.os.version.major >= 7) {
                document.body.style.marginTop = "20px";
                Ext.Viewport.setHeight(Ext.Viewport.getWindowHeight() - 20);
            }
        });

       /* Ext.Ajax.on('beforerequest', (function(klass, request) {
            return disablecaching = false;
        }), this);*/

        // test dynamic load of select control in Test view
        localStorage.clear();
        localStorage.description = 'Test';
        localStorage.value = 1;

        EvaluateIt.config = {

			protocol: 'http://',
			host: '127.0.0.1:5000',
            test_me: '/api/resource',
            token: '/api/token',
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
			mode: 'production', // switch to control use of staging or production server
			mode: 'live', // switch to control use of staging or production server

            accuracyReading: 100, // globally accessible current reading of accuracy.
            accuracy: 1 // geolocation radius of accuracy. Set low to force display of readings and allow user to pick.


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

        'Site',
        'SiteForm',
        'SiteList',
        'ClearAll',
		'Evaluation',
		'EvaluationAward',
		'EvaluationAwardForm',
		'EvaluationAwardList',
		'EvaluationCriteria',
		'EvaluationForm',
		'EvaluationList',
        'EvaluationScorecard',
        'EvaluationScorecardForm',
        'EvaluationScorecardList',
		'Login',
        'TestRest',
		'Push',
		'PushForm',
		'PushList',
		'RemoveRecord',
		'RemoveRecordList',
        'SetEnvironment',
		'SiteGeolocation',
		'SiteGeolocationList',
        'Test'
    ],

	models: [ 

		'Address',
        'BaseModel', // see http://appointsolutions.com/2012/07/using-model-associations-in-sencha-touch-2-and-ext-js-4/
		'Evaluation',
		'EvaluationAward',
		'EvaluationScorecard',
        'FactorTest',
       	'Geolocation',
        'Option',
		'Site',
		'SiteMaintainer'

	],

    // Options.js contains the tree data for our main navigation NestedList; fires as a anonymous function
    stores: [

		'ImageQueue',
		'Addresses',
        'BaseStore',
		'Evaluations',
		'EvaluationAwards',
		'EvaluationScorecards',
       	'Geolocations',
        'FactorTests',
        'Options',
        'Sites',
		'SiteMaintainers'

	],
 
    //app has Phone and Tablet modes, which rearrange the screen based on the type
    //of device detected
    profiles: [
	
		'Phone',
		'Tablet' 
	
	],

	controllers: [
	
		'Evaluation',
        'EvaluationAward',
        'EvaluationScorecard',
		'Login',
		'Push',
		'RemoveRecord',
		'Site',
		'SiteGeolocation',
		'SiteImageCapture'
	]
});
