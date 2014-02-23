/**
 * Start, stop and store location
 * Uses Phonegap API: uses device's native GPS
 *
 * TODO: Add user selected accuracy for stop condition
 */


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
                /**
                 * @cfg {button}
                 * Start watching location;
                 * Stop watching location
                 */
                items: [
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

/**
 * Phonegap GPS API hook, fired on start location watch
 * @return {Object} Callback options
 */
function get_position() {

	var options = { frequency: 10000, enableHighAccuracy: true };
        watchID = navigator.geolocation.watchPosition(geo_success, geo_error, options);

}

/**
 * Phonegap API hook, fired on stop location watch
 */
function clearWatch() {

	if (watchID != null) {
		navigator.geolocation.clearWatch(watchID);
		watchID = null;
		alert('GPS stopped!');
	}
}

/**
 * onSuccess Callback receives PositionSuccess object and writes to sessionStorage
 * @return {Object} Position coordinates
 */
function geo_success(position) {
	var coordinates = position.coords,
		location = 'Longitude ' + coordinates.longitude + ' Latitude ' + coordinates.latitude + ' Accuracy ' + coordinates.accuracy,
		timeStamp = new Date(position.timestamp),
		latitude = coordinates.latitude,
		longitude =  coordinates.longitude,
		accuracy = coordinates.accuracy;

	alert('watching position...' + ' accuracy is ' + accuracy);
	console.log(' accuracy ' + accuracy);

    // Success achieved when desired accuracy reached
    if (accuracy <= 10) {
		alert('success! geoLocation is ready to use!' + ' accuracy ' + accuracy);

        // Write to sessionStorage for update to Geolocation model
       	sessionStorage.latitude = latitude;
		sessionStorage.longitude = longitude;
		sessionStorage.accuracy = accuracy;
		sessionStorage.timeStamp = timeStamp;

		clearWatch(watchID);
	}

}

/**
 * onError Callback receives a PositionError object
 * @return {Alert}
 */
function geo_error(error) {
	alert('Geoposition error!' );
}


