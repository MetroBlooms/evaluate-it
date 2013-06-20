// Start, stop and record location
 
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

					// Alternate method 1: does not use device GPS (at least on Android). Need to invoke clearListeners() method to stop watching for position change.
					/*{
						xtype: 'button',
						itemId: 'startWatch',
						text: 'StartWatch',
						iconCls: 'arrow_right',
						iconMask: true,
						handler: function() {
							var geo = Ext.create('Ext.util.Geolocation', {
								autoUpdate: true,
								frequency: '10000',
								enableHighAccuracy: true,
								listeners: {
									locationupdate: function(geo) {
										alert('util: ' + geo.getAccuracy());
										sessionStorage.latitude = geo.getLatitude();
										sessionStorage.longitude = geo.getLongitude();
										sessionStorage.accuracy = geo.getAccuracy();	

									},
									locationerror: function(geo, bTimeout, bPermissionDenied, bLocationUnavailable, message) {
										if(bTimeout){
											alert('Timeout occurred.');
										} else {
											alert('Error occurred.');
										}
									}
								}
							});
							geo.updateLocation();
						}
 
					},*/

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
					}
                ]
            }
        ]
	}

});

function get_position() {
	//navigator.geolocation.getAccurateCurrentPosition(onSuccess, onError, {desiredAccuracy:30, maxWait:15000});

	//navigator.geolocation.getCurrentPosition(onSuccess, onError, { maximumAge: 30, timeout: 5000, enableHighAccuracy: true });

	var options = { frequency: 10000, enableHighAccuracy: true };
        watchID = navigator.geolocation.watchPosition(geo_success, geo_error, options);

	
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

	if (accuracy <= 30) {
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
	alert('error!' );
}


// Alternate method number 2: does not use device native GPS (at least on Android)

/*

 {
                docked: 'top',
                xtype: 'toolbar',
                items: [
					{
						xtype: 'button',
						itemId: 'startWatch',
						text: 'StartWatch',
						iconCls: 'arrow_right',
						iconMask: true,
						handler: function() {
							Ext.device.Geolocation.watchPosition({
								enableHighAccuracy: true,
								frequency: 10000, // Update every 3 seconds
								callback: function(position) {
									console.log('Position updated!', position.coords);
									alert('accuracy ' +  position.coords.accuracy);
										// initialize sessionStorage
									//sessionStorage.clear();
									// add data to sessionStorage 
									sessionStorage.latitude = latitude;
									sessionStorage.longitude = longitude;
									sessionStorage.accuracy = accuracy;	
									sessionStorage.position = position;
								},
								failure: function() {
									console.log('something went wrong!');
									alert('something went wrong!')
								}
							});
						}
 
					},
					{
						xtype: 'button',
						itemId: 'stopWatch',
						text: 'StopWatch',
						iconCls: 'arrow_right',
						iconMask: true,
						handler: function() {
							Ext.device.Geolocation.clearWatch();
						} 
					},

*/





