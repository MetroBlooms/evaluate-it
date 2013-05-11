// TODO: add remaining evaluation eementss (based on requirements)

Ext.define('EvaluateIt.view.EvaluationAwardForm', {
	extend: 'Ext.form.Panel',
	alias : 'widget.evaluationAwardForm',
	requires: [
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Number',
        'Ext.field.Spinner',
        'Ext.field.Password',
        'Ext.field.Email',
        'Ext.field.Url',
        'Ext.field.DatePicker',
        'Ext.field.Select',
        'Ext.field.Hidden',
        'Ext.field.Radio',
        'Ext.field.Slider',
        'Ext.field.Toggle',
        'Ext.field.Search'
    ],
	config: {
	 
	// We give it a left and top property to make it floating by default
		left: 0,
		top: 0,

		// Make it modal so you can click the mask to hide the overlay
		modal: true,
		hideOnMaskTap: true,

		// Set the width and height of the panel
		//width: 400,
		//height: 330,
		width: Ext.os.deviceType == 'Phone' ?  screen.width : 300,
		height: Ext.os.deviceType == 'Phone' ?  screen.height : 500,
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
				xtype: 'selectfield',
				itemId: 'awardId',
				name: 'awardId',
				label: 'Award',
				autoSelect: false,
				placeHolder: 'Select an award',
				options: [
					{text: ''},
					{text: 'Residential',  value: '1'},
					{text: 'Residential Raingarden',  value: '2'},
					{text: 'Boulevard',  value: '3'},
					{text: 'Business Raingarrden',  value: '4'},
					{text: 'Apartment',  value: '5'},
					{text: 'Business Raingarrden',  value: '6'},
					{text: 'Community',  value: '7'},
					{text: 'Public',  value: '8'},
					{text: 'School',  value: '9'},
					{text: 'Congregation',  value: '10'},
					{text: 'Windowbox/container',  value: '11'},
					{text: 'Nate Siegel',  value: '12'},
					{text: 'Special',  value: '13'}
				]
			},  
			{	
       			xtype: 'textfield',
		   		name: 'specialAwardSpecified',
		   		label: 'Special Award Specified',
		   		itemId: 'specialAwardSpecified' 
			},   
			{
				xtype: 'button',
				itemId: 'save',
				text: 'Save'
			}
            
        ]
    }
  
});
