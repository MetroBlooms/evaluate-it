/**
 * Controller for EvaluateIt.view.Evaluation
 *
 * TODO: figure out why I needed to clone the record;
 * it may have something to do with grabbing the image from the gallery
 *
 */
Ext.define('EvaluateIt.controller.Evaluation', {
	extend : 'Ext.app.Controller',

	config: {
		profile: Ext.os.deviceType.toLowerCase(),
  		stores : ['Addresses', 'Evaluations', 'Sites'],
  		models : ['Address', 'Evaluation', 'Site'],
  		refs: {
   			myEvaluationList: 'evaluationList'
  		},
		control: {
			'evaluationList': {
				activate: 'onActivate',
				itemtap: 'onSelectEvaluation'
			},
			'siteEvaluationForm button[itemId=save]' : {
				tap : 'onSaveEvaluation'
			}
		}
 	},

	onActivate: function() {
  		console.log('Main container is active');
 	},

	onSaveEvaluation: function(button) {
        console.log('Button Click for Save');
        var form = button.up('panel'),
            // get the record
            // record = form.getRecord(),
            // return a clone for updating of values
            // TODO: Determine why I did this
              values = Ext.clone(form.getValues()),
              sumRating,
              evaluationRating;

        // test

        values = form.getValues( false, false, false, true),
        //get the model
        record = form.getRecord();

        console.log(record.getData(true)); // to see the record before
        record.setFlattenedData(values);  // persist the form data back to the record
        console.log(record.getAssociatedData(true)); // to see the record after

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
        record = form.getRecord();

		}
		else {
			alert('missing factor rating!');
		}

		//if a new Evaluation
		if(!record){
			// something went horribly wrong, since a new Evaluation association hierarchy should have been created
            // when entering a new Site/Address as per controller.SiteGeneral onSaveSiteGeneral method
      	}
		//existing siteEvaluation
		else {

            //console.log('setFlattenedData( form.getValues())' +  model.setFlattenedData( form.getValues(false, false, false, true)) );
            // TODO: update record using setFlattenedData method in BaseModel

            // do stuff
			// get image uri
            // TODO: redo this!
			var images = Ext.create('EvaluateIt.store.ImageQueue');

			images.queryBy(function(iRecord,id){
				images = Ext.getStore(images);

				if (images.getCount() > 0) {
					var uri  = iRecord.get('src'); // changed to iRecord from Record: what is effect?

					console.log('URI: ' +  uri);

					// update form with image uri
					form.setValues({
						imageUri: uri
					})

                    // refresh values with new data
					values = form.getValues();
					record = form.getRecord();

				}
			});

			record.set(values);
		}
		form.hide();
		//save the data to localStorage
		Ext.getStore('SiteEvaluations').sync();

	},

	onSelectEvaluation: function(view, index, target, record, event) {

		// clear content from image queue store to initialize
		var lostor = Ext.getStore('theImageQueue');
		lostor.getProxy().clear();

        console.log('Selected a Site from the list');
        var siteEvaluationForm = Ext.widget('siteEvaluationForm');

        siteEvaluationForm.setRecord(record);

        // bind flattened record to form
        siteEvaluationForm.setValues(record.getFlattenedData(true));
        console.log('Evaluation belongsTo hierarchy:: ' + Ext.encode(record.getFlattenedData(true)));

        console.log('evaluation.id:' +  ' ' + record.id);

        console.log(record.getData(true));
        console.log(record.getAssociatedData(true));
        console.log(record.$className + ' ' + record.getId())

        // open form
        siteEvaluationForm.showBy(target);


	}

});


