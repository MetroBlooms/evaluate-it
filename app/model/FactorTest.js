Ext.define('EvaluateIt.model.FactorTest', {
    extend: 'EvaluateIt.model.BaseModel',
    config: {
        idProperty: 'id',
        fields: [
            {name: 'description',type: 'string'},
            {name: 'value',type: 'int'}
        ],
        proxy: {
            type: 'localstorage'
        }
    }
});