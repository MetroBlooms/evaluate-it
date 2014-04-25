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
		store: 'Sites', //getRange(0, 9),
		itemTpl:  new Ext.XTemplate(//[
            /**
             * Template to display list
             */
			'<tpl if="values.accuracy !== null"> {accuracy} m for</tpl>' +
                '<div>',
                '<strong>Address: {Address.address}</strong>',
                '</div> '
		),
		variableHeights: false
    }

}); 



