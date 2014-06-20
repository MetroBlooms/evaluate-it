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
                id: 'Pull',
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
                            EvaluateIt.utils.Global.get_position();
						}
					},
            		{
						xtype: 'button',
						itemId: 'stopWatch',
						text: 'StopWatch',
						iconCls: 'arrow_right',
						iconMask: true,
						handler: function() {
                            EvaluateIt.utils.Global.clear_watch();
						}
					}

                ]
            }
        ]
	}

});




