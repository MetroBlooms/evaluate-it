// TODO: add remaining evaluation eementss (based on requirements)

Ext.define('EvaluateIt.view.EvaluationGeneralForm', {
	extend: 'Ext.form.Panel',
	alias : 'widget.evaluationGeneralForm',
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
				xtype: 'datepickerfield',
				destroyPickerOnHide: true,
				name : 'datOfEvaluatione',
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
			{	
       			xtype: 'textfield',
		   		name: 'name',
		   		label: 'Gardener name',
		   		itemId: 'name',
				value: 'Me!' 
			},  
			{
				xtype: 'checkboxfield',
				itemId: 'noLongerExists',
				name: 'noLongerExists',
				label: 'Site no longer exists!'
			},  
			{
				xtype: 'checkboxfield',
				itemId: 'rainGarden',
				name: 'rainGarden',
				label: 'There is a raingarden'
			},  
			{
				xtype: 'checkboxfield',
				itemId: 'rainBarrel',
				name: 'rainBarrel',
				label: 'There is a rain barrel'
			},	
			{	
       			xtype: 'textfield',
		   		name: 'comments',
		   		label: 'Comments',
		   		itemId: 'comments' 
			},   
			{
				xtype: 'button',
				itemId: 'save',
				text: 'Save'
			}
            
        ]
    }
  
});
