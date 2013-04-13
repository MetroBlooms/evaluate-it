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
			}
            
        ]
    }
});


