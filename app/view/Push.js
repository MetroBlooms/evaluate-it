Ext.define('EvaluateIt.view.Push', {
		extend: 'Ext.Container',
      	fullscreen: true,
		config: {
			layout: 'vbox',
			items: [
				{
					xtype : 'toolbar',
					docked: 'top',
					/*items: [
						{
							xtype: 'button',
							itemId: 'addPush',
							text: 'Add a Thing',
							iconCls: 'arrow_right',
							iconMask: true 
						}

					]*/
				},
				{
					flex: 1,
					xtype: 'pushList'

				}
			]
		}
});

