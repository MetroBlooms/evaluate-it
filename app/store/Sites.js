Ext.define('EvaluateIt.store.Sites', {
   // extend: 'EvaluateIt.store.BaseStore',
    extend: 'Ext.data.Store',
	alias: 'store.Sites',
    config:{
        model: 'EvaluateIt.model.Site',
		autoLoad: true
    }
});

