/**
 * Widget, with template to render displayed sites to grab geolocation 
*/


Ext.define('EvaluateIt.view.SiteGeolocationList', {
    extend: 'Ext.dataview.List', //'Ext.tab.Panel',
	alias : 'widget.siteGeolocationList',
    config: {
		width: Ext.os.deviceType == 'Phone' ? null : 300,
		height: Ext.os.deviceType == 'Phone' ? null : 500,
		xtype: 'list',
		store: 'SiteEvaluations', //getRange(0, 9),
		itemTpl: [
			'<div><strong>{accuracy}-Address: {address}</strong></div> '
		],
		variableHeights: false
    }

}); 



