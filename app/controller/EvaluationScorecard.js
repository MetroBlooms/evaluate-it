Ext.define('EvaluateIt.controller.EvaluationScorecard', {
	extend : 'Ext.app.Controller',

	config: {
  		profile: Ext.os.deviceType.toLowerCase(),
  		stores : ['Evaluations','EvaluationScorecards','Sites','Addresses'],
  		models : ['Evaluation','EvaluationScorecard','Site','Address'],
		refs: {
   			myEvaluationScorecardList: 'evaluationScorecardList'
  		},
		control: {
			'evaluationScorecardList': {
				activate: 'onActivate',
				itemtap: 'onSelectEvaluationScorecard'
			},
			'evaluationScorecardForm button[itemId=save]' : {
				tap : 'onSaveEvaluationScorecard' 
			},
            'evaluationScorecardForm button[itemId=cancel]' : {
                tap : 'onCancelEvaluationScorecard'
            }
    	}

 	},

	onActivate: function() {
        if (EvaluateIt.config.mode === 'test') {
            console.log('Main container is active');
        }
 	},

    onCancelEvaluationScorecard: function(button) {
        if (EvaluateIt.config.mode === 'test') {
            console.log('Button Click for Cancel');
        }
        var form = button.up('panel');
        form.hide();
        form.destroy();
    },

	onSaveEvaluationScorecard: function(button) {
        if (EvaluateIt.config.mode === 'test') {
            console.log('Button Click for Save');
        }

        //console.log(this.$className);
        var form = button.up('panel'),
        //get the model
            record = form.getRecord(),
        //get the form values
            values = form.getValues( false, false, false, true );

        if ((form.getValues().noLongerExists === 'true' ||
            form.getValues().noLongerExists === true) &&
            (form.getValues().visualImpact !== null
                && form.getValues().varietyAndHealth !== null
                && form.getValues().design !== null
                && form.getValues().maintenance !== null
                && form.getValues().environmentalStewardship !== null)){

            alert('Cannot rate a non-exist garden; please correct this!' )

        }
        else{
            if (form.getValues().noLongerExists === 'false' ||
                form.getValues().noLongerExists === false ||
                form.getValues().noLongerExists === ''||
                form.getValues().noLongerExists === null ) {
                // calculatee sum of factor ratings:
                if (form.getValues().visualImpact !== null
                    && form.getValues().varietyAndHealth !== null
                    && form.getValues().design !== null
                    && form.getValues().maintenance !== null
                    && form.getValues().environmentalStewardship !== null) {

                    /**
                     *
                     * Compute sum of scorecard factores
                     * @type {Integer}
                     */
                    sumRating = EvaluateIt.utils.UtilityService.sum_factor_ratings(
                        form.getValues().visualImpact,
                        form.getValues().varietyAndHealth,
                        form.getValues().design,
                        form.getValues().maintenance,
                        form.getValues().environmentalStewardship);

                    /**
                     * Determine ranking of evaluation
                     * calls UtilityService function
                     * @type {String}
                     */
                    evaluationRating = EvaluateIt.utils.UtilityService.evaluation_rating (sumRating);

                    // TODO: display on form
                    alert('SumRating and ranking: ' + sumRating + ' ' + evaluationRating);


                    form.setValues({
                        sumRating: sumRating
                    })

                    values = form.getValues();
                    // When noLongerExists is null the store is not updated correctly. Explicitly set it false to
                    // get the save to work properly.
                    values.noLongerExists=false;
                    record = form.getRecord();

                }
                else {
                    alert('missing factor rating!');

                }
            }
            else {
                alert('Site no longer exists!');
            }
        }

        if(!record){
			// something went horribly wrong!
		}
		//existing siteEvaluation
		else {
            if (EvaluateIt.config.mode === 'test') {
                console.log(record.getData(true));
            } // to see the record
            record.setFlattenedData(values);  // persist the form data back to the record
            if (EvaluateIt.config.mode === 'test') {
                console.log(record.getAssociatedData(true));
            } // to see the record associations
            record.save();
		}
		form.hide();

	},

	onSelectEvaluationScorecard: function(view, index, target, record, event) {
        if (EvaluateIt.config.mode === 'test') {
            console.log('Selected a Scorecard from the list');
        }
        var evaluationScorecardForm = Ext.widget('evaluationScorecardForm');

        evaluationScorecardForm.setRecord(record);
        if (EvaluateIt.config.mode === 'test') {
            console.log(record.$className + ' ' + record.getId())
        }

        record.get();  // This will instantiate a missing Address hasOne if not already in the data or do nothing if there is one
        evaluationScorecardForm.setValues(record.getFlattenedData(true));
        if (EvaluateIt.config.mode === 'test') {
            console.log('Scorecard hasOne hierarchy: ' +  Ext.encode(record.getFlattenedData( true )));
        }

        evaluationScorecardForm.showBy(target);

    }

});
