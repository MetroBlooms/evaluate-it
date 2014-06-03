/**
 * Start, stop and store location
 * Uses Phonegap API: uses device's native GPS
 *
 * TODO: Add user selected accuracy for stop condition
 */
 Ext.define('EvaluateIt.view.Geoposition', {
    extend: 'Ext.Container',
	alias: 'widget.pullview',
    config: {
        scrollable: true,
        items: [
            {
                xtype: 'panel',
                id: 'geoposition',
                styleHtmlContent: true
            },
            {
                docked: 'top',
                xtype: 'toolbar',

                /**
                 * @cfg {button}
                 * Start watching location;
                 * Stop watching location
                 */
                items: [
					{
						xtype: 'button',
						itemId: 'startWatch',
						text: 'WatchPosition',
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
					}

                ]

            },
            {
                xtype: 'selectfield',
                itemId: 'accuracy',
                name: 'accuracy',
                label: 'Desired accuracy',
                value: 10,
                autoSelect: false,
                options: [
                    {text: 'high',  value: 5},
                    {text: 'medium high',  value: 10},
                    {text: 'medium',  value: 15},
                    {text: 'medium low',  value: 20},
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
            }
        ]
	}

});








