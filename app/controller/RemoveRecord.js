Ext.define('EvaluateIt.controller.RemoveRecord', {
	extend : 'Ext.app.Controller',

	config: {
  		profile: Ext.os.deviceType.toLowerCase(),
  		stores : ['SiteEvaluations'],
  		models : ['SiteEvaluation'],
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
			//animateTarget: 'mb4',
			//icon: Ext.MessageBox.WARNING,
			fn: function(buttonId) {
				//alert('You pressed the "' + buttonId + '" button.');
			
				if (buttonId === 'yes') {
					evaluationsStore = Ext.getStore(evaluationStore); 
					index = evaluationStore.findExact('id', id); // get index of record

					console.log('index: ' + index);
					evaluationStore.removeAt(index); // remove record by index 
					evaluationStore.sync();
					alert('It is gone!');

					Ext.getStore(evaluationStore).load();

				}
				else {
					alert('Unscathed!');
				}	
			}	
		});
	}

});
