/**
 * Load remote data via AJAX: display output
 *
 * TODO: Implement normalized model
 */
Ext.define('EvaluateIt.view.Pull', {
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
					},
                    {
                        text: 'Pull data',
                        handler: function() {
                            var panel = Ext.getCmp('Pull'),
								json = [],
                                url;

                            panel.getParent().setMasked({
                                xtype: 'loadmask',
                                message: 'Loading...'
                            });

                            // assemble url
                            url = EvaluateIt.utils.DataService.url('pull');
							console.log(url);

                            // cross domain access cors request for data
                           	Ext.Ajax.request({
								cors: true,
								url : url,
								useDefaultXhrHeader: false,
								success: function (response) {
								   json = Ext.decode(response.responseText);
                                   // parse object into model
                                   EvaluateIt.utils.DataService.pull(json);
                                   panel.setHtml(response.responseText);
                                   panel.getParent().unmask();
								   console.log('data: ' + response.responseText);
								},
								fail: function (e, jqxhr, settings, exception) {
									console.log(e);
								}
							});
                        }
                    }
                ]
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


