Ext.define('EvaluateIt.store.FactorTests', {
    extend: 'EvaluateIt.store.BaseStore',
    alias: 'store.FactorTests',
    config:{
        model: 'EvaluateIt.model.FactorTest',
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