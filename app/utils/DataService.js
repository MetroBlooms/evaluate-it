/**
 * UtilityService functions
 *
 */
Ext.define('EvaluateIt.utils.DataService', {
    singleton : true,
    alias : 'widget.UtilityService',
    constructor: function(config) {
        this.initConfig(config);
    },

    /**
     *
     * Assemble base url for API usage
     * valid options:
     *      pull, existing/new/file (push) and login/logout
     */
    url: function(param){
    // utilize API as per web site standard
        // value set via {EvaluateIt.config}

        console.log('Service test:' + param);

        var url =  EvaluateIt.config.protocol;

        // select mode of API access
        if (EvaluateIt.config.mode === 'test') {
            url += EvaluateIt.config.test;
        }
        if (EvaluateIt.config.mode === 'live') {
            url += EvaluateIt.config.production;
        }

        url += EvaluateIt.config.domain;

        if (param === 'pull' || param === 'existing' || param === 'new' || param === 'file') {
            url += EvaluateIt.config.apiViewEvaluation;
        }
        if (param === 'pull') {
            url += EvaluateIt.config.pullCriterion;
//            url += sessionStorage.evaluator_id; // test using 265;
            url += 265;
        }
        if (param === 'existing') {
            url += EvaluateIt.config.action;
        }
        if (param === 'new') {
            url += EvaluateIt.config.ad_hoc;
        }
        if (param === 'file') {
            url += EvaluateIt.config.file_upload;
        }
        if (param === 'login'){
            url += EvaluateIt.config.login;
        }
        if (param === 'logout'){
            url += EvaluateIt.config.logout;
            url += '?token=';
        }
        if (param === 'existing' || param === 'new' || param === 'pull' || param === 'logout' || param === 'file') {
            url += '?token=' + sessionStorage.sessionToken
        }

        return url;

    },

    /**
     * parse object into model
     * @param json
     */
    pull: function(json) {

        var i,
            max;

        for (i = 0, max = json.length; i < max; i += 1) {

            if (json[i].completed === '1') {
                /*var address = Ext.create('EvaluateIt.model.Address', {
                    address: json[i].garden.address.address,
                    city: json[i].garden.address.city,
                    state: json[i].garden.address.state,
                    zipcode: json[i].garden.address.zip,
                    neighborhood: json[i].garden.address.neighborhood
                });
                 */
                var addressValues = json[i].garden.address ;
                this.newEvaluation(addressValues, json[i].garden.garden_id, json[i].evaluator.evaluator_id,json[i].evaluator.evaluation_id);
            }

            // reload stores to show up-to-date data in Xtemplates
            Ext.StoreMgr.get('Sites').load();
            Ext.StoreMgr.get('Evaluations').load();
            Ext.StoreMgr.get('Addresses').load();
            Ext.StoreMgr.get('EvaluationAwards').load();
            Ext.StoreMgr.get('EvaluationScorecards').load();
            Ext.StoreMgr.get('Geolocations').load();
       }
    },

    /**
     *
     * @param addressValues required dictionary with EvaluateIt.model.address elements
     * @param gardenId optional
     * @param evaluatorId optional
     * @param evaluationId optional
     */
    newEvaluation: function( addressValues, gardenId, evaluatorId, evaluationId ){
        var address = Ext.create('EvaluateIt.model.Address', {
            address: addressValues.address,
            city: addressValues.city,
            state: addressValues.state,
            zipcode: addressValues.zipcode,
            // neighborhood: addressValues.neighborhood,
            county: addressValues.county
        });

        console.log('address.id ' + address.id);

        // create model using remote data
        if(gardenId == null) {
            var site = Ext.create('EvaluateIt.model.Site', {
            });
        } else {
            var site = Ext.create('EvaluateIt.model.Site', {
                remoteSiteId: gardenId
        });
        }

        // set hasOne association using model's getter
        site.setAddress(address.id);

        // create blank geolocation
        var geolocation = Ext.create('EvaluateIt.model.Geolocation', {
        });

        console.log('geolocation.id ' + geolocation.id);

        // set hasOne association using model's getter
        site.setGeolocation(geolocation.id);

        // create blank award
        var award = Ext.create('EvaluateIt.model.EvaluationAward', {
        });

        // create blank scorecard
        var scorecard = Ext.create('EvaluateIt.model.EvaluationScorecard', {
        });

        // set hasMany evaluation by creating a blank record
        var evalArray,
            evaluationRecs = site.Evaluation(), // set association
            evalModel = Ext.ModelManager.getModel('EvaluateIt.model.Evaluation'); // Get the model from the application models auto-getter

        if (evaluationRecs.getCount() === 0){
            //  Note: .add(model) returns an array/store of model instances
            evalArray = evaluationRecs.add(evalModel);
            // set values using remote data
            evalArray[0].set({
                evaluator_id: evaluatorId,
                remoteEvaluationId: evaluationId
            });

            // grab first and only model instance from store
            // and set associations
            console.log('stuff: ' + evaluationRecs.first().id);

            award.setEvaluation(evaluationRecs.first().id);
            evaluationRecs.first().setEvaluationAward(award.id);

            scorecard.setEvaluation(evaluationRecs.first().id);
            evaluationRecs.first().setEvaluationScorecard(scorecard.id);
        }

        // save everything
        evaluationRecs.sync();
        site.save();
        geolocation.setSite(site.id);
        geolocation.save();
        address.setSite(site.id);
        address.save();
        award.save();
        scorecard.save();
    },

    /**
     * push assembled json to remote
     *
     * @param record
     */
    push: function (record) {

        var	score,
            award,
            rating,
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
            score = EvaluateIt.utils.UtilityService.sum_factor_ratings(record.data.visualImpact,
                record.data.varietyAndHealth,
                record.data.design,
                record.data.maintenance,
                record.data.environmentalStewardship);


            // get rating for given score
            /**
             * Determine ranking of evaluation
             * calls UtilityService function
             * @type {String}
             */
            rating = EvaluateIt.utils.UtilityService.evaluation_rating (score);

            console.log("rating" + rating);
        }
        else {
            score = null;
            rating = null;
        }

        // get award if given
        award = EvaluateIt.utils.UtilityService.evaluation_award(record.data.awardId);
        console.log("award" + award.bestof + ' ' + award.nate_seigel);

        if (record.data.noLongerExists === 'true' || record.data.noLongerExists === true) {
            no_longer_exists = 1;
        }

        if (record.data.rainGarden === 'true' || record.data.rainGarden === true) {
            rain_garden = 1;
        }

        /**
         * Core data set for sending to remote server
         * @type {{evaluation: {garden_id: (parseJson.remoteSiteId|*), eval_type: number, score: *, rating: *, rating_year: number, bestof: (*|EvaluateIt.utils.UtilityService.evaluation_award.bestof|core.evaluation.bestof|evaluation_award.bestof), special_award_specified: *, evaluator_id: (*|core.evaluation.evaluator_id|sessionStorage.evaluator_id), nate_siegel_award: (EvaluateIt.utils.UtilityService.evaluation_award.nate_seigel|*|evaluation_award.nate_seigel), date_evaluated: *, comments: (*|Function|Docs.Settings.defaults.comments|core.evaluation.comments|Docs.view.comments), scoresheet: {color: *, plant_variety: *, design: (*|core.evaluation.scoresheet.design), maintenance: (*|core.evaluation.scoresheet.maintenance), environmental_stewardship: *}}, geolocation: {latitude: (*|Number|latitude|core.geolocation.latitude|sessionStorage.latitude), longitude: (*|Number|longitude|core.geolocation.longitude|sessionStorage.longitude), accuracy: (*|Number|accuracy|Ext.chart.series.Pie.accuracy|core.geolocation.accuracy|sessionStorage.accuracy)}}}
         */
        core = {
            evaluation: {
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
            obj.evaluation.uuid = record.data.id; // new uses uuid as linking id
            console.log('new');
            eval_type = 'new';
        }

        console.log('Assembled object to push: ' + Ext.encode(obj));

        post(obj, record, eval_type);

        /**
         * Ajax to remote REST service
         *
         * @param obj
         * @param record
         * @param eval_type
         */
        function post(obj, record, eval_type) {

            /**
             * Assemble url as per API definition
             *
             */
            var url,
                store = Ext.create('EvaluateIt.store.SiteEvaluations'),
                update_record = store.findExact('remoteEvaluationId', record.data.id),
                now = new Date();

            if (eval_type === 'existing') {
                url = EvaluateIt.utils.UtilityService.url('existing');
            }
            if (eval_type === 'new') {
                url = EvaluateIt.utils.UtilityService.url('new');
            }

            console.log('new url: ' + url);

            Ext.Ajax.request({
                type: 'POST',
                url: url,
                jsonData: obj,

                success: function (response) {
                    console.log('success: ' + response.responseText);

                    alert('Successfully uploaded: '+ response.responseText);

                    // flag as uploaded by updating store attribute datePostedToRemote with date
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
                file_post(record);
            }
        }

        /**
         * Assemble required objects for image transmittal
         *
         * Post image to remote server using Phonegap file transfer API
         *
         * @param record
         * @param imageUri
         * @param url
         * @param evaluation_kvp
         */
        function file_post(record) {

            var uri,
                url,
                evaluation_kvp = {},
                options = new FileUploadOptions(),
                ft = new FileTransfer();

            uri = record.data.imageUri; // local path to image
            url = EvaluateIt.utils.DataService.url('file');

            console.log('upload uri: ' + uri + 'url: ' + url);

            console.log('evaluation_id, uuid ' + record.data.remoteEvaluationId + ', ' + record.data.id );

            // assemble key value pair for use in file transfer object for: existing evaluation
            if (record.data.remoteEvaluationId !== null) {
                evaluation_kvp.evaluation_id = record.data.remoteEvaluationId;
                console.log('evaluation_id ' + Ext.encode(evaluation_kvp));
            }
            // new nomination/evaluation: use uuid as identifier
            else {
                evaluation_kvp.uuid = record.data.id;
                console.log('uuid ' + Ext.encode(evaluation_kvp));
            }

            EvaluateIt.controller.Push.post_file(uri, url, evaluation_kvp);

            options.fileKey = 'userfile';
            options.mimeType = 'image/jpeg';
            options.chunkedMode = false;
            options.params = evaluation_kvp; // attached key value pair

            ft.upload(uri, encodeURI(url), post_success, post_error, options);
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

        function post_error (error) {
                alert("An error has occurred: Code = " + error.code);
                console.log("An error has occurred: Code = " + error.code);
        }

    }
})

