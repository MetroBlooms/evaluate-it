/**
 * Global functions
 *
 */
Ext.define('EvaluateIt.utils.UtilityService', {
    singleton : true,
    alias : 'widget.utility',
    constructor: function(config) {
        this.initConfig(config);
    },

    /**
     *
     * Rating based on Metro Blooms evaluation form
     * @param score
     * @returns {String}
     */
    evaluation_rating: function(param){
        console.log(param);
        var rating;

        if (param >= 18) {
            rating = 'EG';
        } else if (param >= 14 && param < 18) {
            rating = 'GD';
        } else if (param >= 9 && param < 14) {
            rating = 'GM';
        } else if (param >= 5 && param < 9) {
            rating = 'CA';
        } else {
            rating = ''; //'';
        }

        return rating;

    },

    /**
     * Compute sum of scorecard factors
     * @return {Integer}
     *
     * TODO: variable list of parameters as per design pattern:
     *
     * obj = {
			var: withValue
		};
     *
     * obj = {
			var: null
		};
     *
     *
     */
    sum_factor_ratings: function(visualImpact,varietyAndHealth,design,maintenance,environmentalStewardship) {

        var sum;
        /**
         * Ensure all values are integers first before summing
         * over them
         */

        sum = parseInt(visualImpact) +
            parseInt(varietyAndHealth) +
            parseInt(design) +
            parseInt(maintenance) +
            parseInt(environmentalStewardship);

        return sum;
    },

    /**
     *
     * awards based on Metro Blooms evaluation form
     *
     * @param param
     * @returns {{bestof: string, nate_seigel: number}}
     *
     * TODO: implement as enumeration object
     */
    evaluation_award: function (param) {

        var nate_siegel = 0,
            bestof;

        switch (param) {
            case 1:
                bestof = 'Boulevard Garden';
                break;
            case 2:
                bestof = 'Business Garden or Raingarden';
                break;
            case 3:
                bestof = 'Container/WindowBox Garden';
                break;
            case 4:
                bestof = 'Congregation Garden or Raingarden';
                break;
            case 5:
                bestof = 'Residential Garden or Raingarden';
                break;
            case 6:
                bestof = 'Alley Garden';
                break;
            case 7:
                bestof = 'Public & Schoolyard Garden or Raingarden';
                break;
            case 8:
                bestof = 'NateSiegel';
                nate_siegel = 1;
                break;
            case 9:
                bestof = 'Special';
                break;
            default:
                bestof = null;
                break;
        }

        return {
            'bestof': bestof,
            'nate_seigel': nate_siegel
        };
    },

    /**
     * Phonegap GPS API, fired on start location watch
     * @return {Object} Callback options
     */
    get_position: function (record) {

        var options = {frequency: 10000, enableHighAccuracy: true};
        watchID = navigator.geolocation.watchPosition(geo_success, geo_error, options);

        /**
         * onSuccess Callback receives PositionSuccess object and writes to sessionStorage/localStorage
         * @return {Object} Position coordinates
         *
         */

        function geo_success (position) {

            var coordinates = position.coords,
                timeStamp = new Date(position.timestamp),
                latitude = coordinates.latitude,
                longitude =  coordinates.longitude,
                accuracy = coordinates.accuracy,
                panelOption;

            // initialize sessionstorage items
            sessionStorage.removeItem(latitude);
            sessionStorage.removeItem(longitude);
            sessionStorage.removeItem(timeStamp);
            sessionStorage.removeItem(accuracy);

            alert('Position accuracy is ' + accuracy);
            console.log(' accuracy ' + accuracy);

            // Success achieved when desired accuracy reached
            if (accuracy <= EvaluateIt.config.accuracy) {

                // Write to sessionStorage for use in Google maps
                sessionStorage.latitude = latitude;
                sessionStorage.longitude = longitude;
                sessionStorage.accuracy = accuracy;
                sessionStorage.timeStamp = timeStamp;

                navigator.geolocation.clearWatch(watchID);

                record.set('latitude',latitude);
                record.set('longitude',longitude);
                record.set('accuracy',accuracy);
                record.set('timeStamp',timeStamp);
                Ext.getStore('Geolocations').sync();

                alert('Success! Location has been set with an accuracy of:' + accuracy);
                // dispaly toolbar and google_map component
                panelOption = 2;

                EvaluateIt.utils.UtilityService.map_panel(record,panelOption);
            }
        }

        /**
         * onError Callback receives a PositionError object
         * @return {Alert}
         */
        function geo_error (error) {
            alert('Geoposition error!' );
        }

    },

    /**
     * Phonegap API, fired on stop location watch
     */
    clear_watch: function  () {

        if (watchID != null) {
            navigator.geolocation.clearWatch(watchID);
            watchID = null;
            alert('GPS stopped!');
        }
    },

    // Google maps API stuff here
    map_panel: function(record,option){

        var latitude = sessionStorage.latitude, //44.9616164;
            longitude = sessionStorage.longitude; //-93.33539329999999,

        console.log('latitude/longitude ...' + sessionStorage.latitude + ' ' + sessionStorage.longitude);

        var	position = new google.maps.LatLng(latitude, longitude),

            infowindow = new google.maps.InfoWindow({
                content: 'EvaluateIt!'
            }),

        //Tracking Marker Image
            image = new google.maps.MarkerImage(
                'resources/images/point.png',
                new google.maps.Size(32, 31),
                new google.maps.Point(0, 0),
                new google.maps.Point(16, 31)
            ),

            shadow = new google.maps.MarkerImage(
                'resources/images/shadow.png',
                new google.maps.Size(64, 52),
                new google.maps.Point(0, 0),
                new google.maps.Point(-5, 42)
            ),

            toolbar = Ext.create('Ext.Toolbar', {
                docked: 'top',
                alias : 'widget.geolocationToolbar',
                ui: 'light',
                defaults: {
                    iconMask: true
                },
                items: [
                    {
                        xtype: 'button',
                        ui: 'back',
                        text: 'Back',
                        // destroy form.Panel overlay and return to tree store view
                        handler: function() {
                            geo_panel.destroy();
                        }
                    },
                    {
                        xtype: 'button',
                        itemId: 'stopWatch',
                        text: 'StopWatch',
                        iconCls: 'arrow_right',
                        iconMask: true,
                        handler: function() {
                            EvaluateIt.utils.UtilityService.clear_watch();
                        }
                    },
                    {
                        xtype: 'selectfield',
                        itemId: 'accuracy',
                        autoSelect: false,
                        placeHolder: 'accuracy',
                        options: [
                            {text: ''},
                            {text: 'high',  value: 5},
                            {text: 'med high',  value: 10},
                            {text: 'medium',  value: 15},
                            {text: 'med low',  value: 20},
                            {text: 'low',  value: 60}
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
                    },
                    {
                        iconCls: 'home',
                        handler: function() {
                            google_map.getMap().panTo(position);
                        }
                    }
                ]
            });

        var google_map = Ext.create('Ext.Map', {
            alias : 'widget.whereAmI',

            mapOptions : {
                center : new google.maps.LatLng(latitude, longitude),
                zoom : 12,
                mapTypeId : google.maps.MapTypeId.ROADMAP,
                navigationControl: true,
                navigationControlOptions: {
                    style: google.maps.NavigationControlStyle.DEFAULT
                }
            },

            listeners: {
                maprender: function(comp, map) {
                    var marker = new google.maps.Marker({
                        position: map.center,
                        title : 'Weeeee!',
                        map: map
                    });

                    google.maps.event.addListener(marker, 'click', function() {
                        infowindow.open(map, marker);
                    });

                    setTimeout(function() {
                        map.panTo(position);
                    }, 100);
                }
            }
        });

        // construct geo_panel components
        if (option === 1) {
            var obj = [toolbar];
        }
        if (option === 2) {
            var obj = [toolbar, google_map];
        }

        var geo_panel = new Ext.form.Panel({
            useCurrentLocation: true,
            fullscreen: true,
            layout: 'fit',
            items: obj
        });

        geo_panel.setRecord(record);
        geo_panel.show();
    }


})


