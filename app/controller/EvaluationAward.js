Ext.define('EvaluateIt.controller.EvaluationAward', {
	extend : 'Ext.app.Controller',

	config: {
  		profile: Ext.os.deviceType.toLowerCase(),
  		stores : ['SiteEvaluations'],
  		models : ['SiteEvaluation'],
		refs: {
   			myawardList: 'awardList'
  		},
		control: {
			'awardList': {
				activate: 'onActivate',
				itemtap: 'onSelectAwardMaster'
			},
			'evaluationAwardForm button[itemId=save]' : {
				tap : 'onSaveAwardMaster' 
			}
		}	  

 	},

	onActivate: function() {
  		console.log('Main container is active');
 	},

	onSaveAwardMaster: function(button) {
		console.log('Button Click for Save');
		var form = button.up('panel');
		//get the record 
		var record = form.getRecord();
		//get the form values
		var values = form.getValues();
		//if a new siteEvaluation
		if(!record){
			var newRecord = new EvaluateIt.model.SiteEvaluation(values);
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

	onSelectAwardMaster: function(view, index, target, record, event) {
		console.log('Selected a AwardMaster from the list');
		var evaluationAwardForm = Ext.Viewport.down('evaluationAwardForm');

		if(!evaluationAwardForm){
			evaluationAwardForm = Ext.widget('evaluationAwardForm');
		}	 
		evaluationAwardForm.setRecord(record);
		evaluationAwardForm.showBy(target);
	}

});
