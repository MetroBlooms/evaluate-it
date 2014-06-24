/**
 * Widget with template to render displayed sites to grab geolocation
*/
Ext.define('EvaluateIt.view.SiteGeolocationList', {
    extend: 'Ext.dataview.List',
	alias : 'widget.siteGeolocationList',
    config: {
		width: Ext.os.deviceType == 'Phone' ? null : 300,
		height: Ext.os.deviceType == 'Phone' ? null : 500,
		xtype: 'list',
		store: 'Geolocations', //getRange(0, 9),
        itemTpl: [
            '<div><strong>Address:{Site.Address.address} Captured at:{accuracy}</strong></div> '
        ],
		variableHeights: false
    }

}); 



