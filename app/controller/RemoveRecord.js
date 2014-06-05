/**
 * Controls record removal from data store
 */
Ext.define('EvaluateIt.controller.RemoveRecord', {
	extend : 'Ext.app.Controller',

	config: {
  		profile: Ext.os.deviceType.toLowerCase(),
  		stores : ['Sites'],
  		models : ['Site'],
		refs: {
   			myRemoveRecordList: 'removeRecordList'
  		},
		control: {
			'removeRecordList': {
				activate: 'onActivate',
				itemtap: 'onSelectRemoveRecord'
			}
		}	  

 	},

	onActivate: function() {
  		console.log('Main container is active');
 	},

	onSelectRemoveRecord: function(view, index, target, record, event) {
		console.log('Selected a record for removal from the list');
		var	id = record.get('id'), // get key
			evaluationStore = Ext.create('EvaluateIt.store.SiteEvaluations')
			index;

		console.log('id: ' + record.get('id'));
		
		Ext.Msg.show({
			title:'Are you sure?',
			buttons: Ext.MessageBox.YESNO,

			fn: function(buttonId) {

				if (buttonId === 'yes') {
					evaluationStore = Ext.getStore(evaluationStore);
					index = evaluationStore.findExact('id', id); // get index of record

					console.log('index: ' + index);
					evaluationStore.removeAt(index); // remove record by index 
					evaluationStore.sync();
					alert('It is gone!');

            		Ext.StoreMgr.get('SiteEvaluations').load();
					

				}
				else {
					alert('Unscathed!');
				}	
			}	
		});
	}

});
