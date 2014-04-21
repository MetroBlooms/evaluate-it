Ext.define('EvaluateIt.store.Evaluations', {
    extend: 'EvaluateIt.store.BaseStore',
	alias: 'store.Evaluations',
    config:{
        model: 'EvaluateIt.model.Evaluation',
		autoLoad: true
    }
});
