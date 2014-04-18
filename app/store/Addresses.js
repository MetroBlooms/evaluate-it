Ext.define('EvaluateIt.store.Addresses', {
   // extend: 'EvaluateIt.store.BaseStore',
    extend: 'Ext.data.Store',
	alias: 'store.Addresses',
    config:{
        model: 'EvaluateIt.model.Address',
		autoLoad: true
    }
});
