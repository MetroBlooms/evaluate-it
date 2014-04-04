Ext.define('EvaluateIt.store.Sites', {
    extend: 'Ext.data.Store',
	alias: 'store.Sites',
    config:{
        model: 'EvaluateIt.model.Site',
		autoLoad: true
    }
});

