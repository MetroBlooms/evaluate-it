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
			},
            'evaluationAwardForm button[itemId=cancel]' : {
                tap : 'onCancelEvaluationAward'
            }
		}	  

 	},

	onActivate: function() {
        if (EvaluateIt.config.mode === 'test') {
            console.log('Main container is active');
        }
 	},

    onCancelEvaluationAward: function(button) {
        if (EvaluateIt.config.mode === 'test') {
            console.log('Button Click for Cancel');
        }
        var form = button.up('panel');
        form.hide();
        form.destroy();
    },

	onSaveEvaluationAward: function(button) {
        if (EvaluateIt.config.mode === 'test') {
            console.log('Button Click for Save');
            //console.log(this.$className);
            console.log('Button Click for Save');
        }
        var form = button.up('panel'),
        //get the model
            record = form.getRecord(),
        //get the form values
            values = form.getValues( false, false, false, true );

		if(!record){
			// something went horribly wrong!
		}
		//existing siteEvaluation
		else {
            if (EvaluateIt.config.mode === 'test') {
                console.log(record.getData(true)); // to see the record
            }
            record.setFlattenedData(values);  // persist the form data back to the record
            if (EvaluateIt.config.mode === 'test') {
                console.log(record.getAssociatedData(true));
            } // to see the record associations
            record.save();
        }
        form.hide();

	},

	onSelectEvaluationAward: function(view, index, target, record, event) {
        if (EvaluateIt.config.mode === 'test') {
            console.log('Selected a Award from the list');
        }
        var evaluationAwardForm = Ext.widget('evaluationAwardForm');

        evaluationAwardForm.setRecord(record);
        if (EvaluateIt.config.mode === 'test') {
            console.log(record.$className + ' ' + record.getId())
        }

        record.get();  // This will instantiate a missing Address hasOne if not already in the data or do nothing if there is one
        evaluationAwardForm.setValues(record.getFlattenedData(true));
        if (EvaluateIt.config.mode === 'test') {
            console.log('Award hasOne hierarchy: ' +  Ext.encode(record.getFlattenedData( true )));
        }
        evaluationAwardForm.showBy(target);
    }

});
