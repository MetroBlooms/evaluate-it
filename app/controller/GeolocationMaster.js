Ext.define('EvaluateIt.controller.GeolocationMaster', {
	extend : 'Ext.app.Controller',

	config: {
		profile: Ext.os.deviceType.toLowerCase(),
  		stores : ['SiteEvaluations'],
  		models : ['SiteEvaluation'],
  		refs: {
   			myGeolocationList: 'geolocationList'
  		},
		control: {
			'geolocationList': {
				activate: 'onActivate',
				itemtap: 'onSelectGeolocation'
			},
			'container button[itemId=addGeolocation]' : {
				tap : 'onAddGeolocation' 
			},
			'geolocationEdit button[itemId=save]' : {
				tap : 'onSaveGeolocation' 
			}
		}	  

 	},

	onActivate: function() {
  		console.log('Main container is active');
 	},

	onAddGeolocation: function(button) {
		console.log('Button Click');
		var geolocationForm = Ext.Viewport.down('geolocationEdit');
		//create the geolocation edit window if it doesn't exists
		if(!geolocationForm){
			geolocationForm = Ext.widget('geolocationEdit');
		} 
		geolocationForm.reset();
		geolocationForm.showBy(button);
	},

	onSaveGeolocation: function(button) {
		console.log('Button Click for Save');
		var form = button.up('panel');
		//get the record 
		var record = form.getRecord();
		//get the form values
		var values = form.getValues();
		//if a new geolocation
		if(!record){
			var newRecord = new EvaluateIt.model.Contact(values);
			Ext.getStore('SiteEvaluations').add(newRecord);
		}
		//existing geolocation
		else {
			record.set(values);
		}
		form.hide();
		//save the data to the Web local Storage
		Ext.getStore('SiteEvaluations').sync();

	},

	onSelectGeolocation: function(view, index, target, record, event) {
		console.log('Selected a Geolocation from the list');
		var geolocationForm = Ext.Viewport.down('geolocationEdit');

		if(!geolocationForm){
			geolocationForm = Ext.widget('geolocationEdit');
		}	 
		geolocationForm.setRecord(record);
		geolocationForm.showBy(target);
	}

});
