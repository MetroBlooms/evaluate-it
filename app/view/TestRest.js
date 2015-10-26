/**
 * Load remote data via AJAX: display output
 *
 * TODO: refactor
 * 1. data store with variants
 * 2. HTML template with variants
 * 3. Ajax method with differing URL
 * 4. Control button driven by endpoint URL
 */
Ext.define('EvaluateIt.view.TestRest', {
    extend: 'Ext.Container',
	alias: 'widget.postview',
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
                        xtype: 'image',
                        src: 'resources/images/cv.png',
                        height: 80,
                        width: 280
                    },
					{
						xtype: 'button',
						itemId: 'authButton',
						text: 'BasicAuthTest',
						iconCls: 'arrow_right',
						iconMask: true 
					},
					{
						xtype: 'button',
						itemId: 'postButton',
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

                    // SQLAlchemy endpoint for aggregated data
                    {
                        text: 'GET JSON',
                        // http://stackoverflow.com/questions/11159480/sencha-touch-store-json-file-containing-array ????
                        handler: function() {
                            var panel = Ext.getCmp('Pull'),
                                json = [],
                                records = [],
                                url = EvaluateIt.utils.UtilityService.url('aggregate'),//url for endpoint
                                auth = sessionStorage.sessionToken + ':unknown',
                                hash = 'Basic ' + EvaluateIt.utils.Base64.encode(auth),
                                store = Ext.create('Ext.data.Store',{
                                    fields : [
                                        'attribute',
                                        'sid',
                                        'value',
                                        'N',
                                        'source'
                                    ],
                                    data: records,
                                    paging : false
                                });

                            panel.getParent().setMasked({
                                xtype: 'loadmask',
                                message: 'Loading...'
                            });


                            var criterion = sessionStorage.criterion1;
                            var test = sessionStorage.criterion3;

                            // url for endpoint
                            //url += criterion + '/' + test;
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

                                        Ext.each(json, function(entry) {
                                            Ext.each(json.items || [], function(tuple) {

                                                records.push({
                                                    N: tuple[0].N,
                                                    sid: tuple[0].sid,
                                                    value: tuple[0].value,
                                                    attribute: tuple[0].attribute,
                                                    source: tuple[0].source
                                                });

                                                if (EvaluateIt.config.mode === 'test') {
                                                    console.log(tuple[0].source
                                                        + 'N ' + tuple[0].N
                                                        + 'attribute ' + tuple[0].attribute
                                                        + 'sid ' + tuple[0].sid
                                                        + 'value ' + tuple[0].value);
                                                }
                                            });
                                        });

                                        if (EvaluateIt.config.mode === 'test') {
                                            console.log(records);
                                        }

                                        //update store with data
                                        store.add(records);
                                    }

                                    store.load();

                                    if (EvaluateIt.config.mode === 'test') {
                                        console.log(store.getData(true)); // get object structure
                                    }

                                    // render template
                                    EvaluateIt.utils.UtilityService.template(panel, store);

                                },
                                fail: function (e, jqxhr, settings, exception) {
                                    if (EvaluateIt.config.mode === 'test') {
                                        console.log(e);
                                    }
                                }
                            });
                        }
                    },

                    // HTSQL endpoint for deidentified data
                    /*{
                        text: 'Clinical',
                        handler: function() {
                            var panel = Ext.getCmp('Pull'),
                                json = [],
                                records = [],
                                auth = sessionStorage.sessionToken + ':unknown',
                                hash = 'Basic ' + EvaluateIt.utils.Base64.encode(auth),
                                url = EvaluateIt.utils.UtilityService.url('login'),
                                store = Ext.create('Ext.data.Store',{
                                    fields : [
                                        'attribute',[
                                            {name: 'attribute_value', type:'string'}
                                        ],
                                        'sid',
                                        'value',
                                        'lft',
                                        'source'
                                    ],
                                    data: records,
                                    paging : false
                                });

                            panel.getParent().setMasked({
                                xtype: 'loadmask',
                                message: 'Loading...'
                            });

                            var criterion = + sessionStorage.criterion2;

                            // url for endpoint
                            url = EvaluateIt.utils.UtilityService.url('clinical');
                            url += criterion;
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
                                        Ext.each(json.clinical_data, function(obj){
                                            // add records to array
                                            records.push({
                                                lft: obj.lft,
                                                sid: obj.sid,
                                                value: obj.value,
                                                source: obj.source,
                                                attribute: obj.attribute_id // : {
                                                //    attribute_value: obj.attribute.attribute_value
                                               // }
                                            });

                                            if (EvaluateIt.config.mode === 'test') {
                                                console.log(obj.source
                                                    + 'lft ' + obj.lft
                                                    + 'sid ' + obj.sid
                                                    + 'value ' + obj.value
                                                    + 'attribute ' + obj.attribute_id ); //obj.attribute.attribute_value
                                            }
                                        });
                                        //update store with data
                                        store.add(records);
                                    }

                                    store.load();

                                    if (EvaluateIt.config.mode === 'test') {
                                        console.log(store.getData(true)); // get object structure
                                    }

                                    // render template
                                    EvaluateIt.utils.UtilityService.template(panel, store);

                                },
                                fail: function (e, jqxhr, settings, exception) {
                                    if (EvaluateIt.config.mode === 'test') {
                                        console.log(e);
                                    }
                                }
                            });
                        }
                    },

                    // HTSQL endpoint for phi data (TODO: deal with UNION query)
                    {
                        text: 'Phi',
                        handler: function() {
                            var panel = Ext.getCmp('Pull'),
                                json = [],
                                records = [],
                                auth = sessionStorage.sessionToken + ':unknown',
                                hash = 'Basic ' + EvaluateIt.utils.Base64.encode(auth),
                                url = EvaluateIt.utils.UtilityService.url('login'),
                                store = Ext.create('Ext.data.Store',{
                                    fields : [
                                        'attribute_value',
                                        'sid',
                                        'value',
                                        'lft',
                                        'source'
                                    ],
                                    data: records,
                                    paging : false
                                });

                            panel.getParent().setMasked({
                                xtype: 'loadmask',
                                message: 'Loading...'
                            });

                            var criterion = + sessionStorage.criterion2;

                            // url for endpoint
                            url = EvaluateIt.utils.UtilityService.url('phi');
                            url += criterion;
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
                                        Ext.each(json.phi, function(obj){
                                            // add records to array
                                            records.push({
                                                lft: obj.lft,
                                                sid: obj.sid,
                                                value: obj.value,
                                                attribute_value: obj.attribute_value,
                                                source: obj.source
                                            });

                                            if (EvaluateIt.config.mode === 'test') {
                                                console.log(obj.source
                                                    + 'lft ' + obj.lft
                                                    + 'sid ' + obj.sid
                                                    + 'value ' + obj.value
                                                    + 'attribute ' + obj.attribute_value);
                                            }
                                        });
                                        //update store with data
                                        store.add(records);
                                    }
                                    store.load();

                                    if (EvaluateIt.config.mode === 'test') {
                                        console.log(store.getData(true)); // get object structure
                                    }

                                    // render template
                                    EvaluateIt.utils.UtilityService.template(panel, store);
                                },
                                fail: function (e, jqxhr, settings, exception) {
                                    if (EvaluateIt.config.mode === 'test') {
                                        console.log(e);
                                    }
                                }
                            });
                        }
                    }*/



                ]
            }
        ],
        listeners: [{
            delegate: '#postButton',
            event: 'tap',
            fn: 'onPostButtonTap'
        }]
    },
    onPostButtonTap: function () {
        this.fireEvent('onPostCommand');
    }


});


