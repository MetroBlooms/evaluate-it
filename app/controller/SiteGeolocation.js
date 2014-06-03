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

		// grab geolocation coordinates from device API

		// Google maps API stuff here
		var latitude = sessionStorage.latitude, //44.9616164; 
		    longitude = sessionStorage.longitude; //-93.33539329999999,

		console.log('latitude/longitude ...' + sessionStorage.latitude + ' ' + sessionStorage.longitude);

		//alert('Coords ' +  + sessionStorage.latitude + ' ' + sessionStorage.longitude);

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
						// destroy form.Panel overlay to return to tree store view 
						handler: function() {
							geo_panel.destroy();						
						}
            		},
					{
						iconCls: 'home',
						handler: function() {
							google_map.getMap().panTo(position);
						}
					},
					// display selected address
					/*{	
						xtype: 'textfield', 
						name: 'address',
						itemId: 'address',
						readOnly: true
					},*/
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
							Ext.getStore('Geolocations').sync();
							alert('Location was saved successfully!');

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
			//config: {
			//	width: Ext.os.deviceType == 'Phone' ?  screen.width : 300,
			//	height: Ext.os.deviceType == 'Phone' ?  screen.height : 500,

				fullscreen: true,
				layout: 'fit',
				items: [toolbar, google_map]
			//}

		});
		geo_panel.setRecord(record);
		geo_panel.show();

	}

});





