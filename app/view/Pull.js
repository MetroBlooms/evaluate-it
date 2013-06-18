// Load remote data via AJAX: dispaly reuslt in view
 
Ext.define('EvaluateIt.view.Pull', {
    extend: 'Ext.Container',
	alias: 'widget.pullview',
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
						xtype: 'button',
						itemId: 'loginButton',
						text: 'Login',
						iconCls: 'arrow_right',
						iconMask: true 
					},
					{
						xtype: 'button',
						itemId: 'logOutButton',
						text: 'Logout',
						iconCls: 'arrow_right',
						iconMask: true 
					},
                    {
                        text: 'Pull data',
                        handler: function() {
                            var panel = Ext.getCmp('Pull'),
								json = [];

                            panel.getParent().setMasked({
                                xtype: 'loadmask',
                                message: 'Loading...'
                            });

							// assemble url with callback for Ajax request: Configuration kept in non-versioned file, app.js 
							//url = EvaluateIt.config.webServer + '/'; 
							//url += EvaluateIt.config.collectionDevelopment + '/';  
							//url += EvaluateIt.config.callback;
							//url = 'http://staging.metroblooms.org/api/evaluation/evaluator_id/265?token={TOKEN}',
					
							// use new API with authorization token
							url =  EvaluateIt.config.protocol;
							url += EvaluateIt.config.test;
							url += EvaluateIt.config.domain;
							url += EvaluateIt.config.apiViewEvaluation;
							url += EvaluateIt.config.pullCriterion;
							url += sessionStorage.evaluator_id;
							url += '?token=' + sessionStorage.sessionToken

							
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
								   console.log('data: ' + response.responseText);
								},
								fail: function (e, jqxhr, settings, exception) {
									console.log(e);
								}
							});
                        }
                    }
                ]
            }
        ],
        listeners: [{
            delegate: '#logOutButton',
            event: 'tap',
            fn: 'onLogOutButtonTap'
        }]
    },
    onLogOutButtonTap: function () {
        this.fireEvent('onSignOffCommand');
    }

});

// parse object into model

function parseJson (json) {

	var i,
		max,
		newEvaluator,
		Evaluators = Ext.create('EvaluateIt.store.Evaluators'),
		SiteEvaluations =  Ext.create('EvaluateIt.store.SiteEvaluations');
		//siteEvaluation;
	
	//console.log('n: ' + json.length);

	// clear for testing only!
	localStorage.clear();

	for (i = 0, max = json.length; i < max; i += 1) {

		// a create a psuedo-nested JSON store until issues with association have been resolved

		//if (json[i].completed === 0) {
			siteEvaluations = Ext.getStore(SiteEvaluations);
					
			// need to see if evaluation exists in store 
			var match = siteEvaluations.find('remoteEvaluationId', json[i].garden.evaluation_id);

			console.log(siteEvaluations.find('remoteEvaluationeId', json[i].garden.evaluation_id)); 
					  
			if (match === -1) {
				console.log('Adding site!');
				
				siteEvaluations.add([{
					site_id: i, 
					remoteSiteId: json[i].garden.garden_id, 
					//address: json[i].garden.address,
					address: json[i].garden.address.address,
					//city: json[i].garden.city,
					city: json[i].garden.address.city,
					//state: json[i].garden.state,
					state: json[i].garden.address.state,
					//zipcode: json[i].garden.zip,
					zipcode: json[i].garden.address.zip,
					//neighborhood: json[i].garden.neighborhood,
					neighborhood: json[i].garden.address.neighborhood,
					//remoteEvaluatorId: json[i].evaluator_id,
					remoteEvaluatorId: json[i].evaluator.evaluator_id,
					evaluationType: 1,
					remoteEvaluationId: json[i].evaluation_id, 
					dateOfEvaluation: null,
					//name:  json[i].garden.name
					name: json[i].garden.gardener.name0

				}]);
				siteEvaluations.sync(); // update proxy

			}
			else { 
				// sites.removeAt(i);
				console.log('Evaluation exists!');
			} 

		// } // end if

   		// ---------------------------------
		// insert evaluators for evaluation: in practice, an evaluator has many evaluations; however, assume that only one evaluator uses the device, 
		// and thus, no direct association is needed between models
	
		// TODO: add check that record does not already exist	
		if (i === 0) {
			newEvaluator = {remoteEvaluatorId: json[i].evaluator.evaluator_id, firstName: json[i].evaluator.firstname, lastName: json[i].evaluator.lastname, email: json[i].evaluator.email};
			Evaluators.add(newEvaluator);
			Evaluators.sync();

		}
	 
	}

}

