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
        belongsTo: [
            {
                model: 'EvaluateIt.model.Site',
                name: 'site',
                primaryKey: 'id',
                foreignKey: 'site_id',
                getterName: 'getSite',
                setterName: 'setSite'
            }
        ],
        proxy: {
            type: 'localstorage'
        }

    }
});
