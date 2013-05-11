Ext.define('EvaluateIt.controller.EvaluationGeneralMaster', {
	extend : 'Ext.app.Controller',

	config: {
  		profile: Ext.os.deviceType.toLowerCase(),
  		stores : ['SiteEvaluations'],
  		models : ['SiteEvaluation'],
		refs: {
   			myGeneralList: 'generalList'
  		},
		control: {
			'generalList': {
				activate: 'onActivate',
				itemtap: 'onSelectEvaluationGeneral'
			},
			'container button[itemId=addEvaluationGeneral]' : {
				tap : 'onAddEvaluationGeneral' 
			},
			'evaluationGeneralForm button[itemId=save]' : {
				tap : 'onSaveEvaluationGeneral' 
			}
		}	  

 	},

	onActivate: function() {
  		console.log('Main container is active');
 	},

	onAddEvaluationGeneral: function(button) {
		console.log('Button Click');
		var evaluationGeneralForm = Ext.Viewport.down('evaluationGeneralForm');
		//create the siteEvaluation edit window if it doesn't exists
		if(!evaluationGeneralForm){
			evaluationGeneralForm = Ext.widget('evaluationGeneralForm');
		} 
		evaluationGeneralForm.reset();
		evaluationGeneralForm.showBy(button);
	},

	onSaveEvaluationGeneral: function(button) {
		console.log('Button Click for Save');
		var form = button.up('panel');
		//get the record 
		var record = form.getRecord();
		//get the form values
		var values = form.getValues();
		//if a new siteEvaluation
		if(!record){
			var newRecord = new EvaluateIt.model.Contact(values);
			Ext.getStore('SiteEvaluations').add(newRecord);
		}
		//existing siteEvaluation
		else {
			record.set(values);
		}
		form.hide();
		//save the data to the Web local Storage
		Ext.getStore('SiteEvaluations').sync();

	},

	onSelectEvaluationGeneral: function(view, index, target, record, event) {
		console.log('Selected a EvaluationGeneral from the list');
		var evaluationGeneralForm = Ext.Viewport.down('evaluationGeneralForm');

		if(!evaluationGeneralForm){
			evaluationGeneralForm = Ext.widget('evaluationGeneralForm');
		}	 
		evaluationGeneralForm.setRecord(record);
		evaluationGeneralForm.showBy(target);
	}

});
