/**
 * **See full documented usage** [HERE][1];
 * [1]: http://miamicoder.com/2012/adding-a-login-screen-to-a-sencha-touch-application-part-2/
 *
 * This implementation is through item buttons accessed in EvaluateIt.view.Pull and EvaluateIt.view.Push;
 * authentication token is then written to sessionStorage
 *
 * TODO: Set tablet height/width
 */
Ext.define('EvaluateIt.view.Login', {
    extend: 'Ext.form.Panel',
    alias: "widget.loginview",
	id: 'loginView',
    requires: ['Ext.form.FieldSet', 'Ext.form.Password', 'Ext.Label', 'Ext.Img', 'Ext.util.DelayedTask'],

    config: {
        title: 'Login',

		left: 0,
		top: 0,

		// Make it modal so you can click the mask to hide the overlay
		modal: true,
		hideOnMaskTap: true,

		// Set the width and height of the panel

		width: Ext.os.deviceType == 'Phone' ?  screen.width : 300,
		height: Ext.os.deviceType == 'Phone' ?  screen.height : 400,
		scrollable: true,
	 	layout: {
			type: 'vbox'
		},
		defaults: {
			margin: '0 0 5 0',
			labelWidth: '40%',
			labelWrap: true
		},

		items: [
            {
                xtype: 'image',
                src: 'resources/images/mb.gif',
                height: 80, 
				width: '100%' 
            },
            {
                xtype: 'label',
                html: 'Login failed. Please enter the correct credentials.',
                itemId: 'signInFailedLabel',
                hidden: true,
                hideAnimation: 'fadeOut',
                showAnimation: 'fadeIn',
                style: 'color:#990000;margin:5px 0px;'
            },
			{
                xtype: 'label',
                html: 'Login Succeeded!',
                itemId: 'signInSucceededLabel',
                hidden: true,
                hideAnimation: 'fadeOut',
                showAnimation: 'fadeIn',
                style: 'color:#990000;margin:5px 0px;'
            },

            {
                xtype: 'fieldset',
                title: 'Login to Pull or Push Data:',
                items: [
                    {
                        xtype: 'textfield',
                        placeHolder: 'Username',
                        itemId: 'userNameTextField',
                        name: 'userNameTextField',
                        required: true
                    },
                    {
                        xtype: 'passwordfield',
                        placeHolder: 'Password',
                        itemId: 'passwordTextField',
                        name: 'passwordTextField',
                        required: true
                    }
                ]
            },
            {
                xtype: 'button',
                itemId: 'logInButton',
                ui: 'action',
                padding: '10px',
                text: 'Log In'
            },
			{
				xtype: 'button',
				ui: 'close',
				text: 'Close',

                /**
                 * destroy form.Panel overlay to return to tree store view
                 */

				handler: function() {
					Ext.getCmp('loginView').destroy();						
				}
			}

        ],
		listeners: [{
			delegate: '#logInButton',
			event: 'tap',
			fn: 'onLogInButtonTap'
		}]
    },

    onLogInButtonTap: function () {

        var me = this,
            usernameField = me.down('#userNameTextField'),
            passwordField = me.down('#passwordTextField'),
            label = me.down('#signInFailedLabel'),
            username = usernameField.getValue(),
            password = passwordField.getValue();

        label.hide();

        // Using a delayed task in order to give the hide animation above
        // time to finish before executing the next steps.
        var task = Ext.create('Ext.util.DelayedTask', function () {

            label.setHtml('');

            me.fireEvent('signInCommand', me, username, password);

            usernameField.setValue('');
            passwordField.setValue('');
        });

        task.delay(500);

    },
	
    showSignInSucceededMessage: function (message) {
		console.log('sign on: ' + message);
        var label = this.down('#signInSucceededLabel');
        label.setHtml(message);
        label.show();
    },

    showSignInFailedMessage: function (message) {
        var label = this.down('#signInFailedLabel');
        label.setHtml(message);
        label.show();
    }
});
