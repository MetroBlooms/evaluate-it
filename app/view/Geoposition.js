// Start, stop and store location
 
Ext.define('EvaluateIt.view.Geoposition', {
    extend: 'Ext.Container',
	alias: 'widget.pullview',
    config: {
        scrollable: true,
        items: [
            {
                xtype: 'panel',
                id: 'Pull',
                styleHtmlContent: true
            },
            {
                docked: 'top',
                xtype: 'toolbar',
                items: [

					// Phonegap API: uses device's native GPS
					{
						xtype: 'button',
						itemId: 'startWatch',
						text: 'WatchPosition',
						iconCls: 'arrow_right',
						iconMask: true,
						handler: function() {
				
							get_position();
							
						}
					},
					{
						xtype: 'button',
						itemId: 'stopWatch',
						text: 'StopWatch',
						iconCls: 'arrow_right',
						iconMask: true,
						handler: function() {
				
							clearWatch();
							
						}
					}

                ]
            }
        ]
	}

});

function get_position() {

	var options = { frequency: 10000, enableHighAccuracy: true };
        watchID = navigator.geolocation.watchPosition(geo_success, geo_error, options);

	
}

function clearWatch() {
	if (watchID != null) {
		navigator.geolocation.clearWatch(watchID);
		watchID = null;
		alert('GPS stopped!');
	}
}

function geo_success(position) {
	var coordinates = position.coords,
		location = 'Longitude ' + coordinates.longitude + ' Latitude ' + coordinates.latitude + ' Accuracy ' + coordinates.accuracy,
		timeStamp = new Date(position.timestamp),
		latitude = coordinates.latitude,
		longitude =  coordinates.longitude,
		accuracy = coordinates.accuracy;
		
	//alert('success! geoLocation is ready to use!' + ' accuracy ' + accuracy);

	alert('watchin...' + ' accuracy is ' + accuracy);
	console.log(' accuracy ' + accuracy);

	if (accuracy <= 150) {
		alert('success! geoLocation is ready to use!' + ' accuracy ' + accuracy);
		// initialize
		//sessionStorage.clear();
		// add data to localStorage 
		sessionStorage.latitude = latitude;
		sessionStorage.longitude = longitude;
		sessionStorage.accuracy = accuracy;
		sessionStorage.timeStamp = timeStamp;

		navigator.geolocation.clearWatch(watchID);
	}


}

// onError Callback receives a PositionError object
function geo_error(error) {
	alert('Geoposition error!' );
}


