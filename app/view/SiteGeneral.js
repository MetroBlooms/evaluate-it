/**
 * Create a list of sites to enter general information regarding the evaluation.
 * First create a Site model with defined fields,
 * then create a store to contain the data,
 * finally create the list itself,
 * which gets its filtered data (on category = 'evaluations' by regex for existing address in EvaluateIt.controller.Main) from the store
 *
 * TODO: rename to Site as per normalized model
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
		            /**
                     * add an Ad Hoc evaluation (not obtained via Pull)
                     */
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
