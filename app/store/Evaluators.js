Ext.require(['EvaluateIt.model.Evaluator']);

Ext.define('EvaluateIt.store.Evaluators', {
    extend: 'Ext.data.Store',
    //requires: ['Ext.data.proxy.SQL','EvaluateIt.model.Evaluation'],
    config:{
        model: 'EvaluateIt.model.Evaluator',
		storeId: 'evaluators', 
	    autoLoad: true/*,
	proxy: {
           type: "sql",
           database: 'Yo'
        },
        autoLoad: true*/
    }
});
