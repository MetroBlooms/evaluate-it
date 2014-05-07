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
  		stores : ['Evaluations', 'Sites'],
  		models : ['Evaluation', 'Site'],
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
		    record = form.getRecord(),
		    // return a clone for updating of values
            // TODO: Determine why I did this
            values = Ext.clone(form.getValues()),
			sumRating,
            evaluationRating;

        // test

        var values = form.getValues( false, false, false, true );
        //var address = record.getAssociatedRecords('Site');

        console.log('evalu.id' + record.id);


        var mySite = EvaluateIt.model.Site;
        var site = new mySite();


        console.log('site.id ' + site.id);

        site.Evaluation();


        //address.save();
        site.setFlattenedData( values )

        console.log('setFlattenedData( form.getValues())' +  site.setFlattenedData( values ));

        //

        console.log('record' + record.id);

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

			// do stuff
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

		console.log('Selected a SiteEvaluation from the list');
		var siteEvaluationForm = Ext.Viewport.down('siteEvaluationForm');

		if(!siteEvaluationForm){
			siteEvaluationForm = Ext.widget('siteEvaluationForm');
		}
		siteEvaluationForm.setRecord(record);
		siteEvaluationForm.showBy(target);

        console.log('Selected a Site from the list');
        var siteEvaluationForm = Ext.widget('siteEvaluationForm');

        siteEvaluationForm.setRecord(record);
        //record.evaluation();
        siteEvaluationForm.setValues(record.getFlattenedData(true));
        siteEvaluationForm.showBy(target);


	}

});


