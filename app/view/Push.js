Ext.define('EvaluateIt.view.Push', {
		extend: 'Ext.Container',
      	fullscreen: true,
		config: {
			//layout: 'vbox',
			layout: 'fit',
			items: [
				{
					xtype : 'toolbar',
					docked: 'top'
				},
				{
					flex: 1,
					xtype: 'pushList'
				}
			]
		}
});

