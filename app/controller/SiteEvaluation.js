Ext.define('EvaluateIt.controller.SiteEvaluationMaster', {
	extend : 'Ext.app.Controller',

	config: {
		profile: Ext.os.deviceType.toLowerCase(),
  		stores : ['SiteEvaluations'],
  		models : ['SiteEvaluation'],
  		refs: {
   			myEvaluationList: 'evaluationList'
  		},
		control: {
			'evaluationList': {
				activate: 'onActivate',
				itemtap: 'onSelectSiteEvaluation'
			},
			'container button[itemId=addSiteEvaluation]' : {
				tap : 'onAddSiteEvaluation' 
			},
			'siteEvaluationEdit button[itemId=save]' : {
				tap : 'onSaveSiteEvaluation' 
			}
		}	  

 	},

	onActivate: function() {
  		console.log('Main container is active');
 	},

	onAddSiteEvaluation: function(button) {
		console.log('Button Click');
		var siteEvaluationForm = Ext.Viewport.down('siteEvaluationEdit');
		//create the siteEvaluation edit window if it doesn't exists
		if(!siteEvaluationForm){
			siteEvaluationForm = Ext.widget('siteEvaluationEdit');
		} 
		siteEvaluationForm.reset();
		siteEvaluationForm.showBy(button);
	},

	onSaveSiteEvaluation: function(button) {
		console.log('Button Click for Save');
		var form = button.up('panel');
		//get the record 
		var record = form.getRecord();
		//get the form values
		var values = form.getValues();
		//if a new siteEvaluation
		if(!record){
			var newRecord = new EvaluateIt.model.Contact(values);
			Ext.getStore('List').add(newRecord);
		}
		//existing siteEvaluation
		else {
			record.set(values);
		}
		form.hide();
		//save the data to the Web local Storage
		Ext.getStore('List').sync();

	},

	onSelectSiteEvaluation: function(view, index, target, record, event) {
		console.log('Selected a SiteEvaluation from the list');
		var siteEvaluationForm = Ext.Viewport.down('siteEvaluationEdit');

		if(!siteEvaluationForm){
			siteEvaluationForm = Ext.widget('siteEvaluationEdit');
		}	 
		siteEvaluationForm.setRecord(record);
		siteEvaluationForm.showBy(target);
	}

});
