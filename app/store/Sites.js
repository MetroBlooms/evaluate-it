Ext.define('EvaluateIt.store.Sites', {
    extend: 'EvaluateIt.store.BaseStore',
    alias: 'store.Sites',
    config:{
        model: 'EvaluateIt.model.Site',
		autoLoad: true
    }
});

