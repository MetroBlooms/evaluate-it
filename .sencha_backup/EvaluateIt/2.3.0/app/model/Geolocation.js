Ext.define('EvaluateIt.model.Geolocation', {
    extend: 'Ext.data.Model',
    
    config: {
	 //idProperty: 'id', // use with proxy.SQL 
	identifier: 'uuid', // use with proxy.localstorage 
        fields: [
            {name: 'latitude', type: 'float'},
            {name: 'longitude', type: 'float'},
            {name: 'accuracy', type: 'float'},
            {name: 'datestamp', type: 'string'}
        ],
	belongsTo: [{ model: 'EvaluateIt.model.Site', associationKey: 'siteId' }]

    }
});
