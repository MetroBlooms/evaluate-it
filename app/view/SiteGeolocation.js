/**
 *
 * Start, stop and store location
 * Uses Phonegap API: uses device's native GPS; select  accuracy for stop condition
 *
 * Create a list of sites for which to tie a geolocation to an address.
 * First create a SiteEvaluation model with defined fields, then create a store to contain
 * the data, finally create the list of addressesitself, which gets its filtered data (on category = 'evaluations' by regex for existing address in Main.js) from the store; when an address is selected, Google maps will show the saved geolocation in sessionstorage and then the option to write the coordinates to the record asssociated with the address is given to the user
 *
 */
Ext.define('EvaluateIt.view.SiteGeolocation', {
    extend: 'Ext.Container',
    fullscreen: true,
    alias: 'widget.siteGeolocationForm',
    config: {
        layout: 'vbox',
        items: [
            {
                docked: 'top',
                xtype: 'toolbar',
                /**
                 * @cfg {button}
                 * Start watching location;
                 * Stop watching location
                 */
                items: [

                    /*{
                        xtype: 'button',
                        itemId: 'setPosition',
                        text: 'setPosition',
                        iconCls: 'arrow_right',
                        iconMask: true,
                        handler: function() {
                            EvaluateIt.utils.UtilityService.get_position();
                        }
                    },
                    {
                        xtype: 'button',
                        itemId: 'stopWatch',
                        text: 'StopWatch',
                        iconCls: 'arrow_right',
                        iconMask: true,
                        handler: function() {
                            EvaluateIt.utils.UtilityService.clear_watch();
                        }
                    },
                    {
                        xtype: 'selectfield',
                        itemId: 'accuracy',
                        autoSelect: false,
                        placeHolder: 'accuracy',
                        options: [
                            {text: ''},
                            {text: 'high',  value: 5},
                            {text: 'med high',  value: 10},
                            {text: 'medium',  value: 15},
                            {text: 'med low',  value: 20},
                            {text: 'low',  value: 40}
                        ],
                        listeners: {
                            change: function(field, value) {
                                if (value instanceof Ext.data.Model) {
                                    value = value.get(field.getValueField());
                                }
                                console.log(value);
                                // set accuracy as config variable
                                EvaluateIt.config.accuracy = value;
                            }
                        }
                    },*/
                ]
            },
            {
                flex: 1,
                xtype: 'siteGeolocationList'
            }
        ]
    }

});








