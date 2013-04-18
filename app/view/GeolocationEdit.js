Ext.define('EvaluateIt.view.GeolocationEdit', {
	extend: 'Ext.form.Panel',
	alias : 'widget.geolocationEdit',
	requires: [
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Number',
        'Ext.field.DatePicker',
        'Ext.field.Select',
        'Ext.field.Hidden'
    ],
	config: {
 
	// We give it a left and top property to make it floating by default
		left: 0,
		top: 0,

		// Make it modal so you can click the mask to hide the overlay
		modal: true,
		hideOnMaskTap: true,

		// Set the width and height of the panel
		width: 400,
		height: 330,
		scrollable: true,
	 	layout: {
			type: 'vbox'
		},
		defaults: {
			margin: '0 0 5 0',
			labelWidth: '40%',
			labelWrap: true
		},
		items: [
			{
				xtype: 'datepickerfield',
				destroyPickerOnHide: true,
				name : 'datOfEvaluation',
				label: 'Date of evaluation',
				value: new Date(),
				picker: {
					yearFrom: 1990
				}
			},
			{	
       			xtype: 'textfield',
		   		name: 'address',
		   		label: 'Address',
		   		itemId: 'address' 
			},

			// TODO: add Google maps and write gelocation to data store, using Ext.getCmp(id).
			{	
       			xtype: 'textfield',
		   		label: 'Latitude',
		   		itemId: 'latitude',
				id: 'latitude',
			 	value: sessionStorage.latitude 			
			},
			{	
       			xtype: 'textfield',
		   		label: 'Longitude',
		   		id: 'longitude',
			 	value: sessionStorage.longitude
			},
			{	
       			xtype: 'textfield',
		   		label: 'Accuracy',
		   		id: 'accuracy',
			 	value: sessionStorage.accuracy
			},
			{
				xtype: 'button',
				itemId: 'save',
				text: 'Save'
			},
			{

				xtype: 'map',

				useCurrentLocation: true,
				listeners: {
					maprender : function(comp, map){

						setTimeout(function() {
							var marker = new google.maps.Marker({
								position: map.center,
								title : 'testing',
								map: map
								
							});

							console.log("test" + map.center.lat() + ' ' + map.center.lng());
						}, 100);
					}
				}

			}
            
        ]
    }
});

/*Ext.Viewport.add({

	xtype: 'map',

	useCurrentLocation: true,
    listeners: {
        maprender : function(comp, map){

			setTimeout(function() {
				var marker = new google.maps.Marker({
					position: map.center,
					title : 'testing',
					map: map
					
				});

				console.log("test" + map.center.lat() + ' ' + map.center.lng());
			}, 100);
        }
    }

});*/

// For comparison to coordinates deriveed from Google maps API above
// get geolocation using device; write to sessionStorage for session persistance
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


