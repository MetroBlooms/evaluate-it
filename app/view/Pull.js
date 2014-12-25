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

                            var records = [];

                            var store  = Ext.create('Ext.data.Store',{
                                fields : ['id','address'],
                                data: records,
                                paging : false
                            });

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

                                    // if we have a valid json object, then process it
                                    if(json !== null &&  typeof (json) !==  'undefined'){

                                        // loop through the data to load into store
                                        Ext.each(json.address, function(obj){
                                            //add the records to the array
                                            records.push({
                                                id: obj.id,
                                                address: obj.address
                                            })
                                            console.log('address ' + obj.address);
                                        });
                                        //update the store with the data that we got
                                        store.add(records);
                                    }

                                    store.load();

                                    console.log(store.getData(true)); // get object structure

                                    // write to template
                                    panel.setData(store);
                                    var tpl = new Ext.XTemplate(
                                        '<tpl for=".">',
                                           // '<div>{[values.address[0].id]}, {[values.address[0].address]}</div>',
                                            '<div>DATA: {[values.id]}, {data.address}</div>',
                                        '</tpl>'
                                    );
                                    panel.setHtml(tpl.apply(store));
                                    panel.getParent().unmask();
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


