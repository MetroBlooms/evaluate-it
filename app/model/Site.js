Ext.define('EvaluateIt.model.Site', {
    extend: 'Ext.data.Model',
    //extend: 'EvaluateIt.model.BaseModel',
    config: {
        idProperty: 'id',
        fields: [
            {name: 'remoteSiteId', type: 'int'},
            {name: 'siteName', type: 'string'}, // does site have a formal name
            {name: 'address_id', type: 'int'}

        ],
        /*proxy: {
            type: "sql",
            database: 'Test'
        },*/
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
                //associationKey: 'addressId',
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


