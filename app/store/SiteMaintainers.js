Ext.define('EvaluateIt.store.SiteMaintainers', {
    extend: 'EvaluateIt.store.BaseStore',
    alias: 'store.SiteMaintainers',
    config:{
        model: 'EvaluateIt.model.SiteMaintainer',
	    autoLoad: true
    }
});
