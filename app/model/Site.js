//Ext.require(['Ext.data.proxy.SQL']);

Ext.define('EvaluateIt.model.Site', {
    extend: 'Ext.data.Model',
    config: {
        idProperty: 'id', // use with proxy.SQL
        //identifier: 'uuid', // use with proxy.localstorage
        fields: [
            {name: 'remoteSiteId', type: 'int'},
            {name: 'siteName', type: 'string'} // does site have a formal name

        ],
        proxy: {
            type: "sql", //"localstorage",
            database: 'Test'
        },
        associations:
        [
			{   type: 'hasMany',
				model: 'EvaluateIt.model.Evaluation', 
				name: 'siteEvaluations'

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
                associationKey: 'addressId'
            }
		] 
    }
});


