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
		//var form = Ext.getCmp('evaluationId');
		//get the record 
		    record = form.getRecord(),
		//get the form values
		//var values = form.getValues();

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
			sumRating = EvaluateIt.utils.Global.sum_factor_ratings(form.getValues().visualImpact,
                form.getValues().varietyAndHealth,
                form.getValues().design,
                form.getValues().maintenanc,
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

					//form.getCmp('imageId').setValue(uri);
					
					console.log('URI: ' +  uri);

					// update store with URI
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
		//save the data to the Web local Storage
		Ext.getStore('SiteEvaluations').sync();

	},

	onSelectEvaluation: function(view, index, target, record, event) {

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


// move to Global.js

/*function sum_factor_ratings(visualImpact,varietyAndHealth,design,maintenance, ) {

    var sum;

    sum = parseInt(visualImpact) +
    parseInt(varietyAndHealth) +
    parseInt(design) +
    parseInt(maintenance) +
    parseInt(environmentalStewardship);

    alert('Sum' + sum);

    return sum;
}*/


/*function evaluation_rating (score)	{

    var rating;

    if (score >= 18) {
        rating = 'EG';
    } else if (score >= 14 && score < 18) {
        rating = 'GD';
    } else if (score >= 9 && score < 14) {
        rating = 'GM';
    } else if (score >= 5 && score < 9) {
        rating = 'CA';
    } else {
        rating = ''; //'';
    }

    return rating;
} */


