Ext.define('EvaluateIt.store.Addresses', {
    extend: 'Ext.data.Store',
	alias: 'store.Addresses',
    config:{
        model: 'EvaluateIt.model.Address',
		autoLoad: true
    }
});
