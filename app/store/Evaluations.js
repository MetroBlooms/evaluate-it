

Ext.define('EvaluateIt.store.Evaluations', {
    extend: 'Ext.data.Store',
	alias: 'store.Evaluations',
    //requires: ['Ext.data.proxy.SQL','EvaluateIt.model.Evaluation'],
    config:{
        model: 'EvaluateIt.model.Evaluation',
	//	storeId: 'evaluations',
    	autoLoad: true,
/*,
	proxy: {
           type: "sql",
           database: 'Yo'
        },
        autoLoad: true*/
    }
});
