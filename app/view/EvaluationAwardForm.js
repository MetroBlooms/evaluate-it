/**
 * Form panel view for selecting evaluation award
 * Binds to model and store in EvaluateIt.controller.EvaluationAward
 *
 *
 * TODO: set height/width for tablet, rename alias, etc. to fit normalized model
 */
Ext.define('EvaluateIt.view.EvaluationAwardForm', {
	extend: 'Ext.form.Panel',
	alias : 'widget.evaluationAwardForm',
	requires: [
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Number',
        'Ext.field.Select',
        'Ext.field.Hidden'
    ],
	config: {
	 

         // We give it a left and top property to make it floating by default
       	left: 0,
		top: 0,

        //Make it modal so you can click the mask to hide the overlay
       	modal: true,
		hideOnMaskTap: true,

        // Set the width and height of the panel
       	width: Ext.os.deviceType == 'Phone' ?  screen.width : 350,
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
		   		readOnly: true 
			},

            // Awards given as per evaluation rules on instrument
            // TODO: create enumeration
         	{
				xtype: 'selectfield',
				itemId: 'awardId',
				name: 'awardId',
				label: 'Award',
				autoSelect: false,
				placeHolder: 'Select award',
				options: [
					{text: ''},
					{text: 'Boulevard Garden',  value: '1'},
					{text: 'Business Garden or Raingarden',  value: '2'},
					{text: 'Container/WindowBox Garden',  value: '3'},
					{text: 'Congregation Garden or Raingarden',  value: '4'},
					{text: 'Residential Garden or Raingarden',  value: '5'},
					{text: 'Alley Garden',  value: '6'},
					{text: 'Public & Schoolyard Garden or Raingarden',  value: '7'},
					{text: 'Nate Siegel',  value: '8'},
					{text: 'Special',  value: '9'}
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
