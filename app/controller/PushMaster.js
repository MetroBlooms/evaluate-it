Ext.define('EvaluateIt.controller.PushMaster', {
	extend : 'Ext.app.Controller',

	config: {
		profile: Ext.os.deviceType.toLowerCase(),
  		stores : ['SiteEvaluations'],
  		models : ['SiteEvaluation'],
  		refs: {
   			myPushList: 'pushList'
  		},
		control: {
			'pushList': {
				activate: 'onActivate',
				itemtap: 'onSelectPush'
			},
			'container button[itemId=addPush]' : {
				tap : 'onAddPush' 
			},
			'pushForm button[itemId=save]' : {
				tap : 'onSavePush' 
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

	// TODO: add missing atributes to form; add image uploade using native or Cordova method

	onSelectPush: function(view, index, target, record, event) {
		console.log('Selected a Push from the list ' + index + ' ' + record.data.address);
		var pushForm = Ext.Viewport.down('pushForm'),
			evaluation_id= record.data.remoteEvaluationId,
			garden_id = record.data.remoteSiteId,
			evaluator_id = record.data.remoteEvaluatorId,
			address = record.data.address,
			city = record.data.city,
			state = record.data.state,
			zipcode = record.data.zipcode,
			neighborhood = record.data.neighborhood,
			county = record.data.county,
			score,
			color = record.data.useOfColor,
			plant_variety = record.data.varietyAndHealth,
			design = record.data.design,
			maintenance = record.data.maintenance,
			environmental_stewardship = record.data.environmentalStewardship,
			name = record.data.name,
			general_comments = record.data.comments,
			no_longer_exists = record.data.noLongerExists,
			latitude = record.data.latitude,
			longitude = record.data.longitude,
			accuracy = record.data.accuracy,
			rain_garden = record.data.rainGarden,
		    rain_barrel = record.data.rainBarrel,
			award_id = record.data.awardId,
			special_specified =  record.data.special_award_specified,
			best_of, 
			nate_siegel_award,
			currentYear = (new Date()).getFullYear(),
			date_of_evaluation = record.data.dateOfEvaluation,
			obj = {},
			rating,
			url = EvaluateIt.config.webServer; 

			// get rating
			score = color + plant_variety + design + maintenance + environmental_stewardship;
			rating = evaluation_rating(score);
			console.log("rating" + rating);	
			
			// get award
			best_of = evaluation_award(award_id);
			console.log("award" + best_of);	

			obj = {
				evaluation_id : evaluation_id,
				score : score,
				rating : rating,
				rating_year : currentYear,
				best_of : best_of,
				special_award_specified : special_specified,
				nate_siegel_award : nate_siegel_award,
				score_card : {
					color : color,
					plant_variety : plant_variety,
					design : design,
					maintenance : maintenance,
					environmental_stewardship : environmental_stewardship
				},
				date_evaluated : date_of_evaluation, // was:
				// date_entered_on_device_by_evaluator,
				general_comments : general_comments,
				evaluator : {
					evaluator_id : '265',
					completed_by : '265'
				},
				rainbarrel : rain_barrel,
				raingarden : rain_garden,
				garden : {
					garden_id : garden_id,
					no_longer_exists : no_longer_exists,
					address : {
						neighborhood : neighborhood,
						county : 'Hennepin'
					},
					gardener : {
						name : name
					},
					geolocation : {
						latitude : latitude,
						longitude : longitude,
						accuracy : accuracy
					}
				}
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
				//type : "POST",
				url : url,
				params : obj,
				success : function (response) {
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

// awards based on MEtro Blooms evaluation form
function evaluation_award (award_id) {

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
			nate_siegel_award = 1;
			break;
		case 13:
			best_of = 'Special';
			break;
		default:
			best_of = 'NADA!';//null;
			break;
	}
	
	return best_of;
}

