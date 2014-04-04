Ext.define('EvaluateIt.store.Evaluations', {
    extend: 'Ext.data.Store',
	alias: 'store.Evaluations',
    config:{
        model: 'EvaluateIt.model.Evaluation',
		autoLoad: true
    }
});
