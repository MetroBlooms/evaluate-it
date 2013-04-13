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

// get geolocation using device; write to sessionStorage for session persistance
Ext.device.Geolocation.getCurrentPosition({
	success: function(position) {
		var coordinates = position.coords,
			location = "Longitude " + coordinates.longitude + " Latitude " + coordinates.latitude + " Accuracy " + coordinates.accuracy,
			latitude = coordinates.longitude,
			longitude =  coordinates.latitude,
			accuracy = coordinates.accuracy;
			
		console.log('coords ' + location);

		sessionStorage.clear();
		// add data to sessionStorage 
		sessionStorage.latitude = latitude;
		sessionStorage.longitude = longitude;
		sessionStorage.accuracy = accuracy;	
	
		console.log('latitude ' + sessionStorage.latitude);
	},
	failure: function() {
		console.log('something went wrong!');
	}
});

