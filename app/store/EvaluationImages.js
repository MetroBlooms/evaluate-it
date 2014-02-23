Ext.define('EvaluateIt.store.EvaluationImages',{
 extend: 'Ext.data.Store',
    //requires: ['Ext.data.proxy.SQL','EvaluateIt.model.Evaluation'],
    config:{
        model: 'EvaluateIt.model.EvaluationImage',
    	autoLoad: true
    }

});
