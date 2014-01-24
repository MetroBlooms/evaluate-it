Ext.define('EvaluateIt.store.EvaluationImages',{
 extend: 'Ext.data.Store',
	alias: 'store.EvaluationImages',
    //requires: ['Ext.data.proxy.SQL','EvaluateIt.model.Evaluation'],
    config:{
        model: 'EvaluateIt.model.EvaluationImage',
	//	storeId: 'evaluations',
    	autoLoad: true
    }

});
