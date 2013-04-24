Ext.define('EvaluateIt.controller.GeolocationMaster', {
	extend : 'Ext.app.Controller',

	config: {
		profile: Ext.os.deviceType.toLowerCase(),
  		stores : ['SiteEvaluations'],
  		models : ['SiteEvaluation'],
  		refs: {
   			myGeolocationList: 'geolocationList'
  		},
		control: {
			'geolocationList': {
				activate: 'onActivate',
				itemtap: 'onSelectGeolocation'
			},
			'geolocationEdit button[itemId=save]' : {
				tap : 'onSaveGeolocation' 
			}

		}	  

 	},

	onActivate: function() {
  		console.log('Main container is active');
 	},


	// spawns a new form panel with Google map centered on current location 
	onSelectGeolocation: function(view, index, target, record, event) {

		console.log('Selected a Geolocation from the list');

		// grab geolocation coordinates from device API
		get_location();
		console.log('latitude/longitude ...' + sessionStorage.latitude + ' ' + sessionStorage.longitude);

		// Google maps API stuff here
		var latitude = sessionStorage.latitude, 
		    longitude = sessionStorage.longitude,

			position = new google.maps.LatLng(latitude, longitude),  

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
						xtype: "button",
         				ui: "back",
         				text: "Home",
						// destroy form.Panel overlay to return to tree store view 
						handler: function() {
							geo_panel.destroy();						
						}
            		},
					{
						iconCls: 'home',
						handler: function() {
							//disable tracking
							var segmented = Ext.getCmp('segmented'),
								pressedButtons = segmented.getPressedButtons(),
								trafficIndex = pressedButtons.indexOf(trafficButton),
								newPressed = (trafficIndex != -1) ? [trafficButton] : [];
							segmented.setPressedButtons(newPressed);
							google_map.getMap().panTo(position);
						}
					},
					{
						id: 'segmented',
						xtype: 'segmentedbutton',
						allowMultiple: true,
						listeners: {
							toggle: function(buttons, button, active) {
								if (button == trafficButton) {
									google_map.getPlugins()[1].setHidden(!active);
								}
								else if (button == trackingButton) {
									var tracker = google_map.getPlugins()[0],
										marker = tracker.getMarker();
									marker.setVisible(active);
									if (active) {
										tracker.setTrackSuspended(false);
										Ext.defer(function() {
											tracker.getHost().on('centerchange', function() {
												marker.setVisible(false);
												tracker.setTrackSuspended(true);
												var segmented = Ext.getCmp('segmented'),
													pressedButtons = segmented.getPressedButtons(),
													trafficIndex = pressedButtons.indexOf(trafficButton),
													newPressed = (trafficIndex != -1) ? [trafficButton] : [];
												segmented.setPressedButtons(newPressed);
											}, this, {single: true});
										}, 50, this);
									}
								}
							}
						},
						items: [
							trackingButton, trafficButton
						]
					},
					// display selected address
					{	
						xtype: 'textfield', 
						name: 'address',
						itemId: 'address',
						readOnly: true
					},
					// save geolocation data
					{
						xtype: 'button',
						itemId: 'save',
						text: 'Save location',
						handler: function() {
						
							// get record associated with model bound to form 	
							var record = geo_panel.getRecord();
				
							// set geolocation values			
							record.set('latitude',sessionStorage.latitude);
							record.set('longitude',sessionStorage.longitude);
							record.set('accuracy',sessionStorage.accuracy);

							// update store with new values	
							Ext.getStore('SiteEvaluations').sync();

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

			plugins : [
				new Ext.plugin.google.Tracker({
					trackSuspended: true,   //suspend tracking initially
					allowHighAccuracy: false,
					marker: new google.maps.Marker({
						position: position,
						title: 'My Current Location',
						shadow: shadow,
						icon: image
					})
				}),
				new Ext.plugin.google.Traffic()
			],

			//useCurrentLocation: true,

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

function get_location() {
	Ext.device.Geolocation.getCurrentPosition({
		success: function(position) {
			var coordinates = position.coords,
				location = "Longitude " + coordinates.longitude + " Latitude " + coordinates.latitude + " Accuracy " + coordinates.accuracy,
				latitude = coordinates.latitude,
				longitude =  coordinates.longitude,
				accuracy = coordinates.accuracy;
				
			console.log('coords ' + location);

			// initialize sessionStorage
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
};

