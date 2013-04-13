 /* Demonstrates loading data over AJAX. See http://docs.sencha.com/touch/2-0/#!/guide/ajax for more
 * background on Sencha Touch 2's AJAX capabilities
 */
Ext.define('EvaluateIt.view.Pull', {
    extend: 'Ext.Container',
    config: {
        scrollable: true,
        items: [
            {
                xtype: 'panel',
                id: 'Pull',
                styleHtmlContent: true
            },
            {
                docked: 'top',
                xtype: 'toolbar',
                items: [
                    {
                        text: 'Load data from remote',
                        handler: function() {
                            var panel = Ext.getCmp('Pull');

                            panel.getParent().setMasked({
                                xtype: 'loadmask',
                                message: 'Loading...'
                            });

							var	url,
								json = [],
								//webServer = 'http://metroblooms.org',
								//collectionDevelopment = 'app',
								//evaluator_id = 265, // need variable evaluator_id!! // becky = 216
								//callback = 'evaluations.php?evaluator_id=';

							// assemble url with callback for Ajax request: Need to keep this in unversioned file for security
							url = EvaluateIt.config.webServer + '/' + EvaluateIt.config.collectionDevelopment + '/' +  EvaluateIt.config.callback +  EvaluateIt.config.evaluator_id;
							//url = webServer + '/' + collectionDevelopment + '/' +  callback +  evaluator_id;

							console.log(url);

							// make cors request for cross domain access for data
							Ext.Ajax.request({ 
								cors: true,
								url : url,
								useDefaultXhrHeader: false,
								success: function (response) {
								   //Ext.Msg.alert("Success!");
								   json = Ext.decode(response.responseText);
								   parseJson(json); // parse object into model
                                   panel.setHtml(response.responseText);
                                   panel.getParent().unmask();
								},
								fail: function (e, jqxhr, settings, exception) {
									console.log(e);
								}
							});
                        }
                    }
                ]
            }
        ]
    }
});

// parse object into model
function parseJson (json) {

	var i,
		max,
		Evaluators = Ext.create('EvaluateIt.store.Evaluators'),
		Evaluations = Ext.create('EvaluateIt.store.Evaluations'),
		Sites = Ext.create('EvaluateIt.store.Sites'),
		Addresses = Ext.create('EvaluateIt.store.Addresses'),
		Evaluator,
		Evaluation,
		//Site = Ext.create('EvaluateIt.model.Site', {id: 1}),
		evaluators,
		//evaluations,
		site,
		evaluation,
		//address = new EvaluateIt.model.Address(),
		evaluator = new EvaluateIt.model.Evaluator(),
		sites, //= Ext.getStore(myStore),
		addresses,
		newAddress, // = Ext.getStore(Adresses);
		newEvaluator,
		SiteEvaluations =  Ext.create('EvaluateIt.store.SiteEvaluations'),
		siteEvaluation;
	
	//console.log('n: ' + json.length);

	// clear for testing only!
	localStorage.clear();


	for (i = 0, max = json.length; i < max; i += 1) {


		// a creeate a psuedu-nested JSON store until issues with association have been resolved

		//siteEvaluation = Ext.create('EvaluateIt.model.SiteEvaluation', {id: i});
		siteEvaluations = Ext.getStore(SiteEvaluations);

		siteEvaluations.add([{
			site_id: i, 
			remoteSiteId: json[i].garden.garden_id, 
			address: json[i].garden.address.address,
			city: json[i].garden.address.city,
			state: json[i].garden.address.state,
			zipcode: json[i].garden.address.zip,
			neighborhood: json[i].garden.address.neighborhood,
			remoteEvaluatorId: json[i].evaluator.evaluator_id,
 			evaluationType: 1,
 			remoteEvaluationId: json[i].evaluation_id, 
			dateOfEvaluation: null,
			remoteEvaluatorId: json[i].evaluator.evaluator_id,
			name:  json[i].garden.gardener.name0

/*			'address.address': json[i].garden.address.address,
			'address.city': json[i].garden.address.city,
			'address.state': json[i].garden.address.state,
			'address.zipcode': json[i].garden.address.zip,
			'address.neighborhood': json[i].garden.address.neighborhood,
			'evaluation.remoteEvaluatorId': json[i].evaluator.evaluator_id,
 			'evaluation.evaluationType': 1,
 			'evaluation.remoteEvaluationId': json[i].evaluation_id, 
			'evaluation.dateOfEvaluation': null,
			'evaluator.remoteEvaluatorId': json[i].evaluator.evaluator_id,
			'siteMaintainer.name':  json[i].garden.gardener.name0
*/

		}]);
		siteEvaluations.sync();

		//console.log('test mapping out: ');
		
		//site =  Ext.create('EvaluateIt.model.Site', {id: i}),

		/*console.log('site.id ' +  json[i].garden.garden_id);

		site = Ext.create('EvaluateIt.model.Site', {id: i});
		sites = Ext.getStore(Sites);
		
		// need to see if site exists in store before adding it 
		var match = sites.find('remoteSiteId', json[i].garden.garden_id);

		console.log(sites.find('remoteSiteId', json[1].garden.garden_id)); 
		  
		if (match === -1) {
			console.log('Adding site!');
		
			sites.add([{site_id: i, key_id: i, remoteSiteId: json[i].garden.garden_id}]);
			sites.sync(); // update proxy 
		}
		else { 
		//     		sites.removeAt(i);
			console.log('Removing site pointer!');
		} // remove from store if item already exists

		if (i === 0) {

		// need to see if remoteEvaluator_id already entered	
			evaluator = Ext.create('EvaluateIt.model.Evaluator', {id: i});
			evaluators = Ext.getStore(Evaluators);

			evaluators.add([{evaluator_id: i, remoteEvaluatorId: json[i].evaluator.evaluator_id, firstName:  json[i].evaluator.firstname, lastName: json[i].evaluator.lastname, email: json[i].evaluator.email}]);
			evaluators.sync();
		}

		if (json[i].completed != 0 && match === -1) {
			//evaluation = Ext.create('EvaluateIt.model.Evaluation', {id: i});
			//evaluations = Ext.getStore(Evaluations);

			var evaluations = evaluator.evaluatorEvaluations();

			evaluations.add([{evaluation_id: i, evaluationType: 1, remoteEvaluationId: json[i].evaluation_id}]);
			evaluations.sync();
		}
		
		if (json[i].completed != 0) {
			//evaluation = Ext.create('EvaluateIt.model.Evaluation', {id: i});
			//evaluations = Ext.getStore(Evaluations);
			
			// create instatiate instance and make association
			var evaluations = site.siteEvaluations();

			match = Evaluations.find('remoteEvaluationId', json[i].evaluation_id);

			console.log(Evaluations.find('remoteEvaluationId', json[i].evaluation_id)); 
		  
			if (match === -1) {
				console.log('Adding evaluation!');

				evaluations.add([{key_id: i, evaluation_id: i, remoteEvaluatorId: json[i].evaluator.evaluator_id, evaluationType: 1, remoteEvaluationId: json[i].evaluation_id, dateOfEvaluation: null}]);
				evaluations.sync();
			}
			else { 
			//     		sites.removeAt(i);
				console.log('Removing evaluation pointer!');
			} //
		}


		// insert addresses for sites
		address.getSite( function(site, operation){
			console.log('tried to load site. this.site is now set to the site');
		} );

		// see if address is known
		match = Addresses.findBy(function(record,id) {
			if(record.get('address') === json[i].garden.address.address && record.get('city') === json[i].garden.address.city) {
				console.log('no add addy!');	
				return true;
			}
		});

		if(match === -1) {
			console.log('add addy!');	

			address.setSite(site);

			console.log(address.get('site_id'));

			newAddress = {site_id: address.get('site_id'), address: json[i].garden.address.address, city: json[i].garden.address.city, state: json[i].garden.address.state, zipcode: json[i].garden.address.zip};

			Addresses.add(newAddress);

			Addresses.sync();
		}


		// insert evaluators for evaluation: ieally, an evaluator has many evaluations; however, assume that only one evaluator uses the device, and thus, no direct association is needed between models

		//evaluator.getEvaluation( function(evaluation, operation){
		//		console.log('tried to load evaluation. this.evaluation is now set to the evaluation');
		//});

		// see if evaluator is known
		match = Evaluators.findBy(function(record,id) {
			if(record.get('firstName') === json[i].evaluator.firstname && record.get('lastName') === json[i].evaluator.lastname) {
				console.log('no add evaluator!');	
				return true;
			}
		});

		if(match === -1) {
			console.log('add evaluator!');	

			newEvaluator = {remoteEvaluatorId: json[i].evaluator.evaluator_id, firstName: json[i].evaluator.firstname, lastName: json[i].evaluator.lastname, email: json[i].evaluator.email};

			Evaluators.add(newEvaluator);

			Evaluators.sync();
		}*/


	 
	}
	//outputJson();

}

