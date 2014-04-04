Ext.define('EvaluateIt.store.SiteMaintainers', {
    extend: 'Ext.data.Store',
    alias: 'store.SiteMaintainers',
    config:{
        model: 'EvaluateIt.model.SiteMaintainer',
	    autoLoad: true
    }
});
