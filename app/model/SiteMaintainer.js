Ext.define('EvaluateIt.model.SiteMaintainer', {
    extend: 'EvaluateIt.model.BaseModel',
    config: {
        idProperty: 'id',
        fields: [
            {name: 'id', type: 'int'}, // pk
            {name: 'firstName', type: 'string'},
            {name: 'lastName', type: 'string'},
            {name: 'emailAddress', type: 'string'},
            {name: 'site_id', type: 'string'}
        ],
        proxy: {
            type: 'localstorage'
        },
        belongsTo: [
        {
            model: 'EvaluateIt.model.Site',
            name: 'Site',
            primaryKey: 'id',
            foreignKey: 'site_id',
            foreignStore: 'Sites'
        }]

    }
});
