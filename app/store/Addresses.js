Ext.define('EvaluateIt.store.Addresses', {
    extend: 'EvaluateIt.store.BaseStore',
    alias: 'store.Addresses',
    config:{
        model: 'EvaluateIt.model.Address',
		autoLoad: true
    }
});
