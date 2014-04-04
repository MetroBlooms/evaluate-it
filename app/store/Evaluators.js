Ext.define('EvaluateIt.store.Evaluators', {
    extend: 'Ext.data.Store',
    alias: 'store.Evaluations',
    config:{
        model: 'EvaluateIt.model.Evaluator',
		autoLoad: true
    }
});
