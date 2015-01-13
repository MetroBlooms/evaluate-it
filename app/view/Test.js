/**
 * **See full documented usage** [HERE][1];
 * [1]: http://miamicoder.com/2012/adding-a-login-screen-to-a-sencha-touch-application-part-2/
 *
 * This implementation is through item buttons accessed in EvaluateIt.view.Pull and EvaluateIt.view.Push;
 * authentication token is then written to sessionStorage
 *
 * TODO: Set tablet height/width
 */
Ext.define('EvaluateIt.view.Test', {
    extend: 'Ext.form.Panel',
    alias: "widget.testview",
    id: 'testView',
    requires: ['Ext.form.FieldSet', 'Ext.form.Password', 'Ext.Label', 'Ext.Img', 'Ext.util.DelayedTask'],

    config: {
        title: 'Test',

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
                xtype: 'fieldset',
                title: 'Test data assemblage:',
                items: [
                    {
                        xtype: 'textfield',
                        placeHolder: 'criterion1',
                        itemId: 'criterion1TextField',
                        name: 'criterion1TextField',
                        required: true
                    },
                    {
                        xtype: 'textfield',
                        placeHolder: 'criterion2',
                        itemId: 'criterion2TextField',
                        name: 'criterion2TextField',
                        required: true
                    },
                    {
                        xtype: 'selectfield',
                        label: 'Select Test',
                        labelWrap: true,
                        required: true,
                        displayField: 'description',
                        valueField: 'value',
                        store: 'FactorTests'
                    }
                ]
            },
            {
                xtype: 'button',
                itemId: 'testSubmitButton',
                ui: 'action',
                padding: '10px',
                text: 'Submit parameters'
            },
            {
                xtype: 'button',
                ui: 'close',
                text: 'Close',

                /**
                 * destroy form.Panel overlay to return to tree store view
                 */

                handler: function() {
                    Ext.getCmp('testView').destroy();
                }
            }

        ],
        listeners: [{
            delegate: '#testSubmitButton',
            event: 'tap',
            fn: 'onTestButtonTap'
        }]
    },

    onTestButtonTap: function () {

        var me = this;
            criterion1Field = me.down('#criterion1TextField'),
            criterion2Field = me.down('#criterion2TextField');
            //label = me.down('#signInFailedLabel');

            sessionStorage.criterion1 = criterion1Field.getValue();
            sessionStorage.criterion2 = criterion2Field.getValue();

        console.log('c1 & c2:' + sessionStorage.criterion1 + ' ' + sessionStorage.criterion2)
        //label.hide();

        // Using a delayed task in order to give the hide animation above
        // time to finish before executing the next steps.
        var task = Ext.create('Ext.util.DelayedTask', function () {

            //label.setHtml('');

            //me.fireEvent('signInCommand', me, username, password);

            criterion1Field.setValue('');
            criterion2Field.setValue('');
        });

        task.delay(500);

    },

    showSignInSucceededMessage: function (message) {
        if (EvaluateIt.config.mode === 'test') {
            console.log('sign on: ' + message);
        }
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
