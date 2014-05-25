/**
 * Widget with template to render displayed sites to evaluate for a possible award
 * TODO: point to normalized store/model, set tablet height/width
 */
Ext.define('EvaluateIt.view.EvaluationScorecardList', {
    extend: 'Ext.dataview.List', //'Ext.tab.Panel',
	alias : 'widget.evaluationScorecardList',
    config: {
		width: Ext.os.deviceType == 'Phone' ? null : 300,
		height: Ext.os.deviceType == 'Phone' ? null : 500,
		xtype: 'list',
		store: 'EvaluationScorecards',

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


