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
			'siteEvaluationForm button[itemId=save]' : {
				tap : 'onSaveSiteEvaluation' 
			}
		}	  

 	},

	onActivate: function() {
  		console.log('Main container is active');
 	},

	/*onAddSiteEvaluation: function(button) {
		console.log('Button Click');
		var siteEvaluationForm = Ext.Viewport.down('siteEvaluationForm');
		//create the siteEvaluation edit window if it doesn't exists
		if(!siteEvaluationForm){
			siteEvaluationForm = Ext.widget('siteEvaluationForm');
		} 
		siteEvaluationForm.reset();
		siteEvaluationForm.showBy(button);
	},*/

	onSaveSiteEvaluation: function(button) {
		console.log('Button Click for Save');
		//var form = button.up('panel');
		var form = Ext.getCmp('evaluationId');
		//get the record 
		var record = form.getRecord();
		//get the form values
		//var values = form.getValues();
		// return a clone for updating of values
		var values = Ext.clone(form.getValues());
		//if a new siteEvaluation
		if(!record){
			var newRecord = new EvaluateIt.model.SiteEvaluation(values);
			Ext.getStore('SiteEvaluations').add(newRecord);
		}
		//existing siteEvaluation
		else {

			// get image uri
			var images = Ext.create('EvaluateIt.store.ImageQueue');

			images.queryBy(function(iRecord,id){
				images = Ext.getStore(images);
				
				if (images.getCount() > 0) {
					var uri  = iRecord.get('src');
					
					 //	image = Ext.getCmp('imageUri');

					//image = form.setValue(uri);
					
					//form.getCmp('imageId').setValue(uri);
					
					console.log('URI: ' +  uri);


					// update store with URI

					//var SiteEvaluations =  Ext.create('EvaluateIt.store.SiteEvaluations');

					var siteId = record.get('site_id');


					form.setValues({
						imageUri: uri 
					})

					values = form.getValues();

					record = form.getRecord();

				
					//record.set('imageUri',uri)
				
		
				}
			});


			// do stuff
			record.set(values);
		}
		form.hide();
		//save the data to the Web local Storage
		Ext.getStore('SiteEvaluations').sync();

	},

	onSelectSiteEvaluation: function(view, index, target, record, event) {

		// clear content from image queue stor to initialize
		var lostor = Ext.getStore('theImageQueue');
		lostor.getProxy().clear();

		console.log('Selected a SiteEvaluation from the list');
		var siteEvaluationForm = Ext.Viewport.down('siteEvaluationForm');

		if(!siteEvaluationForm){
			siteEvaluationForm = Ext.widget('siteEvaluationForm');
		}	 
		siteEvaluationForm.setRecord(record);
		siteEvaluationForm.showBy(target);
	}

});



