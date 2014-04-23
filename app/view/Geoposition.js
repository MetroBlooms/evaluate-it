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
                id: 'geoposition',
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
                            EvaluateIt.view.Geoposition.get_position();
						}
					},
            		{
						xtype: 'button',
						itemId: 'stopWatch',
						text: 'StopWatch',
						iconCls: 'arrow_right',
						iconMask: true,
						handler: function() {
                            EvaluateIt.view.Geoposition.clearWatch();
						}
					}


                ]

            },
            {
                xtype: 'selectfield',
                itemId: 'accuracy',
                name: 'accuracy',
                label: 'Desired accuracy',
                value: 10,
                autoSelect: false,
                options: [
                    {text: 'high',  value: 5},
                    {text: 'medium high',  value: 10},
                    {text: 'medium',  value: 15},
                    {text: 'medium low',  value: 20},
                    {text: 'low',  value: 25}
                ],
                listeners: {
                    change: function(field, value) {
                        if (value instanceof Ext.data.Model) {
                            value = value.get(field.getValueField());
                        }
                        console.log(value);
                        // set accuracy as config variable
                        EvaluateIt.config.accuracy = value;
                    }
                }
            }
        ]
	},

     /**
      * Phonegap GPS API hook, fired on start location watch
      * @return {Object} Callback options
      */
    get_position: function () {

        var options = { frequency: 10000, enableHighAccuracy: true};
        watchID = navigator.geolocation.watchPosition(EvaluateIt.view.Geoposition.geo_success, EvaluateIt.view.Geoposition.geo_error, options);

    },

    /**
     * Phonegap API hook, fired on stop location watch
     */
    clearWatch: function  () {

        if (watchID != null) {
            navigator.geolocation.clearWatch(watchID);
            watchID = null;
            alert('GPS stopped!');
        }
    },

    /**
     * onSuccess Callback receives PositionSuccess object and writes to sessionStorage
     * @return {Object} Position coordinates
     *
     * TODO: User selected accuracy
     */
    geo_success: function  (position) {
        var coordinates = position.coords,
        //location = 'Longitude ' + coordinates.longitude + ' Latitude ' + coordinates.latitude + ' Accuracy ' + coordinates.accuracy,
            timeStamp = new Date(position.timestamp),
            latitude = coordinates.latitude,
            longitude =  coordinates.longitude,
            accuracy = coordinates.accuracy;

        alert('watching position...' + ' accuracy is ' + accuracy);
        console.log(' accuracy ' + accuracy);

        // Success achieved when desired accuracy reached

        if (accuracy <= EvaluateIt.config.accuracy) {
            alert('success! geoLocation is ready to use!' + ' accuracy ' + accuracy);

            // Write to sessionStorage for update to Geolocation model
            sessionStorage.latitude = latitude;
            sessionStorage.longitude = longitude;
            sessionStorage.accuracy = accuracy;
            sessionStorage.timeStamp = timeStamp;

            navigator.geolocation.clearWatch(watchID);
            //clear_watch();
        }

    },

    /**
     * onError Callback receives a PositionError object
     * @return {Alert}
     */
    geo_error: function  (error) {
        alert('Geoposition error!' );
    }

});








