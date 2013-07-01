/**
 * Create a list of sites to award.
 * First create a SiteEvaluation model with defined fields, then create a store to contain
 * the data, finally create the list itself, which gets its filtered data (on category = 'evaluations' by regex for existing address in Main.js) from the store
 */

Ext.define('EvaluateIt.view.EvaluationAward', {
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
					xtype: 'evaluationAwardList' //widget reference to EvaluateIt.view.EvaluationList

				}
			]
		}
});
