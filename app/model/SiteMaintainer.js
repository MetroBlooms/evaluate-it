Ext.define('EvaluateIt.model.SiteMaintainer', {
    extend: 'Ext.data.Model',
    
    config: {
        idProperty: 'id',
        fields: [
            {name: 'id', type: 'int'}, // pk
            {name: 'firstName', type: 'string'},
            {name: 'lastName', type: 'string'},
            {name: 'emailAddress', type: 'string'}
        ],
        proxy: {
            type: "sql",
            database: 'Test'
        },
        associations: [
        {
            type: 'belongsTo',
            model: 'EvaluateIt.model.Site',
            associationKey: 'siteId'
        }]

    }
});
