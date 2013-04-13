/**
 * Widget, with template to render displayed sites to evaluate 
*/

Ext.define('EvaluateIt.view.EvaluationList', {
    extend: 'Ext.dataview.List', //'Ext.tab.Panel',
	alias : 'widget.evaluationList',
    config: {
		width: Ext.os.deviceType == 'Phone' ? null : 300,
		height: Ext.os.deviceType == 'Phone' ? null : 500,
		xtype: 'list',
		store: 'SiteEvaluations', //getRange(0, 9),
		itemTpl: [
			'<div><strong>siteid: {site_id}</strong> remoteSiteId:{remoteSiteId}, remoteEvaluationId: {remoteEvaluationId}</div> '
		],
		variableHeights: false
    }

}); 


