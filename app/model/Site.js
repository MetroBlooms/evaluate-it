//Ext.require(['Ext.data.proxy.SQL']);

Ext.define('EvaluateIt.model.Site', {
    //extend: 'Ext.data.Model',
    extend: 'EvaluateIt.model.BaseModel',
    config: {
        idProperty: 'id', // use with proxy.SQL
        // identifier: 'uuid', // use with proxy.localstorage
        fields: [
            {name: 'remoteSiteId', type: 'int'},
            {name: 'siteName', type: 'string'}, // does site have a formal name
            {name: 'address_id', type: 'int'}

        ],
        proxy: {
            type: "sql", //"localstorage",
            database: 'Test'
        },
        associations:
        [
			{   type: 'hasMany',
				model: 'EvaluateIt.model.Evaluation', 
				name: 'evaluations'

			},
		    {
                type: 'hasMany',
                model: 'EvaluateIt.model.SiteMaintainer',
                name: 'siteMaintainers'
            },
			{
                type: 'hasOne',
                model: 'EvaluateIt.model.Geolocation',
                associationKey: 'geolocationId'

			},
            {
                type: 'hasOne',
                model: 'EvaluateIt.model.Address',
                associationKey: 'addressId',
                getterName: 'getAddress',
                setterName: 'setAddress',
                name: 'address'
            }
		] 
    }
});


