/**
 * Widget, with template to render displayed sites to grab geolocation 
*/


Ext.define('EvaluateIt.view.GeolocationList', {
    extend: 'Ext.dataview.List', //'Ext.tab.Panel',
	alias : 'widget.geolocationList',
    config: {
		width: Ext.os.deviceType == 'Phone' ? null : 300,
		height: Ext.os.deviceType == 'Phone' ? null : 500,
		xtype: 'list',
		store: 'SiteEvaluations', //getRange(0, 9),
		itemTpl: [
			'<div><strong>siteid: {address}</strong></div> '
		],
		variableHeights: false
    }

}); 



