Ext.require(['EvaluateIt.model.EvaluationFeature']);

Ext.define('EvaluateIt.store.EvaluationFeatures', {
    extend: 'Ext.data.Store',
	alias: 'store.EvaluationFeatures',
    config:{
        model: 'EvaluateIt.model.EvaluationFeature',
    	autoLoad: true
    }
});
