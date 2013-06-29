Ext.define('EvaluateIt.view.Push', {
		extend: 'Ext.Container',
      	fullscreen: true,
		//requires: ['Ext.TitleBar'],
		alias: 'widget.pushview',
		
		config: {
			layout: 'vbox',
			layout: 'fit',
			//id: 'pushview',
			items: [
				{
					xtype: 'toolbar',
					docked: 'top',
					items: [
						{
							xtype: 'button',
							itemId: 'loginButton',
							text: 'Login',
							iconCls: 'arrow_right',
							iconMask: true 
						},
						{
							xtype: 'button',
							itemId: 'logOutButton',
							text: 'Logout',
							iconCls: 'arrow_right',
							iconMask: true 
            			}

					]

				},
				{
					flex: 1,
					xtype: 'pushList'
				}
			
		],
        listeners: [{
            delegate: '#logOutButton',
            event: 'tap',
            fn: 'onLogOutButtonTap'
        }]
    },
    onLogOutButtonTap: function () {
        this.fireEvent('onSignOffCommand');
    }
	
});

