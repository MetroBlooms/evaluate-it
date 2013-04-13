Ext.define('EvaluateIt.store.Addresses', {
    extend: 'Ext.data.Store',
    requires: ['EvaluateIt.model.Address'],
	alias: 'store.Addresses',
    config:{
        model: 'EvaluateIt.model.Address',
		//storeId: 'addresses',
    	autoLoad: true/*,
/*,
	proxy: {
           type: "sql",
           database: 'Yo'
        },
        autoLoad: true*/
    }
});
