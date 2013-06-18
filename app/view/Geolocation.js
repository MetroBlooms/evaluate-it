/**
 * Create a list of sites for which to grab a geolocation.
 * First create a SiteEvaluation model with defined fields, then create a store to contain
 * the data, finally create the list itself, which gets its filtered data (evaluationFilter in Main.js) from the store
 */

Ext.define('EvaluateIt.view.Geolocation', {
		extend: 'Ext.Container',
      	fullscreen: true,
		config: {
			layout: 'vbox',
			//layout: 'fit',
			items: [
				{
					xtype : 'toolbar',
					docked: 'top'
				},
				{
					flex: 1,
					xtype: 'geolocationList'

				}
			]
		}
});


