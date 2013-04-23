Ext.define('EvaluateIt.controller.PushMaster', {
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
			'container button[itemId=addPush]': {
				tap: 'onAddPush' 
			},
			'pushForm button[itemId=save]': {
				tap: 'onSavePush' 
			}
		}	  

 	},

	onActivate: function() {
  		console.log('Main container is active');
 	},

	onAddPush: function(button) {
		console.log('Button Click');
		var pushForm = Ext.Viewport.down('pushForm');
		//create the push edit window if it doesn't exists
		if(!pushForm){
			pushForm = Ext.widget('pushForm');
		} 
		pushForm.reset();
		pushForm.showBy(button);
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
			var newRecord = new EvaluateIt.model.Contact(values);
			Ext.getStore('SiteEvaluations').add(newRecord);
		}
		//existing push
		else {
			record.set(values);
		}
		form.hide();
		//save the data to the Web local Storage
		Ext.getStore('SiteEvaluations').sync();

	},

// Assemble selected object to load to remote
// add uploaded_image
// add eval_type

/* What object should look like:

test: {"evaluation_id": 44214,
	"score": 20, // computed, but stored value
	"rating": "EG", // computed by range (see function assembleDataToPost)
	"rating_year": 2012, // computed
	"best_of": "Special", // from evaluation_award
	"special_award_specified": "Absolute bestest ever!", // from evaluation_award; code stored. lookup via JSON object Award
	"nate_siegel_award": 0, // from evaluation_award
	"score_card": {"color": 4,  // from evaluation_factor, lookup via JSON object Factor
		"plant_variety": 4,
		"design": 4,
		"maintenance": 4,
		"environmental_stewardship": 4},
	"date_evaluated":"2012-08-01", // entered
	"general_comments":"This is a test", // evaluation
	"evaluator": {"evaluator_id":"265", // evaluation; id from remote db
		"completed_by": "265"},
	"rainbarrel":1, //evaluation_factor; lookup via JSON object Factor
	"raingarden":1,
	"garden": {"garden_id": 39439, // remote id maps to site_id
		"no_longer_exists": 0, // bit value
		"address": {"neighborhood": "Lake Forest", 
			"county": "Hennepin"},
		"gardener": {"name":"Greg The Marvelous"}, // maps to site_maintainer
		"geolocation": {"latitude": 44.9267,
			"longitude": -93.405282,
			"accuracy":"24000"}
		}
	} */

/* TODO: implement new data structure

{
    evaluation: {
        evaluation_id: record.data.remoteEvaluationId,   
        garden_id: record.data.remoteSiteId,
        scoresheet:{
            color: record.data.color,
            plant_variety: record.data.plantVariety,
            design: record.data.design,
            maintenance: record.data.maintenance,
            environmental_stewardship: record.data.environmentalStewardship
        },
        evalType: new feature, this may be "garden evaluation", "2nd round garden evaluation,"and "voluntary raingarden evaluation", we’ll need to discuss this
        score: score    
        rating: rating   
        rating_year: currentYear,
        best_of: award.best_of,
        special_award_specified: record.data.specialAwardSpecified,
        evaluator_id: record.data.remoteEvaluatorId,
        nate_siegel_award: award.nate_seigel,
        rainbarrel: record.data.rainBarrel,
        downspouts_redirected: (“1” or “0”),  
        date_evaluated: record.data.dateOfEvaluation,
        comments: record.data.comments,
        revisit:  (send “1” or “0” whether the evaluator thinks the garden should be revisited) 
    },
    garden: {
        garden_id: record.data.remoteSiteId, 
        name:   record.data.name, (name of gardener)
        address: (street address of garden),    
        city: (city of garden),
        state: (state of garden),
        zip: (zip of garden),
        neighborhood: record.data.neighborhood,
        county: record.data.county        boulevard_garden: (“1” or “0”),  
        raingarden: record.data.rainGarden,       
        name_of_garden: (name of the garden),         
        rainbarrel: record.data.rainBarrel, 
        no_longer_exists: record.data.noLongerExists,
        noteworthy_features: (This is typically created by the person who nominated the garden),    
        uploadedImage: (URL of uploaded image),
        alley_garden: (“1” or “0”),
        residential_garden: (“1” or “0”),
        business_garden: (“1” or “0”),
        community: (“1” or “0”),
        church: (“1” or “0”),
        public_building: (“1” or “0”),
        apartment_or_condo: (“1” or “0”),
        container_windowbox: (“1” or “0”), 
        downspouts_redirected: (“1” or “0”),
       	gardener_email: (email of gardener),  
        gardener_phone: (name of gardener), 
        not_publically_visible: (“1” or “0”),
    },
    geolocation: {
        latitude:  record.data.latitude,
        longitude:  record.data.longitude,
        accuracy: record.data.accuracy       
        altitude:
        altitudeAccuracy:
        heading:
        speed:
        timestamp:
    }

*/

	// TODO: add missing atributes to form; add image uploade using native or Cordova method

	onSelectPush: function(view, index, target, record, event) {
		console.log('Selected a Push from the list ' + index + ' ' + record.data.address);
		var pushForm = Ext.Viewport.down('pushForm'),
			score,
			award,
			rating,
			nate_siegel_award,
			currentYear = (new Date()).getFullYear(),
			obj = {},
			url = EvaluateIt.config.webServer; 

			// get rating
			score = record.data.color + record.data.plantVariety + record.data.design + record.data.maintenance + record.data.environmentalStewardship;
			rating = evaluation_rating(score);
			console.log("rating" + rating);	
			
			// get award
			award = evaluation_award(record.data.awardId);
			console.log("award" + award.best_of + ' ' + award.nate_seigel);	

			obj = {
				evaluation_id: record.data.remoteEvaluationId,
				score: score,
				rating: rating,
				rating_year: currentYear,
				best_of: award.best_of,
				special_award_specified:  record.data.specialAwardSpecified,
				//evaluator_id: record.data.remoteEvaluatorId,
				nate_siegel_award: award.nate_seigel,
				//scoresheet:
				score_card: {
					color:  record.data.color,
					plant_variety:  record.data.plantVariety,
					design:  record.data.design,
					maintenance:  record.data.maintenance,
					environmental_stewardship:  record.data.environmentalStewardship
				},
				date_evaluated: record.data.dateOfEvaluation, // was:
				// date_entered_on_device_by_evaluator,
				general_comments: record.data.comments,
				evaluator: {
					evaluator_id: record.data.remoteEvaluatorId,
					completed_by: record.data.remoteEvaluatorId
				},
				rainbarrel: record.data.rainBarrel,
				raingarden: record.data.rainGarden,
				garden: {
					garden_id: record.data.remoteSiteId,
					no_longer_exists:  record.data.noLongerExists,
					address: {
						neighborhood: record.data.neighborhood,
						county: record.data.county
					},
					//neighborhood: record.data.neighborhood,
					//county: record.data.county
					gardener: {
						name:  record.data.name
					},
					//name:  record.data.name
					geolocation: {
						latitude:  record.data.latitude,
						longitude:  record.data.longitude,
						accuracy:  record.data.accuracy
					}
				}
				/*geolocation: {
					latitude:  record.data.latitude,
					longitude:  record.data.longitude,
					accuracy:  record.data.accuracy
				}*/

			};
		
			console.log('Assembled object to push: ' + Ext.encode(obj));	
			if(!pushForm){
				pushForm = Ext.widget('pushForm');
			}	 
			//	geolocationForm.setRecord(record);
			pushForm.showBy(target);
	
			// POST to server; config variables from app.json
			url +=  '/' +  EvaluateIt.config.collectionDevelopment;
			url +=  '/' +  EvaluateIt.config.postResults;//testHttpResponse;

			console.log('new url: ' + url);

			// AJAX post
			Ext.Ajax.request({
				//type: "POST",
				url: url,
				params: obj,
				success: function (response) {
					console.log('success: ' + response.responseText);
				},
				fail: function (e, jqxhr, settings, exception) {
					console.log(e);
				}
			}); 
	}			

});

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
		rating = 'NADA'; //'';
	}

	return rating;
}

// awards based on Metro Blooms evaluation form
function evaluation_award (award_id) {

	var nate_siegel = 0;

	switch (award_id) {
		case 1:
			best_of = 'Residential';
			break;
		case 2:
			best_of = 'Residential Raingarden';
			break;
		case 3:
			best_of = 'Boulevard';
			break;
		case 4:
			best_of = 'Business';
			break;
		case 5:
			best_of = 'Business Raingarrden';
			break;
		case 6:
			best_of = 'Apartment';
			break;
		case 7:
			best_of = 'Community';
			break;
		case 8:
			best_of = 'Public';
			break;
		case 9:
			best_of = 'School';
			break;
		case 10:
			best_of = 'Congregation';
			break;
		case 11:
			best_of = 'Windowbox/container';
			break;
		case 12:
			best_of = 'NateSiegel';
			nate_siegel = 1;
			break;
		case 13:
			best_of = 'Special';
			break;
		default:
			best_of = 'NADA!';//null;
			break;
	}
	
	return {
        'best_of': best_of,
        'nate_seigel': nate_siegel
    }; 
}

