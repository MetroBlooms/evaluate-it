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

	// TODO: add missing atributes to form; add image uploade using native or Cordova method

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

/* Test json to POST

{
	"evaluation": {
		"evaluation_id":44216,
		"garden_id":37288,
		"eval_type":1,
		"score":15,
		"rating":"GD",
		"rating_year":2013,
		"bestof":"NADA!",
		"special_award_specified":null,
		"evaluator_id":"265",
		"nate_siegel_award":0,
		"rainbarrel":0,
		"date_evaluated":"1969-12-31T18:00:00",
		"comments":"",
		"scoresheet":{
			"color":1,
			"plant_variety":2,
			"design":3,
			"maintenance":4,
			"environmental_stewardship":5
		}
	},
	"garden":{
		"garden_id":37288,
		"name":"Larry Opelt",
		"no_longer_exists":0,
		"raingarden":0
	},
	"geolocation":{
		"latitude":44.9615709,
		"longitude":-93.3353673,
		"accuracy":25
	}
} 

*/

/* Ad hoc nomination

This JSON struction is identical to the structure for adding a garden evaluation, with the addition of the "nomination" object.
The "garden" object that you might send with an evaluation update is not necessary here because garden information is sent along with the nomination. (in an evaluation, the 'garden' object is also optional, but could be send it you want to permanantly update informtion about the garden)

{
    nomination: {  
        'nominator_id': '1930', 
        'nominator_name': 'Paul Stroot', 
        'nominator_email': 'test@dancingpaul.com', 
        'name_of_garden': 'Metroblooms Test Garden Extrordinaire',
        'gardener_name': 'Paul Stroot',
        'gardener_email': 'paul@dancingpaul.com',
        'address': '3516 Blaisdell Ave', 
        'city': 'Minneapolis', 
        'state': 'MN', 
        'zip': '55408', 
        'neighborhood': 'Kingfield', 
        'county': 'Hennepin', 
        'boulevard_garden': '0', 
        'raingarden': '0',
        'residential_garden': '0', 
        'business_garden': '0', 
        'community': '0', 
        'church': '0', 
        'public_building': '0', 
        'apartment_or_condo': '0', 
        'container_windowbox': '0', 
        'rainbarrel': '0', 
        'downspouts_redirected': '1', 
        'not_publically_visible': '0', 
        'noteworthy_features': 'THIS IS A TEST', 
        'uploaded_image': 'n/a',               
    },
    evaluation: {    
        eval_type: 'garden evaluation',
        score: '14',    
        rating: 'GM',   
        rating_year : '2013',
        bestof : 'Best Test Garden',
        special_award_specified: 'SuperSpecial Award',
        evaluator_id: '265',
        nate_siegel_award : 0,
        rainbarrel : 1,
        downspouts_redirected: 1,   
        date_evaluated: '2013-04-15 12:30:00',
        comments : 'This is a test submission',
        revisit :  0, 
        scoresheet:{
            color : 1,
            plant_variety : 2,
            design : 3,
            maintenance : 4,
            environmental_stewardship : 5
        }       
    },
    geolocation: {
        latitude :  '43.6544',
        longitude :  '76.3322',
        accuracy: '45',    
        altitude: '56',
        altitudeAccuracy: '54',
        heading: '45',
        speed:'45'
    },
    garden:{}
}

*/
// assemble json and make Ajax call
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
			
			score = record.data.visualImpact  
					+ record.data.varietyAndHealth 
					+ record.data.design  
					+ record.data.maintenance 
					+ record.data.environmentalStewardship;

			// get rating for given score
			rating = evaluation_rating(score);
			console.log("rating" + rating);	
		}
		else {
			
			score = null;
			rating = null;

		}
	
		// get award if given
		award = evaluation_award(record.data.awardId);
		console.log("award" + award.bestof + ' ' + award.nate_seigel);

		if (record.data.noLongerExists === 'true' || record.data.noLongerExists === true) {
			no_longer_exists = 1;
		}

		if (record.data.rainGarden === 'true' || record.data.rainGarden === true) {
			rain_garden = 1;
		}

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

		// existing nomination
		existing = {
			garden: {
				garden_id: record.data.remoteSiteId,
				name:  record.data.name,
				no_longer_exists: no_longer_exists,
				raingarden: rain_garden
			}
		}; 

		console.log('Assembled existing to push: ' + Ext.encode(existing));	
				
		// new nomination
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

		// create json for submission

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

// rating based on Metro Blooms evaluation form
function evaluation_rating (score)	{

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
}

// awards based on Metro Blooms evaluation form
function evaluation_award (award_id) {

	var nate_siegel = 0;

	switch (award_id) {
		case 1:
			bestof = 'Boulevard Garden';
			break;
		case 2:
			bestof = 'Business Garden or Raingarden';
			break;
		case 3:
			bestof = 'Container/WindowBox Garden';
			break;
		case 4:
			bestof = 'Congregation Garden or Raingarden';
			break;
		case 5:
			bestof = 'Residential Garden or Raingarden';
			break;
		case 6:
			bestof = 'Alley Garden';
			break;
		case 7:
			bestof = 'Public & Schoolyard Garden or Raingarden';
			break;
		case 8:
			bestof = 'NateSiegel';
			nate_siegel = 1;
			break;
		case 9:
			bestof = 'Special';
			break;
		default:
			bestof = null;
			break;
	}
	
	return {
        'bestof': bestof,
        'nate_seigel': nate_siegel
    }; 
}

// Ajax to remote Webserver
function post_to_remote(obj, record, eval_type) {

	var url, //url = EvaluateIt.config.webServer;
	// POST to server; config variables from app.json
	//url +=  '/' +  EvaluateIt.config.collectionDevelopment;
	//url +=  '/' +  EvaluateIt.config.testHttpResponse;//postResults;
					
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
		success: function (response) {
			console.log('success: ' + response.responseText);

			alert('Successfully uploaded: '+ response.responseText);

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

// Phonegap file transfer
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
