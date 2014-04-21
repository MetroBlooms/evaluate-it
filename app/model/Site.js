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
        associations:
        [
			{   type: 'hasMany',
				model: 'EvaluateIt.model.Evaluation',
               	name: 'evaluation',
                primaryKey: 'id',
                foreignKey: 'evaluation_id',
                foreignStore: 'Evaluations'

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
                getterName: 'getAddress',
                setterName: 'setAddress',
                name: 'address',
                primaryKey: 'id',
                foreignKey: 'address_id',
                foreignStore: 'Addresses'
            }
		] 
    }
});


