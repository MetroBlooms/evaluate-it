/**
 * Load remote data via AJAX: display output
 *
 * TODO: Implement normalized model
 */
Ext.define('EvaluateIt.view.TestRest', {
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
						text: 'BasicAuthTest',
						iconCls: 'arrow_right',
						iconMask: true 
					},
					{
						xtype: 'button',
						itemId: 'logOutButton',
						text: 'TokenAuthPOST',
						iconCls: 'arrow_right',
						iconMask: true 
					},
                    {
                        xtype: 'button',
                        itemId: 'testButton',
                        text: 'DynamicForm',
                        iconCls: 'arrow_right',
                        iconMask: true
                    },

                    // test htsql as reporting tool
                    {
                        text: 'HTSQLTest',
                        handler: function() {
                            var panel = Ext.getCmp('Pull'),
								json = [],
                                records = [],
                                auth = sessionStorage.sessionToken + ':unknown',
                                hash = 'Basic ' + EvaluateIt.utils.Base64.encode(auth),
                                url = EvaluateIt.utils.DataService.url('login'),
                                store = Ext.create('Ext.data.Store',{
                                    fields : [
                                        'site',[
                                            {name: 'site_name', type:'string'},
                                            {name: 'id', type: 'int'}
                                        ],
                                        'address',[
                                            {name:'city',type: 'string'},
                                            {name:'state',type: 'string'}
                                        ],
                                        'geoposition',[
                                            {name:'latitude', type: 'float'},
                                            {name:'longitude',type: 'float'},
                                            {name:'accuracy',type: 'int'},
                                        ],
                                        'evaluator',[
                                            {name:'first_name',type: 'string'},
                                            {name:'type',type: 'string'},
                                        ],
                                        'comments'
                                    ],
                                    data: records,
                                    paging : false
                                });

                            panel.getParent().setMasked({
                                xtype: 'loadmask',
                                message: 'Loading...'
                            });

                            // url for endpoint

                            var criterion = 'id=' + sessionStorage.criterion1 + '|'  +'evaluator_id=' + sessionStorage.criterion2;
                            url += '/api/htsql/' + criterion;
                            if (EvaluateIt.config.mode === 'test') {
                                console.log(url);
                            }

                            // send auth header before Ajax request to disable auth form
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

                                    // if we have a valid json object we process it
                                    if(json !== null &&  typeof (json) !==  'undefined'){

                                        // loop through data to load into store
                                        Ext.each(json.evaluation, function(obj){
                                            // add records to array
                                            records.push({
                                                comments: obj.comments,
                                                site: {
                                                    id: obj.site.id,
                                                    site_name: obj.site.site_name,
                                                },
                                                address: {
                                                    address: obj.site.address.address,
                                                    state: obj.site.address.state
                                                },
                                                geoposition: {
                                                    latitude: obj.site.geoposition.latitude,
                                                    longitude: obj.site.geoposition.longitude,
                                                    accuracy: obj.site.geoposition.accuracy
                                                },
                                                evaluator: {
                                                    first_name: obj.evaluator.first_name,
                                                    type: obj.evaluator.type
                                                }
                                            })
                                            console.log('test ' + obj.comments + 'address ' + obj.site.address.address + 'latitude ' + obj.site.geoposition.latitude);
                                        });
                                        //update store with data
                                        store.add(records);
                                    }

                                    store.load();

                                    console.log(store.getData(true)); // get object structure
                                    //console.log (Ext.decode(response.responseText));

                                    // write to template
                                    panel.setData(store);
                                    var tpl = new Ext.XTemplate(
                                        '<tpl for=".">',
                                            'Evaluation: {data.comments}',
                                            '<div class="site">',
                                                'Site: {data.site.id}, {data.site.site_name}',
                                          //      '<tpl for="address">',
                                                    '<div class="address" style="padding: 0 0 10px 20px;">',
                                                        '<li>Address:</li>',
                                                        '<li>{data.address.address}</li>',
                                                        '<li>{data.address.state}</li>',
                                                    '</div>',
                                          //      '</tpl>',
                                          //      '<tpl for="geoposition">',
                                                    '<div class="geoposition" style="padding: 0 0 10px 20px;">',
                                                        '<li>Geoposition:</li>',
                                                        '<li>latitude: {data.geoposition.latitude}</li>',
                                                        '<li>longitude: {data.geoposition.longitude}</li>',
                                                    '</div>',
                                                    '<div class="geoposition" style="padding: 0 0 10px 20px;">',
                                                        '<li>Person:</li>',
                                                        '<li>name: {data.evaluator.first_name}</li>',
                                                        '<li>type: {data.evaluator.type}</li>',
                                                    '</div>',
                                           //     '</tpl>',
                                            '</div>',
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


