Ext.define('EvaluateIt.store.EvaluationAwards', {
    extend: 'EvaluateIt.store.BaseStore',
	alias: 'store.EvaluationAwards',
    config:{
        model: 'EvaluateIt.model.EvaluationAward',
    	autoLoad: true
    }
});
