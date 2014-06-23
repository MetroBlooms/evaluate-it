/**
 * Controls assignment of coordinates to location
 * uses Google Maps API
 *
 */
Ext.define('EvaluateIt.controller.SiteGeolocation', {
	extend : 'Ext.app.Controller',
	requires: ['Ext.Toolbar'],

	config: {
		profile: Ext.os.deviceType.toLowerCase(),
  		stores : ['Sites','Addresses','Geolocations'],
  		models : ['Site','Address','Geolocation'],
  		refs: {
   			mySiteGeolocationList: 'siteGeolocationList'
  		},
		control: {
			'siteGeolocationList': {
				activate: 'onActivate',
				itemtap: 'onSelectSiteGeolocation'
			}
		}	  

 	},

	onActivate: function() {
  		console.log('Main container is active');
 	},


	// spawns a new form panel with Google map centered on current location 
	onSelectSiteGeolocation: function(view, index, target, record, event) {

        console.log('Selected a Geolocation from the list');

        // try to set cooordinates to current position
        EvaluateIt.utils.UtilityService.get_position(record);

		// Google maps API stuff here
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

			trackingButton = Ext.create('Ext.Button', {
				iconMask: true,
				iconCls: 'locate'
			}),

			trafficButton = Ext.create('Ext.Button', {
				iconMask: true,
				pressed: false,
				iconCls: 'maps'
			}),

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
                        itemId: 'setPosition',
                        text: 'setPosition',
                        iconCls: 'arrow_right',
                        iconMask: true,
                        handler: function() {
                            EvaluateIt.utils.UtilityService.get_position();
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
                            {text: 'low',  value: 40}
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

		var geo_panel = new Ext.form.Panel({
            useCurrentLocation: true,
				fullscreen: true,
				layout: 'fit',
				items: [toolbar, google_map]
		});

        geo_panel.setRecord(record);
		geo_panel.show();

	}


});





