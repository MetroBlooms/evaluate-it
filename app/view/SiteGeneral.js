/**
 * Create a list of sites to enter general information.
 * First create a SiteEvaluation model with defined fields, then create a store to contain
 * the data, finally create the list itself, which gets its filtered data (on category = 'evaluations' by regex for existing address in Main.js) from the store
 */

Ext.define('EvaluateIt.view.SiteGeneral', {
		extend: 'Ext.Container',
      	fullscreen: true,
		config: {
			layout: 'vbox',
			items: [
				{
					xtype : 'toolbar',
					docked: 'top',
					// add an Ad Hoc evaluation: requirements pending
					items: [
						{
							xtype: 'button',
							itemId: 'addSiteGeneral',
							text: 'Add evaluation',
							iconCls: 'arrow_right',
							iconMask: true 
						}

					]
				},
				{
					flex: 1,
					xtype: 'siteGeneralList' //widget reference to EvaluateIt.view.EvaluationList

				}
			]
		}
});
