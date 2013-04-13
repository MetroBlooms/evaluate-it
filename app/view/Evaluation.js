/**
 * Demonstrates how to create a simple List based on inline data.
 * First we create a simple Contact model with first and last name fields, then we create a Store to contain
 * the data, finally we create the List itself, which gets its data out of the Store
 */
Ext.define('EvaluateIt.view.Evaluation', {
		extend: 'Ext.Container',
      	fullscreen: true,
		config: {
			layout: 'vbox',
			items: [
				{
					xtype : 'toolbar',
					docked: 'top',
					items: [
						{
							xtype: 'button',
							itemId: 'addSiteEvaluation',
							text: 'Add a Thing',
							iconCls: 'arrow_right',
							iconMask: true 
						}

					]
				},
				{
					flex: 1,
					xtype: 'evaluationList'

				}
			]
		}
});
