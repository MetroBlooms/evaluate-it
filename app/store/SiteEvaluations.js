Ext.define('EvaluateIt.store.SiteEvaluations', {
    extend: 'Ext.data.Store',
	alias: 'store.SiteEvaluations',
    config:{
        model: 'EvaluateIt.model.SiteEvaluation',
    	autoLoad: true
    }
});
