/**
 * Demonstrates how to create a simple List based on inline data.
 * First we create a simple Contact model with first and last name fields, then we create a Store to contain
 * the data, finally we create the List itself, which gets its data out of the Store
 */

Ext.define('EvaluateIt.view.EvaluationList', {
    extend: 'Ext.dataview.List', //'Ext.tab.Panel',
    requires: ['EvaluateIt.model.Site','EvaluateIt.model.Evaluation','EvaluateIt.model.Address','EvaluateIt.controller.Main'],
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


