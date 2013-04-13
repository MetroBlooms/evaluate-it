Ext.require(['EvaluateIt.model.SiteEvaluation']);

Ext.define('EvaluateIt.store.SiteEvaluations', {
    extend: 'Ext.data.Store',
	alias: 'store.SiteEvaluations',
    //requires: ['Ext.data.proxy.SQL','EvaluateIt.model.Evaluation'],
    config:{
        model: 'EvaluateIt.model.SiteEvaluation',
	//	storeId: 'evaluations',
    	autoLoad: true/*,
	proxy: {
           type: "sql",
           database: 'Yo'
        },
        autoLoad: true*/
    }
});
