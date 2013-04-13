Ext.require(['Ext.data.proxy.SQL','EvaluateIt.model.Site']);

Ext.define('EvaluateIt.model.SiteMaintainer', {
    extend: 'Ext.data.Model',
    
    config: {
         //idProperty: 'id', // use with proxy.SQL 
	identifier: 'uuid', // use with proxy.localstorage 
        fields: [
            {name: 'name', type: 'string'},
	    {name: 'site_id', type: 'int'}
        ],
	proxy: {
           type: "localstorage"//,
           //database: 'Yo'
        },
	belongsTo: [
	{ 
	    model: 'EvaluateIt.model.Site', 
	    associationKey: 'siteId',
	    name: 'site',
	    instanceName: 'site',
	    getterName: 'getSite',
	    setterName: 'setSite',
	    foreignKey: 'site_id' 
	}]

    }
});
