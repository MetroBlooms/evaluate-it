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

// select object to load to remote

/* What object should look like:

test: {"evaluation_id": 44214,
	"score": 20, // computed, but stored value
	"rating": "EG", // computed by range (see function assembleDataToPost)
	"rating_year": 2012, // computed
	"bestof": "Special", // from evaluation_award
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

	// TODO: complete object, split into separate functions; add image uploade using native or Cordova method
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
			date_of_evaluation = record.data.dateOfEvaluation,
			obj = {},
			url = EvaluateIt.config.webServer, 
	
			obj = {
				evaluation_id : record.data.evaluation_id,
				//score : record.data.sum_rating,
				//rating : rating,
				//rating_year : currentYear,
				//bestof : bestof,
				//special_award_specified : record.data.special_award_specified,
				//nate_siegel_award : nateSiegelAward,
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
				//rainbarrel : rain_barrel,
				//raingarden : rain_garden,
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
					},
				},
			};
		
			console.log('Assembled object to push: ' + Ext.encode(obj));	
			if(!pushForm){
				pushForm = Ext.widget('pushForm');
			}	 
			//	geolocationForm.setRecord(record);
			pushForm.showBy(target);
	
			// POST to server
			url = url + '/' +  EvaluateIt.config.collectionDevelopment;

			url = url + '/' +  EvaluateIt.config.testHttpResponse;

			console.log('new url: ' + url);

			Ext.Ajax.request({
				type : "POST",
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
