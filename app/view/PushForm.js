Ext.define('EvaluateIt.view.PushForm', {
	extend: 'Ext.form.Panel',
	alias : 'widget.pushForm',
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
       			xtype: 'textfield',
		   		name: 'address',
		   		label: 'Address',
		   		itemId: 'address' 
			},
			{
				xtype: 'checkboxfield',
				id: 'addImage',
				label: 'Upload Image'
			},

			{
				xtype: 'button',
				itemId: 'save',
				text: 'Save'
			}
            
        ]
    }
});


