/**
 * Widget with template to render displayed sites to evaluate for a possible award
 * TODO: point to normalized store/model, set tablet height/width
 */
Ext.define('EvaluateIt.view.EvaluationAwardList', {
    extend: 'Ext.dataview.List', //'Ext.tab.Panel',
	alias : 'widget.evaluationAwardList',
    config: {
		width: Ext.os.deviceType == 'Phone' ? null : 300,
		height: Ext.os.deviceType == 'Phone' ? null : 500,
		xtype: 'list',
		store: 'EvaluationAwards',

        /**
         * Template to display list
         */
		itemTpl: [
			'<div><strong>Address: {Evaluation.Site.Address.address}</strong></div> '
		],
        listeners: {
            select: function(list) {
                setTimeout(function() {list.deselectAll();},1); // With the timeout we allow the select to finish setting the selected class before deselecting
                return false; // prevent selection
            }
        },
		variableHeights: false
    }

}); 


