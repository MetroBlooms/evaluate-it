/**
 * Create a list of sites that have been evaluated and can be pushed to the remote server.
 * First create a Site model with defined fields,
 * then create a store to contain the data,
 * finally create the list itself using an xtype widget, which gets its filtered data
 * (on category = 'push' by regex for existing address in EvaluateIt.controller.Main) from the store
 *
 */
Ext.define('EvaluateIt.view.Push', {
		extend: 'Ext.Container',
      	fullscreen: true,
		alias: 'widget.pushview',
		
		config: {
			layout: 'vbox',
			layout: 'fit',
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

