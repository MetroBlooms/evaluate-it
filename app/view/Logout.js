Ext.define('EvaluateIt.view.Logout', {
    extend: 'Ext.form.Panel',
    requires: ['Ext.TitleBar'],
    alias: 'widget.logoutview',
    id: 'logoutView',
	config: {
 		title: 'Logout',

		// test

		left: 0,
		top: 0,

		// Make it modal so you can click the mask to hide the overlay
		modal: true,
		hideOnMaskTap: true,

		// Set the width and height of the panel
		//width: 400,
		//height: 330,
		width: Ext.os.deviceType == 'Phone' ?  screen.width : 300,
		height: Ext.os.deviceType == 'Phone' ?  200 : 300,
		scrollable: true,
	 	layout: {
			type: 'vbox'
		},
		defaults: {
			margin: '0 0 5 0',
			labelWidth: '40%',
			labelWrap: true
		},
        items: [{
            xtype: 'titlebar',
            title: 'Log out test',
            docked: 'top',
            items: [
                {
                    xtype: 'button',
                    text: 'Logout',
                    itemId: 'logOutButton'
                },
				{
				xtype: "button",
					ui: "close",
					text: "Close",
					// destroy form.Panel overlay to return to tree store view 
					handler: function() {
						Ext.getCmp('logoutView').destroy();						
					}
				},

            ]
        }],
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
