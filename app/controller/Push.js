/**
 * Handle data transfers to remote server
 *
 */
Ext.define('EvaluateIt.controller.Push', {
	extend: 'Ext.app.Controller',

	config: {
		profile: Ext.os.deviceType.toLowerCase(),
  		stores: ['SiteEvaluations'],
  		models: ['SiteEvaluation'],
  		refs: {
   			myPushList: 'pushList'
  		},
		control: {
			'pushList': {
				activate: 'onActivate',
				itemtap: 'onSelectPush'
			},
			'pushForm button[itemId=save]': {
				tap: 'onSavePush' 
			},
			'container button[itemId=loginButton]': {
				tap: 'onLoginPush' 
			},
			'container button[itemId=logoutPush]': {
				tap: 'onLogoutPush' 
			}
		}	  

 	},

	onActivate: function() {
  		console.log('Main container is active');
		
 	},

	onLoginPush: function(button) {
		console.log('Button Click');
		var loginForm = Ext.Viewport.down('login');
		//create widget if it doesn't exist
		if(!loginForm){
			loginForm = Ext.widget('loginview');
		} 
		loginForm.reset();
		loginForm.showBy(button);
	},

	onSavePush: function(button) {
		console.log('Button Click for Save');
		var form = button.up('panel');
		//get the record 
		var record = form.getRecord();
		//get the form values
		var values = form.getValues();
		//if a new push
		if(!record){
			var newRecord = new EvaluateIt.model.SiteEvaluation(values);
			Ext.getStore('SiteEvaluations').add(newRecord);
		}
		//existing push
		else {
			record.set(values);
		}
		form.hide();
		//save the data to the Web local Storage
		Ext.getStore('SiteEvaluations').sync();

		// assemble record and push to remote server
        EvaluateIt.utils.DataService.assemble(record);

	},

	// TODO: add missing attributes to form; add image uploade using native or Cordova method
	onSelectPush: function(view, index, target, record, event) {

		console.log('Selected a SiteEvaluation from the list');
		var pushForm = Ext.Viewport.down('pushForm');

		if(!pushForm){
			pushForm = Ext.widget('pushForm');
		}	 
		pushForm.setRecord(record);
		pushForm.showBy(target);

		console.log('Selected a Push from the list ' + index + ' ' + record.data.address);
	}

});

