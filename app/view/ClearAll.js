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
								//animateTarget: 'mb4',
								//icon: Ext.MessageBox.WARNING,
								fn: function(buttonId) {
								
									if (buttonId === 'yes') {
										var //evaluationsStore = Ext.getStore('SiteEvaluations');
											evaluatorsStore = Ext.getStore('Evaluators');

										//evaluationsStore.removeAll();
										evaluatorsStore.removeAll();
										//evaluationsStore.sync();
										evaluatorsStore.sync();
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

