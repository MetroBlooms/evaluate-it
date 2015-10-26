Ext.define('EvaluateIt.store.DynamicTests', {
    extend: 'Ext.data.Store',
    alias: 'store.FactorTests',
    config:{
        model: 'EvaluateIt.model.DynamicTest',
        storeId: 'FactorTests',
        autoLoad: true,

        proxy: {
            type: 'rest',
            url: 'http://127.0.0.1:5000/api/factor',
            reader: {
                type: 'json',
                rootProperty: 'factor'
            }
        }
    }
});