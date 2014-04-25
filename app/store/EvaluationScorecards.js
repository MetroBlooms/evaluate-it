Ext.define('EvaluateIt.store.EvaluationScorecards', {
    extend: 'EvaluateIt.store.BaseStore',
    alias: 'store.EvaluationScorecards',
    config:{
        model: 'EvaluateIt.model.EvaluationScorecard',
    	autoLoad: true
    }
});
