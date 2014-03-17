/**
 * Set global environment between production and development RESTFul web API
 */
 Ext.define('EvaluateIt.view.SetEnvironment', {
    extend: 'Ext.Container',
	alias: 'widget.setEnvironment',
    config: {
        scrollable: true,
        items: [
            {
                xtype: 'panel',
                id: 'Clear',
                styleHtmlContent: true
            },
            {
                docked: 'top',
                xtype: 'toolbar',
                items: [
                    {
                        xtype: 'segmentedbutton',
                        allowDepress: true,
                        // listener to capture pressed value
                        listeners: {
                            toggle: function (segBtn, btn, isPressed) {
                                var selLabels = [];
                                Ext.Array.forEach(segBtn.getPressedButtons(), function (item) {
                                    selLabels.push(item.config.text);
                                    // set config parameter for mode
                                    if (item.config.text === 'Production') {
                                        EvaluateIt.config.mode = 'live';
                                    }
                                    if (item.config.text === 'Development') {
                                        EvaluateIt.config.mode = 'test';
                                    }
                                    console.log('item.config.text' + item.config.text);
                                }); // forEach()
                                //Ext.Msg.alert('pressedButtons (' + selLabels.length + '):', Ext.JSON.encode(selLabels));
                                console.log('EvaluateIt.config.mode ' + EvaluateIt.config.mode);
                            } // toggle
                        },
                        items: [
                            {
                                text: 'Production'
                            },
                            {
                                text: 'Development'
                            }

                        ]
                    }

                ]

            }
        ]
	}
});

