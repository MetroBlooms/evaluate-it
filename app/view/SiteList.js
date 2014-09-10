/**
 * Widget, with template to render displayed sites to evaluate 
*/
Ext.define('EvaluateIt.view.SiteList', {
    extend: 'Ext.List',
	alias : 'widget.siteList',
    config: {
		width: Ext.os.deviceType == 'Phone' ? null : 300,
		height: Ext.os.deviceType == 'Phone' ? null : 500,
        xtype: 'list',
		store: 'Addresses',
        /**
         * Template to display list
         */
		itemTpl: [
            '<div>',
            '<strong>Address: {address}</strong>',
            '</div> '

		],
        listeners: {
            select: function(list) {
                setTimeout(function() {list.deselectAll();},1); // With the timeout we allow the select to finish setting the selected class before deselecting
                return false; // prevent selection
            }
        },
        // item

        variableHeights: false

    }

}); 


