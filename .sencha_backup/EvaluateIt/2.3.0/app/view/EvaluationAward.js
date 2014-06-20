/**
 * Create a list of sites that could be assigned an award when evaluated.
 * First create a Site model with defined fields, then create a store to contain the data,
 * finally create the list itself using an xtype widget  (see EvaluateIt.view.EvaluationAwardList),
 * which gets its filtered data
 * (on category = 'evaluations' by regex for existing address in EvaluateIt.controller.Main) from the store
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
