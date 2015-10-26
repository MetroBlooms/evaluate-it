/**
 * Controller for handling session tokens
 * **See full documented usage** [HERE][1];
 * [1]: http://miamicoder.com/2012/adding-a-login-screen-to-a-sencha-touch-application-part-2/
 */
Ext.define('EvaluateIt.controller.Post', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
			postView: 'postview'
        },
        control: {
			postView: {
                onPostCommand: 'onPostCommand'
            }

        }
    },

    // Session token

    sessionToken: null,

    // test basic HTTP auth with token and JSON POST
    onPostCommand: function () {

        var url = EvaluateIt.utils.UtilityService.url('resource'),
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
                        console.log(loginResponse.message);
                    }
                }
            },
            failure: function (response) {
                //me.sessionToken = null;
                //me.signInFailure('Login failed. Please try again later.');
            }
        });

    }
});



