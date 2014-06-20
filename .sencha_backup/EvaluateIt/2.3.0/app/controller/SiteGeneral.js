Ext.define('EvaluateIt.controller.SiteGeneral', {
	extend : 'Ext.app.Controller',

	config: {
  		profile: Ext.os.deviceType.toLowerCase(),
  		stores : ['SiteEvaluations'],
  		models : ['SiteEvaluation'],
		refs: {
   			mySiteGeneralList: 'siteGeneralList'
  		},
		control: {
			'siteGeneralList': {
				activate: 'onActivate',
				itemtap: 'onSelectSiteGeneral'
			},
			'container button[itemId=addSiteGeneral]' : {
				tap : 'onAddSiteGeneral' 
			},
			'siteGeneralForm button[itemId=save]' : {
				tap : 'onSaveSiteGeneral' 
			}
		}	  

 	},

	onActivate: function() {
  		console.log('Main container is active');
 	},

	onAddSiteGeneral: function(button) {
		console.log('Button Click');
		var siteGeneralForm = Ext.Viewport.down('siteGeneralForm');
		//create the siteEvaluation edit window if it doesn't exists
		if(!siteGeneralForm){
			siteGeneralForm = Ext.widget('siteGeneralForm');
		} 
		siteGeneralForm.reset();
		siteGeneralForm.showBy(button);
	},

	onSaveSiteGeneral: function(button) {
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

	onSelectSiteGeneral: function(view, index, target, record, event) {
		console.log('Selected a SiteGeneral from the list');
		var siteGeneralForm = Ext.Viewport.down('siteGeneralForm');

		if(!siteGeneralForm){
			siteGeneralForm = Ext.widget('siteGeneralForm');
		}	 
		siteGeneralForm.setRecord(record);
		siteGeneralForm.showBy(target);
	}

});
