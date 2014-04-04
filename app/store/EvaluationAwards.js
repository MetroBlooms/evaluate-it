Ext.define('EvaluateIt.store.EvaluationAwards', {
    extend: 'Ext.data.Store',
	alias: 'store.EvaluationAwards',
    config:{
        model: 'EvaluateIt.model.EvaluationAward',
    	autoLoad: true
    }
});
