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

	onSaveGeolocation: function(button) {
		console.log('Button Click for Save');
		var form = button.up('panel');
		//get the record 
		var record = form.getRecord();
		//get the form values
		var values = form.getValues();
		//if a new geolocation
		if(!record){
			var newRecord = new EvaluateIt.model.Contact(values);
			Ext.getStore('SiteEvaluations').add(newRecord);
		}
		//existing geolocation
		else {
			record.set(values);
		}
		form.hide();
		//save the data to the Web local Storage
		Ext.getStore('SiteEvaluations').sync();

	},

	// TODO: add Google map
	onSelectGeolocation: function(view, index, target, record, event) {
		console.log('Selected a Geolocation from the list');
		//var geolocationForm = Ext.Viewport.down('geolocationEdit');

		// Google maps stuff here: TODO make and external function

		var position = new google.maps.LatLng(44.9616427, -93.33537489999999),  

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
			title: 'Test',
			defaults: {
				iconMask: true
			},
			items: [
				{
					iconCls: 'home',
					handler: function() {
						//disable tracking
						var segmented = Ext.getCmp('segmented'),
							pressedButtons = segmented.getPressedButtons(),
							trafficIndex = pressedButtons.indexOf(trafficButton),
							newPressed = (trafficIndex != -1) ? [trafficButton] : [];
						segmented.setPressedButtons(newPressed);
						mapdemo.getMap().panTo(position);
					}
				},
				{
					id: 'segmented',
					xtype: 'segmentedbutton',
					allowMultiple: true,
					listeners: {
						toggle: function(buttons, button, active) {
							if (button == trafficButton) {
								mapdemo.getPlugins()[1].setHidden(!active);
							}
							else if (button == trackingButton) {
								var tracker = mapdemo.getPlugins()[0],
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
				{
					xtype: 'button',
					itemId: 'save',
					text: 'Save Location'
				}
			]
		});

		var mapdemo = Ext.create('Ext.Map', {
			alias : 'widget.whereAmI',

			mapOptions : {
				center : new google.maps.LatLng(44.9616427, -93.33537489999999),
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

		var panel = new Ext.form.Panel({
			fullscreen: true,
			layout: 'fit',
			items: [toolbar, mapdemo],
			itemTpl: [
				'<div><strong>{address}</strong></div> '
			]

		});

		panel.show();

		//if(!geolocationForm){
		//	geolocationForm = Ext.widget('geolocationEdit');
		//}	 
		//geolocationForm.setRecord(record);
		//geolocationForm.showBy(target);
	}

});
