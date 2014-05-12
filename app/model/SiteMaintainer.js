Ext.define('EvaluateIt.model.SiteMaintainer', {
    extend: 'EvaluateIt.model.BaseModel',
    config: {
        idProperty: 'id',
        fields: [
            {name: 'id', type: 'int'}, // pk
            {name: 'firstName', type: 'string'},
            {name: 'lastName', type: 'string'},
            {name: 'emailAddress', type: 'string'}
        ],
        proxy: {
            type: 'localstorage'
        },
        belongsTo: [
        {
            model: 'EvaluateIt.model.Site',
            associationKey: 'siteId'
        }]

    }
});
