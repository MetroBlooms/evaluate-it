
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
		'EvaluateIt.utils.Base64',
		'EvaluateIt.utils.UtilityService'
	],

	launch : function() {

		document.addEventListener('deviceready', function () {
			if (Ext.os.is.iOS && Ext.os.version.major >= 7) {
				document.body.style.marginTop = "20px";
				Ext.Viewport.setHeight(Ext.Viewport.getWindowHeight() - 20);
			}
		});

		EvaluateIt.config = {

			protocol: 'http://',
			host: '127.0.0.1:5000',
			mode: 'live', // switch to control use of staging or production server
            apiClinical: '/api/clinical/',
            apiPhi: '/api/phi/',
            apiAggregate: '/api/htsql/',
            apiLogin: '/token',
            apiResource: '/api/resource'

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

		'TestRest',
		'SetEnvironment',
		'Test'
	],

	models: [

		'DynamicTest',
		'Option'
	],

	// Options.js contains the tree data for our main navigation NestedList; fires as a anonymous function
	stores: [

		'DynamicTests',
		'Options'
	],

	//app has Phone and Tablet modes, which rearrange the screen based on the type
	//of device detected
	profiles: [

		'Phone',
		'Tablet'
	],

	controllers: [

		'Post',
		'Test'
	]
});
