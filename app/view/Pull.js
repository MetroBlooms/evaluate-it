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
                                auth = sessionStorage.sessionToken + ':unknown',
                                hash = 'Basic ' + EvaluateIt.utils.Base64.encode(auth),
                                url = EvaluateIt.utils.DataService.url('login');

                            panel.getParent().setMasked({
                                xtype: 'loadmask',
                                message: 'Loading...'
                            });

                            // assemble url
                            url += '/api/htsql';
                            if (EvaluateIt.config.mode === 'test') {
                                console.log(url);
                            }

                            Ext.Ajax.on('beforerequest', (function(klass, request) {
                                return request.headers.Authorization = hash;
                            }), this);


                            // cross domain access cors request for data
                           	Ext.Ajax.request({
                                cors: true,
                                useDefaultXhrHeader: false,
                                url: url,
                                headers: {
                                    'Accept': 'application/json'
                                },
                                disableCaching: false,
								success: function (response) {
								   json = Ext.decode(response.responseText);
                                   // parse object into model
                                   EvaluateIt.utils.DataService.pull(json);
                                   panel.setHtml(response.responseText);
                                   panel.getParent().unmask();
								   //console.log('data: ' + response.responseText);
								},
								fail: function (e, jqxhr, settings, exception) {
                                    if (EvaluateIt.config.mode === 'test') {
                                        console.log(e);
                                    }
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


