Ext.define('EvaluateIt.model.Address', {
    extend: 'EvaluateIt.model.BaseModel',
    config: {
        idProperty: 'id',
        fields: [
            {name: 'id', type: 'int'},
            {name: 'address', type: 'string'},
            {name: 'city', type: 'string'},
            {name: 'state', type: 'string'},
            {name: 'zipcode', type: 'string'},
			{name: 'county', type: 'string'},
            {name: 'site_id', type: 'string'}
        ],
        associations: [
            {
                type: 'hasOne',
                model: 'EvaluateIt.model.Site',
                name: 'site',
                primaryKey: 'id',
                getterName: 'getSite',
                setterName: 'setSite',
                foreignKey: 'site_id',
                foreignStore: 'Sites'

            }
        ],
        proxy: {
            type: "sql",
            database: 'Test'
        }

    }
});
