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

        if (EvaluateIt.config.mode === 'test') {
            console.log('Username: ' + username + '\n' + 'Password: ' + password);
        }

        var me = this,
            loginView = me.getLoginView(),
			url;

        // assemble url
        url = EvaluateIt.utils.DataService.url('login');
        if (EvaluateIt.config.mode === 'test') {
            console.log(url);
            console.log('url: ' + url);
        }

       /* if (username.length === 0 || password.length === 0) {

            loginview.showsigninfailedmessage('please enter your username and password.');
            return;
        }*/

        loginview.setmasked({
            xtype: 'loadmask',
            message: 'signing in...'
        });

        ext.ajax.request({

			cors: true,
			usedefaultxhrheader: false,
            url: url,
            jsondata: {
                user: username,
                password: password
            },
            disablecaching: false,
            success: function (response) {

                var loginresponse = ext.json.decode(response.responsetext);

                if (evaluateit.config.mode === 'test') {
                    console.log('response/message ' + loginresponse.success + ' ' + loginresponse.message + ' ' + loginresponse.sessiontoken + ' ' + loginresponse.evaluator_id + ' ' + loginresponse.firstname + ' ' + loginresponse.lastname + ' ' + loginresponse.email);
                }

				alert('welcome ' + ' ' + loginresponse.firstname + ' ' + loginresponse.lastname + '!');

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
                    if (EvaluateIt.config.mode === 'test') {
                        console.log(loginResponse);
                    }
					me.signInSuccess(loginResponse.message);     //Just simulating success.
                } else {
                    if (EvaluateIt.config.mode === 'test') {
                        console.log('sessionToken...' + sessionStorage.sessionToken);
                    }
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
        if (EvaluateIt.config.mode === 'test') {
            console.log('Signed in.');
        }
        var loginView = this.getLoginView();
		loginView.showSignInSucceededMessage(message);
        loginView.setMasked(false);

    },

    signInFailure: function (message) {
        if (EvaluateIt.config.mode === 'test') {
            console.log('message' + message);
        }
        var loginView = this.getLoginView();
        loginView.showSignInFailedMessage(message);
        loginView.setMasked(false);
    },

    onSignOffCommand: function () {

        var url = EvaluateIt.utils.DataService.url('login'),
            auth = sessionStorage.sessionToken + ':unknown',
            hash = 'Basic ' + EvaluateIt.utils.Base64.encode(auth),
            obj = /*{
                site: {
                    "id": "37251",
                    "site_name": "TestSite",
                    "address": {
                        "address": "1234 Blaisdell Ave",
                        "city": "Minneapolis",
                        "state": "MN",
                        "zip": "55456",
                        "neighborhood": "Kingfield",
                        "county": "Hennepin"
                    },
                    "geolocation": {
                        "latitude":  "41.6544",
                        "longitude":  "73.3322",
                        "accuracy": "45"
                    },
                    "person": {
                        "type": "evaluator",
                        "first_name": "me"
                    },
                    "evaluation": {
                        "comments":  "A test...",
                        "exists": true
                    }
                }
            };*/
            {
                site: {
                    "id": "37251",
                    "site_name": "TestSite 2",
                    "address": {
                        "address": "1235 Blaisdell Ave",
                        "city": "Minneapolis",
                        "state": "MN",
                        "zip": "55456",
                        "neighborhood": "Kingfield",
                        "county": "Hennepin"
                    },
                    "geolocation": {
                        "latitude":  "41.6544",
                        "longitude":  "73.3323",
                        "accuracy": "46"
                    },
                    "person": {
                        "type": "evaluator",
                        "first_name": "you"
                    },
                    "evaluation": {
                        "comments":  "Another test...",
                        "exists": true
                    }
                }
            };

        url += '/api/resource';

        if (EvaluateIt.config.mode === 'test') {
            console.log('token: ' + sessionStorage.sessionToken);
            console.log('url: ' + url);
        }

        Ext.Ajax.on('beforerequest', (function(klass, request) {
            return request.headers.Authorization = hash;
        }), this);

        Ext.Ajax.request({

            cors: true,
            useDefaultXhrHeader: false,
            url: url,
            jsonData: obj,
            headers: {
                'Accept': 'application/json'
            },
            disableCaching: false,
            success: function (response) {

                var loginResponse = Ext.JSON.decode(response.responseText);

                if (EvaluateIt.config.mode === 'test') {
                    console.log('Success!');
                }

                if (response.status === 200) {

                    if (EvaluateIt.config.mode === 'test') {
                        console.log('in resource!');
                    }
                } else {
                    if (EvaluateIt.config.mode === 'test') {
                        console.log('sessionToken...' + sessionStorage.sessionToken);
                    }
                    console.log(loginResponse.message);
                }
            },
            failure: function (response) {
                //me.sessionToken = null;
                //me.signInFailure('Login failed. Please try again later.');
            }
        });

    }
});



