Ext.define('EvaluateIt.store.Sites', {
    extend: 'Ext.data.Store',
    requires: ['EvaluateIt.model.Site'],
	alias: 'store.Sites',
    config:{
        model: 'EvaluateIt.model.Site',
		//storeId: 'sites',
    	autoLoad: true/*,
        },
        autoLoad: true */
    }
});

