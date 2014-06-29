/**
 * Widget with template to render "completed" sites to push to remote server
 *
 * TODO: point to normalized store/model
 * TODO: set tablet height/width
*/
Ext.define('EvaluateIt.view.PushList', {
    extend: 'Ext.dataview.List',
	alias : 'widget.pushList',
    config: {
		width: Ext.os.deviceType == 'Phone' ? null : 300,
		height: Ext.os.deviceType == 'Phone' ? null : 500,
		xtype: 'list',
		store: 'EvaluationScorecards',
        /**
         * Template to display list
         */

		itemTpl: [
        // TODO: Somehow grab datePostedToRemote from Evaluation store
            '<div><strong>Address: {Evaluation.Site.Address.address} </strong></div> ' +
            '<tpl if="postedToRemote === 1">' +
                'Pushed on: {Evaluation.datePostedToRemote}' +
            '</tpl>'
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



