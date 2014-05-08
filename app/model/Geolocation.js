Ext.define('EvaluateIt.model.Geolocation', {
    extend: 'EvaluateIt.model.BaseModel',
    config: {
        idProperty: 'id',
        fields: [
            {name: 'id', type: 'int'}, // pk
            {name: 'latitude', type: 'float'},
            {name: 'longitude', type: 'float'},
            {name: 'accuracy', type: 'float'},
            {name: 'datestamp', type: 'string'}
        ],
        proxy: {
            type: "sql",
            database: 'Test'
        },
        belongsTo: [
            {
                model: 'EvaluateIt.model.Site'
            }
        ]
    }
});
