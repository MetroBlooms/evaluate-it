Ext.define('EvaluateIt.controller.EvaluationAward', {
	extend : 'Ext.app.Controller',

	config: {
  		profile: Ext.os.deviceType.toLowerCase(),
  		stores : ['Evaluations','EvaluationAwards','Sites','Addresses'],
  		models : ['Evaluation','EvaluationAward','Site','Address'],
		refs: {
   			myEvaluationAwardList: 'evaluationAwardList'
  		},
		control: {
			'evaluationAwardList': {
				activate: 'onActivate',
				itemtap: 'onSelectEvaluationAward'
			},
			'evaluationAwardForm button[itemId=save]' : {
				tap : 'onSaveEvaluationAward' 
			}
		}	  

 	},

	onActivate: function() {
  		console.log('Main container is active');
 	},

	onSaveEvaluationAward: function(button) {
        console.log('Button Click for Save');

        //console.log(this.$className);
        console.log('Button Click for Save');
        var form = button.up('panel'),
        //get the model
            record = form.getRecord(),
        //get the form values
            values = form.getValues( false, false, false, true );

        console.log(record.getData(true)); // to see the record
        record.setFlattenedData(values);  // persist the form data back to the record
        console.log(record.getAssociatedData(true)); // to see the record associations

        record.save();

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

	onSelectEvaluationAward: function(view, index, target, record, event) {
		console.log('Selected a Award from the list');
        var evaluationAwardForm = Ext.widget('evaluationAwardForm');

        evaluationAwardForm.setRecord(record);
        console.log(record.$className + ' ' + record.getId())

        record.get();  // This will instantiate a missing Address hasOne if not already in the data or do nothing if there is one
        evaluationAwardForm.setValues(record.getFlattenedData(true));
        console.log('Award hasOne hierarchy: ' +  Ext.encode(record.getFlattenedData( true )));

        evaluationAwardForm.showBy(target);

    }

});
