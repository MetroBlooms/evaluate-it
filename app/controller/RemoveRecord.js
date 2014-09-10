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
        if (EvaluateIt.config.mode === 'test') {
            console.log('Main container is active');
        }
 	},

	onSelectRemoveRecord: function(view, index, target, record, event) {
        if (EvaluateIt.config.mode === 'test') {
            console.log('Selected a record for removal from the list');
        }
		var	id = record.get('id'), // get key
			index;

        if (EvaluateIt.config.mode === 'test') {
            console.log('id: ' + record.get('id'));
        }
		
		Ext.Msg.show({
			title:'Are you sure?',
			buttons: Ext.MessageBox.YESNO,

			fn: function(buttonId) {

				if (buttonId === 'yes') {

                    EvaluateIt.utils.DataService.remove_record(id);

				}
				else {
					alert('Unscathed!');
				}	
			}	
		});
	}

});
