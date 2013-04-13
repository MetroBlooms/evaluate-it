/**
 * Widget, with template to render "completed" sites to push to remote server 
*/


Ext.define('EvaluateIt.view.PushList', {
    extend: 'Ext.dataview.List', //'Ext.tab.Panel',
	alias : 'widget.pushList',
    config: {
		width: Ext.os.deviceType == 'Phone' ? null : 300,
		height: Ext.os.deviceType == 'Phone' ? null : 500,
		xtype: 'list',
		store: 'SiteEvaluations', //getRange(0, 9),
		itemTpl: [
			'<div><strong>Address: {address}</strong></div> '
		],
		variableHeights: false
    }

}); 



