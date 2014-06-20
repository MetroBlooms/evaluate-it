Ext.require(['EvaluateIt.model.EvaluationScorecard']);

Ext.define('EvaluateIt.store.EvaluationScorecards', {
    extend: 'Ext.data.Store',
	alias: 'store.EvaluationScorecards',
    config:{
        model: 'EvaluateIt.model.EvaluationScorecard',
    	autoLoad: true
    }
});
