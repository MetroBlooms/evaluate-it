/**
 * Create a list of sites to evaluate.
 * First create a SiteEvaluation model with defined fields, then create a store to contain
 * the data, finally create the list itself, which gets its filtered data (evaluationFilter in Main.js) from the store
 */

Ext.define('EvaluateIt.view.Evaluation', {
		extend: 'Ext.Container',
      	fullscreen: true,
		config: {
			layout: 'vbox',
			items: [
				{
					xtype : 'toolbar',
					docked: 'top'
				},
				{
					flex: 1,
					xtype: 'evaluationList' //widget reference to EvaluateIt.view.EvaluationList

				}
			]
		}
});
