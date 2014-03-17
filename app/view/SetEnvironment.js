/**
 * Set global environment between production and development RESTFul web API
 */
 Ext.define('EvaluateIt.view.SetEnvironment', {
    extend: 'Ext.form.FormPanel',
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
                        items: [
                            {
                                text: 'Production',
                                pressed: true,
                                value: 'live'
                            },
                            {
                                text: 'Development',
                                value: 'test'
                            }
                            // TODO: display text for which environment has been selected;
                            // set EvaluateIt.config.mode via handler

                        ]
                    }

                ]

            }
        ]
	}
});

