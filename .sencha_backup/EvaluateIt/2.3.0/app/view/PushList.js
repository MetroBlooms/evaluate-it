/**
 * Widget with template to render "completed" sites to push to remote server
 *
 * TODO: point to normalized store/model
 * TODO: set tablet height/width
*/
Ext.define('EvaluateIt.view.PushList', {
    extend: 'Ext.dataview.List',
	alias : 'widget.pushList',
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



