Ext.define('EvaluateIt.controller.Evaluations', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.MessageBox'
    ],
    config: {
        refs: {
            main: 'Evaluation'
            //EvaluationDetails: 'EvaluationDetails',
            //EvaluationHistoryList: 'EvaluationHistoryList',
            //EvaluationPanel: 'EvaluationPanel'
        },

        control: {
            'button[action="EvaluationBack"]': {
                tap: 'showEvaluationList'
            },
            'EvaluationList': {
                select: 'onSelectEvaluation'
            },
           // EvaluationPanel: {
           //     activeitemchange: 'onEvaluationPanelChange'
           // },
            'button[action="EvaluationAddItem"]': {
                tap: 'onAddItemTap'
            }
        }
    },

    init: function() {
    },

    showEvaluationList: function() {
        this.getMain().animateActiveItem(0,{type:'slide',reverse:true});
    },

    onAddItemTap: function() {
        Ext.Msg.alert('TODO','I guess you will have to implement this yourself :)');
    },

    /*onEvaluationPanelChange: function(layout, newItem, oldItem) {
        switch (newItem.xtype) {
            case 'EvaluationTimeList':
            case 'EvaluationActivityList':
                this.getEvaluationPanel().down('button[action="EvaluationAddItem"]').setHidden(false);
                break;
            default:
                this.getEvaluationPanel().down('button[action="EvaluationAddItem"]').setHidden(true);
                break;
        }
    },*/

    onSelectEvaluation: function(list, record) {
        var detailPanel = this.getEvaluationDetails();
        detailPanel.setValues(record.getFlattenedData(true));
        detailPanel.getScrollable().getScroller().scrollTo(0,0);

        var activityStore = Ext.getStore('Activities');
        activityStore.clearFilter();
        activityStore.filter('EvaluationId',record.get('id'));

        var timeStore = Ext.getStore('Times');
        timeStore.clearFilter();
        timeStore.filter('EvaluationId',record.get('id'));


        var EvaluationPanel = this.getEvaluationPanel();
        EvaluationPanel.down('toolbar').setTitle('Work order '+record.get('id')+' ('+record.get('ServiceRequest').status+')');
        EvaluationPanel.setActiveItem(0);

        var historyList = this.getEvaluationHistoryList();
        var installedProduct = record.getAssociatedRecords('InstalledProduct'); // Traverse up to get the parent InstalledProduct
        var historyRecords = installedProduct[0].getAssociatedRecords('ServiceRequest'); // Traverse down to get all Service requests

        for (var i=historyRecords.length-1;i>=0;i--) {
            if (historyRecords[i].get('id') === record.get('ServiceRequest').id) {
                historyRecords.splice(i,1);
            }
        }

        var historyStore = historyList.getStore();
        historyStore.removeAll();
        historyStore.add(historyRecords);
        // historyList.

        this.getMain().animateActiveItem(1,{type:'slide',reverse:false});
    }

});