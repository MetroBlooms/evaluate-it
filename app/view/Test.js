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

        width: Ext.os.deviceType == 'Phone' ?  screen.width : 550,
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
                title: 'Proof of concept:',
                items: [
                    {
                        xtype: 'selectfield',
                        itemId: 'criterion1TextField',
                        name: 'criterion1TextField',
                        autoSelect: false,
                        placeHolder: 'Select systolic criterion',
                        options: [
                            {text: ''},
                            {text: '>= 160',  value: '1'},
                            {text: '< 160',  value: '2'}
                        ]
                    },
                    {
                        xtype: 'selectfield',
                        itemId: 'criterion3TextField',
                        name: 'criterion3TextField',
                        autoSelect: false,
                        placeHolder: 'Select ldl criterion',
                        options: [
                            {text: ''},
                            {text: '>= 160',  value: '1'},
                            {text: '< 160',  value: '2'}
                        ]
                    },
                    {
                        xtype: 'selectfield', // see
                        itemId: 'criterion2TextField',
                        name: 'criterion2TextField',
                        label: 'Select Test',
                        labelWrap: true,
                        required: true,
                        displayField: 'string_value',
                        valueField: 'sid',
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
            criterion3Field = me.down('#criterion3TextField');

            sessionStorage.criterion1 = criterion1Field.getValue();
            sessionStorage.criterion2 = criterion2Field.getValue();
            sessionStorage.criterion3 = criterion3Field.getValue();

        if (EvaluateIt.config.mode === 'test') {
            console.log('c1 & c2:'
                + sessionStorage.criterion1 + ' '
                + sessionStorage.criterion2 + ' '
                + sessionStorage.criterion3);
        }
        //label.hide();

        // Using a delayed task in order to give the hide animation above
        // time to finish before executing the next steps.
        var task = Ext.create('Ext.util.DelayedTask', function () {

            //label.setHtml('');

            //me.fireEvent('signInCommand', me, username, password);

            criterion1Field.setValue('');
            criterion2Field.setValue('');
            criterion3Field.setValue('');
        });

        task.delay(500);

    }

});
