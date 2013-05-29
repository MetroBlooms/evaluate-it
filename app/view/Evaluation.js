/**
 * Create a list of sites to evaluate.
 * First create a SiteEvaluation model with defined fields, then create a store to contain
 * the data, finally create the list itself, which gets its filtered data (evaluationFilter in Main.js) from the store
 */

Ext.define('EvaluateIt.view.Evaluation', {
		extend: 'Ext.Container',
      	fullscreen: true,
		config: {
			//layout: 'vbox',
			layout: 'fit',
			items: [
				{
					xtype : 'toolbar',
					docked: 'top',
					// add an Ad Hoc evaluation: requirements pending
					/*items: [
						{
							xtype: 'button',
							itemId: 'addSiteEvaluation',
							text: 'Add a Thing',
							iconCls: 'arrow_right',
							iconMask: true 
						}

					]*/
				},
				{
					flex: 1,
					xtype: 'evaluationList' //widget reference to EvaluateIt.view.EvaluationList

				}
			]
		}
});
