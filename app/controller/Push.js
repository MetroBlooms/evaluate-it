/**
 * Handle data transfers to remote server
 *
 */
Ext.define('EvaluateIt.controller.Push', {
	extend: 'Ext.app.Controller',

	config: {
		profile: Ext.os.deviceType.toLowerCase(),
  		stores: ['SiteEvaluations'],
  		models: ['SiteEvaluation'],
  		refs: {
   			myPushList: 'pushList'
  		},
		control: {
			'pushList': {
				activate: 'onActivate',
				itemtap: 'onSelectPush'
			},
			'pushForm button[itemId=save]': {
				tap: 'onSavePush' 
			},
			'container button[itemId=loginButton]': {
				tap: 'onLoginPush' 
			},
			'container button[itemId=logoutPush]': {
				tap: 'onLogoutPush' 
			}
		}	  

 	},

	onActivate: function() {
  		console.log('Main container is active');
		
 	},

	onLoginPush: function(button) {
		console.log('Button Click');
		var loginForm = Ext.Viewport.down('login');
		//create widget if it doesn't exist
		if(!loginForm){
			loginForm = Ext.widget('loginview');
		} 
		loginForm.reset();
		loginForm.showBy(button);
	},

	onSavePush: function(button) {
		console.log('Button Click for Save');
		var form = button.up('panel');
		//get the record 
		var record = form.getRecord();
		//get the form values
		var values = form.getValues();
		//if a new push
		if(!record){
			var newRecord = new EvaluateIt.model.SiteEvaluation(values);
			Ext.getStore('SiteEvaluations').add(newRecord);
		}
		//existing push
		else {
			record.set(values);
		}
		form.hide();
		//save the data to the Web local Storage
		Ext.getStore('SiteEvaluations').sync();

		// assemble record 
		assemble_evaluation(record);
		
		//initialize_image_post(record);

	},

	// TODO: add missing attributes to form; add image uploade using native or Cordova method
	onSelectPush: function(view, index, target, record, event) {

		console.log('Selected a SiteEvaluation from the list');
		var pushForm = Ext.Viewport.down('pushForm');

		if(!pushForm){
			pushForm = Ext.widget('pushForm');
		}	 
		pushForm.setRecord(record);
		pushForm.showBy(target);

		console.log('Selected a Push from the list ' + index + ' ' + record.data.address);
	}

});

/**
 * Assemble json to push to remote
 *
 * @param record
 */
function assemble_evaluation(record) {

	var	score,
		award,
		rating,
		nate_siegel_award,
		rain_garden = 0,
		no_longer_exists = 0,
		currentYear = (new Date()).getFullYear(),
		obj = {},
		core = {},
		existing = {},
		ad_hoc = {},
		eval_type;

		// compute score: TODO: check for null/isInt!
		if (record.data.visualImpact !== null
				&& !record.data.varietyAndHealth !== null
				&& !record.data.design !== null
				&& !record.data.maintenance !== null
				&& !record.data.environmentalStewardship !== null) {

            /**
             *
             * Compute sum of scorecard factores
             * @type {Integer}
             */
            score = EvaluateIt.utils.Global.sum_factor_ratings(record.data.visualImpact,
                record.data.varietyAndHealth,
                record.data.design,
                record.data.maintenance,
                record.data.environmentalStewardship);


            // get rating for given score
			/**
             * Determine ranking of evaluation
             * calls global function
             * @type {String}
             */
            rating = EvaluateIt.utils.Global.evaluation_rating (score);

			console.log("rating" + rating);
		}
		else {
			score = null;
			rating = null;
		}

		// get award if given
		award = EvaluateIt.utils.Global.evaluation_award(record.data.awardId);
		console.log("award" + award.bestof + ' ' + award.nate_seigel);

		if (record.data.noLongerExists === 'true' || record.data.noLongerExists === true) {
			no_longer_exists = 1;
		}

		if (record.data.rainGarden === 'true' || record.data.rainGarden === true) {
			rain_garden = 1;
		}

    /**
     * Core data set for sending to remote server
     * @type {{evaluation: {garden_id: (parseJson.remoteSiteId|*), eval_type: number, score: *, rating: *, rating_year: number, bestof: (*|EvaluateIt.utils.Global.evaluation_award.bestof|core.evaluation.bestof|evaluation_award.bestof), special_award_specified: *, evaluator_id: (*|core.evaluation.evaluator_id|sessionStorage.evaluator_id), nate_siegel_award: (EvaluateIt.utils.Global.evaluation_award.nate_seigel|*|evaluation_award.nate_seigel), date_evaluated: *, comments: (*|Function|Docs.Settings.defaults.comments|core.evaluation.comments|Docs.view.comments), scoresheet: {color: *, plant_variety: *, design: (*|core.evaluation.scoresheet.design), maintenance: (*|core.evaluation.scoresheet.maintenance), environmental_stewardship: *}}, geolocation: {latitude: (*|Number|latitude|core.geolocation.latitude|sessionStorage.latitude), longitude: (*|Number|longitude|core.geolocation.longitude|sessionStorage.longitude), accuracy: (*|Number|accuracy|Ext.chart.series.Pie.accuracy|core.geolocation.accuracy|sessionStorage.accuracy)}}}
     */
		core = {
			evaluation: {
				//evaluation_id: record.data.remoteEvaluationId,
				garden_id: record.data.remoteSiteId,
				eval_type: 1,// null, // change!
				score: score,
				rating: rating,
				rating_year: currentYear,
				bestof: award.bestof,
				special_award_specified: record.data.specialAwardSpecified,
				evaluator_id: sessionStorage.evaluator_id, // would use remoteEvaluatorId, but if ad hoc this will not exist
				nate_siegel_award: award.nate_seigel,
				date_evaluated: Ext.Date.format(record.data.dateOfEvaluation, 'm/d/Y'), // formatted as mm/dd/yyyy
				// date_entered_on_device_by_evaluator,
				comments: record.data.comments,
				scoresheet: {
					color: record.data.visualImpact,
					plant_variety: record.data.varietyAndHealth,
					design: record.data.design,
					maintenance: record.data.maintenance,
					environmental_stewardship: record.data.environmentalStewardship
				}
			},
			geolocation: {
				latitude: record.data.latitude,
				longitude: record.data.longitude,
				accuracy: record.data.accuracy
			}

		};

		console.log('Assembled core to push: ' + Ext.encode(core));

    /**
     * Non ad hoc evaluation, minimal data elements
     * @type {{garden: {garden_id: (parseJson.remoteSiteId|*), name: (Docs.data.name|*), no_longer_exists: number, raingarden: number}}}
     */
		existing = {
			garden: {
				garden_id: record.data.remoteSiteId,
				name:  record.data.name,
				no_longer_exists: no_longer_exists,
				raingarden: rain_garden
			}
		};

		console.log('Assembled existing to push: ' + Ext.encode(existing));

    /**
     * Ad hoc nomination with attributes required to create new remote record
     * @type {{nomination: {nominator_id: (*|core.evaluation.evaluator_id|sessionStorage.evaluator_id), nominator_name: string, nominator_email: (Function|email|*|sessionStorage.email), gardener_name: (Docs.data.name|*), address: (*|parseJson.address|x.contextGrabbers.p.address|ad_hoc.nomination.address), city: (*|parseJson.city|ad_hoc.nomination.city), state: (*|Ext.mixin.Progressable.state|parseJson.state|Ext.ProgressIndicator.state|state|Ext.data.SyncModel.state), zip: (parseJson.zipcode|*), neighborhood: (*|parseJson.neighborhood|ad_hoc.nomination.neighborhood), county: (*|ad_hoc.nomination.county)}, garden: {}}}
     */
		ad_hoc = {
			nomination: {
				nominator_id: sessionStorage.evaluator_id,
				nominator_name: sessionStorage.firstname + ' ' + sessionStorage.lastname,
				nominator_email: sessionStorage.email,
				gardener_name: record.data.name,
				address: record.data.address,
				city: record.data.city,
				state: record.data.state,
				zip: record.data.zipcode,
				neighborhood: record.data.neighborhood,
				county: record.data.county
			},
			garden: {}
		};

		console.log('Assembled ad_hoc to push: ' + Ext.encode(ad_hoc));

		// Assemble json for submission
		// existing:
		if (record.data.remoteSiteId && record.data.remoteEvaluationId && record.data.remoteEvaluatorId) {
			obj = Ext.Object.merge(core, existing);
			obj.evaluation.evaluation_id = record.data.remoteEvaluationId;
			console.log('existing');
			eval_type = 'existing';
		}
		// new
		else {
			obj = Ext.Object.merge(core, ad_hoc);
			obj.evaluation.uuid = record.data.id; // new usees uuid as linking id
			console.log('new');
			eval_type = 'new';
		}

		console.log('Assembled object to push: ' + Ext.encode(obj));

		post_to_remote(obj, record, eval_type);

}

/**
 * Ajax to remote Webserver for json
 *
 * @param obj
 * @param record
 * @param eval_type
 */
function post_to_remote(obj, record, eval_type) {

    /**
     * Assemble url as per API definition
     *
     */
	var url, //url = EvaluateIt.config.webServer;
	// POST to server; config variables from app.json
	//url +=  '/' +  EvaluateIt.config.collectionDevelopment;
	//url +=  '/' +  EvaluateIt.config.testHttpResponse;//postResults;

        store = Ext.create('EvaluateIt.store.SiteEvaluations'),
        update_record = store.findExact('remoteEvaluationId', record.data.id);
        update_record,
        now = new Date();




	// new API with authorization token
	url =  EvaluateIt.config.protocol;

	// select mode of API access
	if (EvaluateIt.config.mode === 'test') {
		url += EvaluateIt.config.test;
	}
	if (EvaluateIt.config.mode === 'live') {
		url += EvaluateIt.config.production;
	}

	url += EvaluateIt.config.domain;

	if (eval_type === 'existing') {
		url += EvaluateIt.config.apiViewEvaluation;
		url += EvaluateIt.config.action;
	}

	if (eval_type === 'new') {
		url += EvaluateIt.config.apiViewNomination;
		url += EvaluateIt.config.ad_hoc;
	}

	url += '?token=' + sessionStorage.sessionToken;

	console.log('new url: ' + url);

	// AJAX post
	Ext.Ajax.request({
		type: 'POST',
		//cors: true,
		url: url,
		jsonData: obj,
		//useDefaultXhrHeader: false,
        // flag as uploaded by updating store attribute datePostedToRemote with date

		success: function (response) {
			console.log('success: ' + response.responseText);

			alert('Successfully uploaded: '+ response.responseText);

            // update date success
            store = Ext.getStore(store);
            update_record = store.findRecord('id', record.data.id );
            update_record.set('datePostedToRemote', now);
            store.sync();

		},
		fail: function (e, jqxhr, settings, exception) {
			console.log(e);
			alert(e);
		}
	});

	// check if image exists in store
	if (record.get('imageUri') !== null && record.get('imageUri') !== '') {
		initialize_image_post(record)
	}

}

/**
 * Assemble required objects for image transmittal
 *
 * @param record
 */
function initialize_image_post(record) {

	var uri,
		url,
		evaluation_kvp = {};

	// use new API with authorization token
	url =  EvaluateIt.config.protocol;

	// select mode of API access
	if (EvaluateIt.config.mode === 'test') {
		url += EvaluateIt.config.test;
	}
	if (EvaluateIt.config.mode === 'live') {
		url += EvaluateIt.config.production;
	}

	url += EvaluateIt.config.domain;
	// url += EvaluateIt.config.dev; // ev environment
	// url += EvaluateIt.config.file_response;  // needed for POST echo
	url += EvaluateIt.config.apiViewEvaluation;
	url += EvaluateIt.config.file_upload;
	url += '?token=' + sessionStorage.sessionToken;

	uri = record.data.imageUri; // local path to image

	console.log('upload uri: ' + uri + 'url: ' + url);

	console.log('evaluation_id, uuid ' + record.data.remoteEvaluationId + ', ' + record.data.id );

	// assemble key value pair for use in file transfer object for: existing evaluation
	if (record.data.remoteEvaluationId !== null) {
		evaluation_kvp.evaluation_id = record.data.remoteEvaluationId;
		console.log('evaluation_id ' + Ext.encode(evaluation_kvp));
	}
	// new nomination/evaluation: use localStorage uuid as identifier
	else {
		evaluation_kvp.uuid = record.data.id;
		console.log('uuid ' + Ext.encode(evaluation_kvp));
	}

	post_image(uri, url, evaluation_kvp);
}

/**
 * Post image to remote server using Phonegap file transfer API
 *
 * @param imageUri
 * @param url
 * @param evaluation_kvp
 */
function post_image(imageUri, url, evaluation_kvp) {
    var options = new FileUploadOptions(),
        ft = new FileTransfer();

    options.fileKey = 'userfile';
    //options.fileName = imageUri.substr(imageUri.lastIndexOf('/') + 1);
    options.mimeType = 'image/jpeg';
    options.chunkedMode = false;
	options.params = evaluation_kvp; // attached key value pair

    ft.upload(imageUri, encodeURI(url), post_success, post_error, options);
}

function post_success(r) {
    console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    console.log("Sent = " + r.bytesSent);
    alert(r.response);
	console.log(r.response);

	var response = Ext.JSON.decode(r.response);
	alert(response.imageData.file_name);

}

function post_error(error) {
    alert("An error has occurred: Code = " + error.code);
	console.log("An error has occurred: Code = " + error.code);

}
