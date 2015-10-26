/**
 * Handle data transfers to remote server
 *
 */
Ext.define('EvaluateIt.controller.Test', {
	extend: 'Ext.app.Controller',

	config: {
		profile: Ext.os.deviceType.toLowerCase(),
		control: {
			'container button[itemId=authButton]': {
				tap: 'onAuth'
			},
            'container button[itemId=testButton]': {
                tap: 'onTest'
            }
		}

 	},

    onAuth: function(button) {

        url = EvaluateIt.utils.UtilityService.url('login');

        if (EvaluateIt.config.mode === 'test') {
            console.log(url);
            console.log('url: ' + url);
        }
        Ext.Ajax.request({

            cors: true,
            type: 'GET',
            useDefaultXhrHeader: false,
            url: url,
            disableCaching: false,
            success: function (response) {

                var loginResponse = Ext.JSON.decode(response.responseText);

                if (EvaluateIt.config.mode === 'test') {
                    console.log(loginResponse.token);
                }

                sessionStorage.sessionToken = loginResponse.token;

                if (response.status === 200) {
                    // The server will send a token that can be used throughout the app to confirm that the user is authenticated.
                    sessionToken = loginResponse.token;
                    // TODO: write to sessionStorage
                    sessionStorage.sessionToken =  sessionToken;

                    if (EvaluateIt.config.mode === 'test') {
                        console.log(sessionToken);
                    }
                } else {
                    if (EvaluateIt.config.mode === 'test') {
                        console.log('sessionToken...' + sessionToken);
                        console.log(loginResponse.message);
                    }
                }
            },
            failure: function (response) {
                //me.sessionToken = null;
                //me.signInFailure('Login failed. Please try again later.');
            }
        });

    },

    // spawn form to select dynamic query
    onTest: function(button) {
        if (EvaluateIt.config.mode === 'test') {
            console.log('Button Click');
        }
		var testForm; //= Ext.Viewport.down('login');
		//create widget if it doesn't exist
		if(!testForm){
			testForm = Ext.widget('testview');
		} 
		testForm.reset();
		testForm.showBy(button);

        sessionStorage.criterion1 = null;
        sessionStorage.criterion2 = null;
        sessionStorage.criterion3 = null;

	}


});

