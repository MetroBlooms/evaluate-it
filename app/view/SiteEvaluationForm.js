// TODO: add remaining evaluation eementss (based on requirements)

Ext.define('EvaluateIt.view.SiteEvaluationForm', {
	extend: 'Ext.form.Panel',
	alias : 'widget.siteEvaluationForm',
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
				itemId: 'useOfColor',
				name: 'useOfColor',
				label: 'Use of color',
				autoSelect: false,
				placeHolder: 'Select a score',
				options: [
					{text: ''},
					{text: '0',  value: '1'},
					{text: '1',  value: '2'},
					{text: '2',  value: '3'},
					{text: '3',  value: '4'},
					{text: '4',  value: '5'}
				]
			},  
			{
				xtype: 'selectfield',
				itemId: 'varietyAndHealth',
				name: 'varietyAndHealth',
				label: 'Plant variety and health',
				autoSelect: false,
				placeHolder: 'Select a score',
				options: [
					{text: ''},
					{text: '0',  value: '1'},
					{text: '1',  value: '2'},
					{text: '2',  value: '3'},
					{text: '3',  value: '4'},
					{text: '4',  value: '5'}
				]
			},  
			{
				xtype: 'selectfield',
				itemId: 'design',
				name: 'design',
				label: 'Design',
				autoSelect: false,
				placeHolder: 'Select a score',
				options: [
					{text: ''},
					{text: '0',  value: '1'},
					{text: '1',  value: '2'},
					{text: '2',  value: '3'},
					{text: '3',  value: '4'},
					{text: '4',  value: '5'}
				]
			},  
			{
				xtype: 'selectfield',
				itemId: 'maintenance',
				name: 'maintenance',
				label: 'Maintenance',
				autoSelect: false,
				placeHolder: 'Select a score',
				options: [
					{text: ''},
					{text: '0',  value: '1'},
					{text: '1',  value: '2'},
					{text: '2',  value: '3'},
					{text: '3',  value: '4'},
					{text: '4',  value: '5'}
				]
			},  
			{
				xtype: 'selectfield',
				itemId: 'environmentalStewardship',
				name: 'environmentalStewardship',
				label: 'Environmental Stewardship',
				autoSelect: false,
				placeHolder: 'Select a score',
				options: [
					{text: ''},
					{text: '0',  value: '1'},
					{text: '1',  value: '2'},
					{text: '2',  value: '3'},
					{text: '3',  value: '4'},
					{text: '4',  value: '5'}
				]
			},  
			{
				xtype: 'button',
				itemId: 'save',
				text: 'Save'
			}
            
        ]
    }
  
});
