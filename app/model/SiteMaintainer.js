Ext.require(['Ext.data.proxy.SQL','EvaluateIt.model.Site']);

Ext.define('EvaluateIt.model.SiteMaintainer', {
    extend: 'Ext.data.Model',
    
    config: {
        idProperty: 'id', // use with proxy.SQL
        //identifier: 'uuid', // use with proxy.localstorage
        fields: [
            {name: 'firstName', type: 'string'},
            {name: 'lastName', type: 'string'},
            {name: 'emailAddress', type: 'string'}
        ],
        proxy: {
            type: "sql", //"localstorage",
            database: 'Test'
        },
        associations: [
        {
            type: ' belongsTo',
            model: 'EvaluateIt.model.Site',
            associationKey: 'siteId'
        }]

    }
});
