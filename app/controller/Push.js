/**
 * Handle data transfers to remote server
 *
 */
Ext.define('EvaluateIt.controller.Push', {
	extend: 'Ext.app.Controller',

	config: {
		profile: Ext.os.deviceType.toLowerCase(),
  		stores: ['Sites','EvaluationScorecards'],
  		models: ['Site','EvaluationScorecard'],
  		refs: {
   			myPushList: 'pushList'
  		},
		control: {
			'pushList': {
				activate: 'onActivate',
				itemtap: 'onSelectPush'
			},
			'pushForm button[itemId=save]': {
				tap: 'onSavePush' 
			},
            'pushForm button[itemId=cancel]': {
                tap: 'onCancelPush'
            },
			'container button[itemId=loginButton]': {
				tap: 'onLoginPush' 
			},
			'container button[itemId=logoutPush]': {
				tap: 'onLogoutPush' 
			}
		}	  

 	},

	onActivate: function() {
        if (EvaluateIt.config.mode === 'test') {
            console.log('Main container is active');
        }
		
 	},

	onLoginPush: function(button) {
        /*if (EvaluateIt.config.mode === 'test') {
            console.log('Button Click');
        }
		var loginForm = Ext.Viewport.down('login');
		//create widget if it doesn't exist
		if(!loginForm){
			loginForm = Ext.widget('loginview');
		} 
		loginForm.reset();
		loginForm.showBy(button);*/

        url = EvaluateIt.utils.DataService.url('login');
        if (EvaluateIt.config.mode === 'test') {
            console.log(url);
            console.log('url: ' + url);
        }
        Ext.Ajax.request({

			cors: true,
			useDefaultXhrHeader: false,
            url: url,
            jsonData: {
                user: 'gms',
                password: 'python'
            },
            disableCaching: false,
            success: function (response) {

                var loginResponse = Ext.JSON.decode(response.responseText);

                if (EvaluateIt.config.mode === 'test') {
                    console.log(loginResponse.token);
                }

                if (response.status === 200) {
                    // The server will send a token that can be used throughout the app to confirm that the user is authenticated.
                    sessionToken = loginResponse.token;
					// TODO: write to sessionStorage
					//sessionStorage.sessionToken =  me.sessionToken;

                    if (EvaluateIt.config.mode === 'test') {
                        console.log(sessionToken);
                    }
                } else {
                    if (EvaluateIt.config.mode === 'test') {
                        console.log('sessionToken...' + sessionToken);
                    }
                    console.log(loginResponse.message);
                }
            },
            failure: function (response) {
                //me.sessionToken = null;
                //me.signInFailure('Login failed. Please try again later.');
            }
        });

	},

    onCancelPush: function(button) {
        if (EvaluateIt.config.mode === 'test') {
            console.log('Cancel Click');
        }
        var form = button.up('panel');
        form.hide();
        form.destroy();
    },

	onSavePush: function(button) {
        if (EvaluateIt.config.mode === 'test') {
            console.log('Button Click for Save');
        }
		var form = button.up('panel');
		//get the record 
		var record = form.getRecord();
		//get the form values
		var values = form.getValues();

        form.hide();

		//save the data to the Web SQL
		Ext.getStore('Sites').sync();

		// assemble record and push to remote server
        EvaluateIt.utils.DataService.push(record);

	},

	// TODO: add missing attributes to form; add image uploade using native or Cordova method
	onSelectPush: function(view, index, target, record, event) {

        if (EvaluateIt.config.mode === 'test') {
            console.log('Selected a SiteEvaluation from the list');
        }
		var pushForm = Ext.Viewport.down('pushForm');

		if(!pushForm){
			pushForm = Ext.widget('pushForm');
		}	 
		pushForm.setRecord(record);
		pushForm.showBy(target);

        if (EvaluateIt.config.mode === 'test') {
            console.log('Selected a Push from the list ' + index + ' ' + record.data.address);
        }
	}

});

