// TODO: add remaining evaluation eementss (based on requirements)

var formPanel = Ext.define('EvaluateIt.view.EvaluationForm', {
	extend: 'Ext.form.Panel',
	//id: 'evaluationId',
	alias : 'widget.siteEvaluationForm',
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
		//width: 400,
		//height: 330,
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
			{
				xtype: 'selectfield',
				itemId: 'visualImpact',
				name: 'visualImpact',
				label: 'Visual impact',
				autoSelect: false,
				//blur : doCalculateTotals(),
				placeHolder: 'Select a score',
				options: [
					{text: ''},
					{text: '0',  value: '0'},
					{text: '1',  value: '1'},
					{text: '2',  value: '2'},
					{text: '3',  value: '3'},
					{text: '4',  value: '4'}
				]
			},  
			{
				xtype: 'selectfield',
				itemId: 'varietyAndHealth',
				name: 'varietyAndHealth',
				label: 'Plant variety and health',
				autoSelect: false,
				//blur : doCalculateTotals(),
				placeHolder: 'Select a score',
				options: [
					{text: ''},
					{text: '0',  value: '0'},
					{text: '1',  value: '1'},
					{text: '2',  value: '2'},
					{text: '3',  value: '3'},
					{text: '4',  value: '4'}
				]
			},  
			{
				xtype: 'selectfield',
				itemId: 'design',
				name: 'design',
				label: 'Design',
				autoSelect: false,
				//blur : doCalculateTotals(),
				placeHolder: 'Select a score',
				options: [
					{text: ''},
					{text: '0',  value: '0'},
					{text: '1',  value: '1'},
					{text: '2',  value: '2'},
					{text: '3',  value: '3'},
					{text: '4',  value: '4'}
				]
			},  
			{
				xtype: 'selectfield',
				itemId: 'maintenance',
				name: 'maintenance',
				label: 'Maintenance',
				autoSelect: false,
				//blur : doCalculateTotals(),
				placeHolder: 'Select a score',
				options: [
					{text: ''},
					{text: '0',  value: '0'},
					{text: '1',  value: '1'},
					{text: '2',  value: '2'},
					{text: '3',  value: '3'},
					{text: '4',  value: '4'}
				]
			},  
			{
				xtype: 'selectfield',
				itemId: 'environmentalStewardship',
				name: 'environmentalStewardship',
				label: 'Environmental Stewardship',
				autoSelect: false,
				//blur : doCalculateTotals(),
				placeHolder: 'Select a score',
				options: [
					{text: ''},
					{text: '0',  value: '0'},
					{text: '1',  value: '1'},
					{text: '2',  value: '2'},
					{text: '3',  value: '3'},
					{text: '4',  value: '4'}
				]
			},
			{
				xtype: 'textfield',
				label: 'Total score:',
				name: 'sumRating',
				readOnly: true
			},  
			{
				xtype: 'hiddenfield',
				name: 'imageUri',
				itemId: 'imageId' 
			}, 
			/*{
				xtype: 'button',
        		text: 'Sum factors',
        		handler: function(btn){
    				//console.log(Ext.getCmp('design'));	//console.log(form value);
					console.log(Ext.getCmp('design').getValue());
					
        		}
    		},*/
			{
                 xtype: 'button',
                 itemId: 'siteImage',
                 text: 'Select Photo'
            }, 
			{
				xtype: 'button',
				itemId: 'save',
				text: 'Save'
			}
            
        ]
    }
  
});
