Ext.define('EvaluateIt.model.Site', {
    extend: 'EvaluateIt.model.BaseModel',
    config: {
        idProperty: 'id',
        fields: [
            {name: 'id', type: 'int'},
            {name: 'remoteSiteId', type: 'int'},
            {name: 'siteName', type: 'string'}, // does site have a formal name
            {name: 'address_id', type: 'string'},
            {name: 'geolocation_id', type: 'string'}
        ],
        proxy: {
            type: 'localstorage'
        },
        hasMany:
        [
			{
				model: 'EvaluateIt.model.Evaluation',
               	name: 'Evaluation',
                primaryKey: 'id',
                foreignKey: 'site_id',
                associationKey: 'Evaluation',
                foreignStore: 'Evaluations'
			},
		    {
                model: 'EvaluateIt.model.SiteMaintainer',
                name: 'SiteMaintainer',
                primaryKey: 'id',
                foreignKey: 'site_id',
                associationKey: 'SiteMaintainer',
                foreignStore: 'SiteMaintainers'
            }
        ],
        hasOne: [
            {
                model: 'EvaluateIt.model.Geolocation',
                getterName: 'getGeolocation',
                setterName: 'setGeolocation',
                name: 'Geolocation',
                primaryKey: 'id',
                foreignKey: 'geolocation_id',
                foreignStore: 'Geolocations'
			},
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


