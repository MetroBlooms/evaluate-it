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
  		stores : ['SiteEvaluations'],
  		models : ['SiteEvaluation'],
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
			sumRating = EvaluateIt.utils.Global.sum_factor_ratings(
                form.getValues().visualImpact,
                form.getValues().varietyAndHealth,
                form.getValues().design,
                form.getValues().maintenance,
                form.getValues().environmentalStewardship);

            /**
             * Determine ranking of evaluation
             * calls global function
             * @type {String}
             */
            evaluationRating = EvaluateIt.utils.Global.evaluation_rating (sumRating);

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
					var uri  = Record.get('src');

					console.log('URI: ' +  uri);

					// update store with image uri
					var siteId = record.get('site_id');

					form.setValues({
						imageUri: uri 
					})

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
	}

});


