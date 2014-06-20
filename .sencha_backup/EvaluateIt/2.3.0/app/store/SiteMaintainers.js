Ext.define('EvaluateIt.store.SiteMaintainers', {
    extend: 'Ext.data.Store',
    requires: ['EvaluateIt.model.SiteMaintainer'],
    config:{
        model: 'EvaluateIt.model.SiteMaintainer',
	storeId: 'siteMaintainers'/*,
	proxy: {
           type: "localstorage"//,
           //database: 'Yo'
        },
        autoLoad: true*/
    }
});
