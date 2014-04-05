Ext.require(['EvaluateIt.model.Site']);

Ext.define('EvaluateIt.model.Address', {
    extend: 'Ext.data.Model',
    config: {
        idProperty: 'id', // use with proxy.SQL 
	    //identifier: 'uuid', // use with proxy.localstorage
        fields: [
			{name: 'address', type: 'string'},
            {name: 'city', type: 'string'},
            {name: 'state', type: 'string'},
            {name: 'zipcode', type: 'string'},
			{name: 'county', type: 'string'}
        ],
		proxy: {
           	type: "sql", //"localstorage",
			database: 'Test'
        },
		hasOne:
		[
			{ 
				model: 'EvaluateIt.model.Site'
			}
		]

    }
});
