// clear data store
 
Ext.define('EvaluateIt.view.Clear', {
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
								//animateTarget: 'mb4',
								//icon: Ext.MessageBox.WARNING,
								fn: function(buttonId) {
									//alert('You pressed the "' + buttonId + '" button.');
								
									if (buttonId === 'yes') {
										var evaluationsStore = Ext.getStore('SiteEvaluations');
										evaluationsStore.removeAll();
										evaluationsStore.sync();
										alert('All gone!');

									}
									else {
										alert('Unscathed!');
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

