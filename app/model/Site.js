Ext.define('EvaluateIt.model.Site', {
    extend: 'EvaluateIt.model.BaseModel',
    config: {
        idProperty: 'id',
        fields: [
            {name: 'id', type: 'int'},
            {name: 'remoteSiteId', type: 'int'},
            {name: 'siteName', type: 'string'}, // does site have a formal name
            {name: 'address_id', type: 'string'}
        ],
        proxy: {
            type: "sql",
            database: 'Test'
        },
        hasMany:
        [
			{
				model: 'EvaluateIt.model.Evaluation',
               	name: 'Evaluations',
                primaryKey: 'id',
                foreignKey: 'site_id',
                associationKey: 'siteEvaluations'
			}/*,
		    {
                model: 'EvaluateIt.model.SiteMaintainer',
                name: 'siteMaintainers'
            }*/
        ],
        hasOne: [
           /* {
                model: 'EvaluateIt.model.Geolocation',
                associationKey: 'geolocationId'
			},*/
            {
                model: 'EvaluateIt.model.Address',
                getterName: 'getAddress',
                setterName: 'setAddress',
                name: 'Address',
                primaryKey: 'id',
                foreignKey: 'address_id',
                foreignStore: 'Addresses'
            }
		]
    }
});


