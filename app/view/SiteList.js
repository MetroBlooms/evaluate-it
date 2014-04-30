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
		store: 'Sites',
        /**
         * Template to display list
         */
		itemTpl: [
            '<div>',
            '<strong>Address: {address.address}</strong>',
            '</div> '

		],
		variableHeights: false
    }

}); 


