Ext.define('EvaluateIt.view.ProduceEdit', {
	extend: 'Ext.tab.Panel',
	alias : 'widget.produceEdit',

	config: {
	 
	// We give it a left and top property to make it floating by default
		left: 0,
		top: 0,

		// Make it modal so you can click the mask to hide the overlay
		modal: true,
		hideOnMaskTap: true,

		// Set the width and height of the panel
		width: 400,
		height: 230,
	 	layout: {
			type: 'vbox'
		},
		defaults: {
			margin: '0 0 5 0',
			labelWidth: '30%'
		},
		items: [
			{	
       			xtype: 'textfield',
		   		name: 'str',
		   		label: 'Produce kind',
		   		itemId: 'str' 
			},   
			{
				xtype: 'selectfield',
				itemId: 'category',
				name: 'category',
				label: 'Category',
				autoSelect: false,
				placeHolder: 'Select a gender',
				options: [
					{text: 'vegetable',  value: 'vegetable'},
					{text: 'fruit', value: 'fruit'}
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
