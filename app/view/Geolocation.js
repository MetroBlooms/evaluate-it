// http://stackoverflow.com/questions/14352356/global-variable-in-sencha
Ext.define('EvaluateIt.view.Geolocation', {
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
							itemId: 'addGeolocation',
							text: 'Add a Thing',
							iconCls: 'arrow_right',
							iconMask: true 
						}

					]
				},
				{
					flex: 1,
					xtype: 'geolocationList'

				}
			]
		}
});

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

