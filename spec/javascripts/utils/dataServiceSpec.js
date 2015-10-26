describe('DataService', function() {
	var service = null;
	var session = null;
	var evaluatorId = 265;
	var sessionToken = 'foo';

	beforeEach(function() {
		// Populate config values
		EvaluateIt.config = {
			action: '/update',
			apiViewEvaluation: '/api/evaluation',
			domain: 'metroblooms.org',
			file_upload: '/uploadImage',
			mode: 'live',
			production: 'www.',
			protocol: 'http://',
			pullCriterion: '/evaluator_id/'
		}

		// Add keys to session
		addToSession('evaluator_id');
		addToSession('sessionToken');

		// Fill in session data
		sessionStorage.evaluator_id = evaluatorId;
		sessionStorage.sessionToken = sessionToken;

		service = EvaluateIt.utils.DataService;
	});
	
	it('service exists', function() {
		expect(service).toBeDefined();
	});

	it('build url', function() {
		expect(service.url('existing')).toEqual('http://www.metroblooms.org/api/evaluation/update?token=' + sessionToken);
		expect(service.url('file')).toEqual('http://www.metroblooms.org/api/evaluation/uploadImage?token=' + sessionToken);
		expect(service.url('pull')).toEqual('http://www.metroblooms.org/api/evaluation/evaluator_id/' + evaluatorId + '?token=' + sessionToken);
	});
	
	//~ Begin helper methods =================

	function addToSession(sessionId) {
		new Ext.data.proxy.SessionStorage({
	    	id  : sessionId
		});	
	}
});