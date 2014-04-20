/**
 * Widget with template to render displayed sites to evaluate
*/

Ext.define('EvaluateIt.view.EvaluationList', {
    extend: 'Ext.List',//'Ext.dataview.List',
	alias : 'widget.evaluationList',
    config: {
		width: Ext.os.deviceType == 'Phone' ? null : 300,
		height: Ext.os.deviceType == 'Phone' ? null : 500,
		xtype: 'list',
		store: 'Sites',
        /**
         * Template to display list
         */
		itemTpl: [
            '<div>',
            '<strong>Address: {Address.address}</strong>',
            '</div> '
		],
        listeners: {
            select: function(list) {
                setTimeout(function() {list.deselectAll();},1); // With the timeout we allow the select to finish setting the selected class before deselecting
                return false; // prevent selection
            }
        },
        // item

		variableHeights: false
    }

}); 


