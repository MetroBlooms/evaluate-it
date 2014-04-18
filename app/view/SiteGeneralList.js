/**
 * Widget, with template to render displayed sites to evaluate 
*/
Ext.define('EvaluateIt.view.SiteGeneralList', {
    extend: 'Ext.List',
	alias : 'widget.siteGeneralList',
    config: {
		width: Ext.os.deviceType == 'Phone' ? null : 300,
		height: Ext.os.deviceType == 'Phone' ? null : 500,
		xtype: 'list',
		store: 'SiteEvaluations',
        /**
         * Template to display list
         */
		itemTpl: [
			'<div><strong>Address: {address}</strong></div> '

		],
		variableHeights: false
    }

}); 


