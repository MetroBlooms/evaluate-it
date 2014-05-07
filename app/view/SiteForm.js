/**
 * Form panel view for selecting collecting evaluation attributes (See EvaluateIt.view.EvaluationCriteria for criteria)
 * Binds to model and store in EvaluateIt.controller.Evaluation
 *
 *
 * TODO: set height/width for tablet, rename alias, etc. to fit normalized model: EvaluateIt.model.Site and EvaluateIt.model.Address
 */
Ext.define('EvaluateIt.view.SiteForm', {
	extend: 'Ext.form.Panel',
	alias : 'widget.siteForm',
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

        // Make it modal so you can click the mask to hide the overlay
		modal: true,
		hideOnMaskTap: true,

        // Set the width and height of the panel
		width: Ext.os.deviceType == 'Phone' ?  screen.width : screen.width,
		height: Ext.os.deviceType == 'Phone' ?  screen.height : screen.height,
		scrollable: true,
	 	layout: {
			type: 'vbox'
		},
		defaults: {
			margin: '0 0 5 0',
			labelWidth: '45%',
			labelWrap: true
		},

        /**
         * @cfg
         *
         * General controls for Site, Address model entry
         *
         * TODO: create enumeration
         */
		items: [
			/*{
				xtype: 'datepickerfield',
				destroyPickerOnHide: true,
				name : 'dateOfEvaluation', 
				label: 'Date of evaluation',
				dateFormat: 'm/d/Y',
				value: new Date(),
				picker: {
					yearFrom: 2014
				}
			},*/
            {
                xtype: 'textfield',
                name: 'address_id',
                label: 'Address.id',
                itemId: 'address_id'
            },
            {
       			xtype: 'textfield',
		   		name: 'Address.address',
		   		label: 'Address',
		   		itemId: 'address'
			}, /*
			{	
       			xtype: 'textfield',
		   		name: 'Address.city',
		   		label: 'City',
		   		itemId: 'Address.city'
			},  
			{ 
       			xtype: 'textfield',
		   		name: 'Address.state',
		   		label: 'State',
		   		itemId: 'Address.state'
			},
			{   
       			xtype: 'textfield',
		   		name: 'Address.zipcode',
		   		label: 'Zipcode',
		   		itemId: 'Address.zipcode'
			},   
			{   
       			xtype: 'textfield',
		   		name: 'Address.neighborhood',
		   		label: 'Neighborhood',
		   		itemId: 'Address.neighborhood'
			},   
			{   
       			xtype: 'textfield',
		   		name: 'Address.county',
		   		label: 'County',
		   		itemId: 'Address.county'
			},*/
			{
				xtype: 'button',
				itemId: 'save',
				text: 'Save'
			}
            
        ]
    }
  
});
