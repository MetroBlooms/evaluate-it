// clear data stores
 
Ext.define('EvaluateIt.view.ClearAll', {
    extend: 'Ext.Container',
	alias: 'widget.clearview',
    config: {
        scrollable: true,
        items: [
            {
                xtype: 'panel',
                id: 'Clear',
                styleHtmlContent: true
            },
            {
                docked: 'top',
                xtype: 'toolbar',
                items: [
					{
						xtype: 'button',
						itemId: 'clearStoreButton',
						text: 'Clear all data',
						iconCls: 'arrow_right',
						iconMask: true,
						handler: function() {

							Ext.Msg.show({
								title:'Are you sure?',
								buttons: Ext.MessageBox.YESNO,

								fn: function(buttonId) {
								
									if (buttonId === 'yes') {
                                        EvaluateIt.utils.DataService.clear_all();
                                      	alert('Data gone!');
                                    }
									else {
										alert('Data unscathed!');
									}	
								}	
					    	});
						}
 
					}
                ]
            }
        ]
	}
});

