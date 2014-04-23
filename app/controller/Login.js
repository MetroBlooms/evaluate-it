/**
 * Controller for handling session tokens
 * **See full documented usage** [HERE][1];
 * [1]: http://miamicoder.com/2012/adding-a-login-screen-to-a-sencha-touch-application-part-2/
 */
Ext.define('EvaluateIt.controller.Login', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            loginView: 'loginview',
            pushView: 'pushview',
			pullView: 'pullview' 
        },
        control: {
            loginView: {
                signInCommand: 'onSignInCommand'
            },
			pushView: { 
                onSignOffCommand: 'onSignOffCommand'
            },
			pullView: { 
                onSignOffCommand: 'onSignOffCommand'
            }

        }
    },

    // Session token

    sessionToken: null,

    // Transitions
    getSlideLeftTransition: function () {
        return { type: 'slide', direction: 'left' };
    },

    getSlideRightTransition: function () {
        return { type: 'slide', direction: 'right' };
    },

    onSignInCommand: function (view, username, password) {

        console.log('Username: ' + username + '\n' + 'Password: ' + password);

        var me = this,
            loginView = me.getLoginView(),
			url;

        // assemble url
        url = EvaluateIt.utils.DataService.url('login');
        console.log(url);

		console.log('url: ' + url);

        if (username.length === 0 || password.length === 0) {

            loginView.showSignInFailedMessage('Please enter your username and password.');
            return;
        }

        loginView.setMasked({
            xtype: 'loadmask',
            message: 'Signing In...'
        });

        Ext.Ajax.request({

			cors: true,
			useDefaultXhrHeader: false,
            url: url,
			method: 'post',
            params: {
                user: username,
                pwd: password
            },
            success: function (response) {

                var loginResponse = Ext.JSON.decode(response.responseText);

				console.log('response/message ' + loginResponse.success + ' ' + loginResponse.message + ' ' + loginResponse.sessionToken + ' ' + loginResponse.evaluator_id + ' ' + loginResponse.firstname + ' ' + loginResponse.lastname + ' ' + loginResponse.email); 

				alert('Welcome ' + ' ' + loginResponse.firstname + ' ' + loginResponse.lastname + '!');

                if (loginResponse.success) {
                    // The server will send a token that can be used throughout the app to confirm that the user is authenticated.
                    me.sessionToken = loginResponse.sessionToken;
					// TODO: write to sessionStorage
					sessionStorage.clear();
					sessionStorage.sessionToken =  me.sessionToken;
					sessionStorage.evaluator_id =  loginResponse.evaluator_id;
					sessionStorage.firstname =  loginResponse.firstname;
					sessionStorage.lastname =  loginResponse.lastname;
					sessionStorage.email =  loginResponse.email;
	
					sessionStorage.sessionCreatedWhen = new Date(); 
					console.log('sessionToken' + sessionStorage.sessionToken + ' ' + loginResponse.message);
					me.signInSuccess(loginResponse.message);     //Just simulating success.
                } else {
					console.log('sessionToken...' + sessionStorage.sessionToken);
                    me.signInFailure(loginResponse.message);
                }
            },
            failure: function (response) {
                me.sessionToken = null;
                me.signInFailure('Login failed. Please try again later.');
            }
        });
    },

    signInSuccess: function (message) {
        console.log('Signed in.');
        var loginView = this.getLoginView();
		loginView.showSignInSucceededMessage(message);
        loginView.setMasked(false);

    },

    signInFailure: function (message) {
		console.log('message' + message);
        var loginView = this.getLoginView();
        loginView.showSignInFailedMessage(message);
        loginView.setMasked(false);
    },

    onSignOffCommand: function () {
		var	url;

        // assemble url
        url = EvaluateIt.utils.DataService.url('logout');
        console.log(url);

        var me = this;

        Ext.Ajax.request({
			cors: true,
			useDefaultXhrHeader: false,
            url: url,
			method: 'get',
            //params: {
            //    sessionToken: me.sessionToken
            //},
            success: function (response) {
				
				var logoutResponse = Ext.JSON.decode(response.responseText);

				alert('Logoff!!' + logoutResponse.success + ' ' + logoutResponse.message);
            },
            failure: function (response) {
				alert('Error in logoff!!' + logoutResponse.success + ' ' + logoutResponse.message);
            }
        });

    }
});



