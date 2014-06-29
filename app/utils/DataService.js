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
        // value set via {EvaluateIt.config} in app.js

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

        if (param === 'pull' || param === 'existing' || param === 'file') {
            url += EvaluateIt.config.apiViewEvaluation;
        }
        if (param === 'new') {
            url += EvaluateIt.config.apiViewNomination;
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
                var addressValues = json[i].garden.address ;
                this.newEvaluation(addressValues, json[i].garden.garden_id, json[i].evaluator.evaluator_id,json[i].evaluation_id,json[i].garden.gardener.name0);
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
    newEvaluation: function( addressValues, gardenId, evaluatorId, evaluationId, siteMaintainer ){
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
                remoteEvaluationId: evaluationId,
                siteMaintainer: siteMaintainer
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
        // TODO: refactor as new method/function

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
            eval_type,
            evaluation_id = record.data.evaluation_id,
            EvaluationStore = Ext.create('EvaluateIt.store.Evaluations'),
            evaluation,
            EvaluationScorecardStore = Ext.create('EvaluateIt.store.EvaluationScorecards'),
            evaluationScorecard,
            EvaluationAwardStore = Ext.create('EvaluateIt.store.EvaluationAwards'),
            evaluationAward,
            SiteStore = Ext.create('EvaluateIt.store.Sites'),
            site,
            AddressStore = Ext.create('EvaluateIt.store.Addresses'),
            address,
            GeolocationStore = Ext.create('EvaluateIt.store.Geolocations'),
            geolocation;

        console.log('id:' + record.data.id)

        // get all data: record refers to EvaluationScorecard
        evaluation = EvaluationStore.findRecord('id', evaluation_id);
        console.log(evaluation.getData(true));
        console.log('evaluation.id:' + evaluation.get('id') + ' ' + record.data.evaluation_id);
        console.log('site.id:' + evaluation.get('site_id'));

        evaluationScorecard = EvaluationScorecardStore.findRecord('evaluation_id', evaluation.get('id'));
        console.log(evaluationScorecard.getData(true));
        console.log('evaluationScorecard.id:' + record.data.id);

        evaluationAward = EvaluationAwardStore.findRecord('evaluation_id', evaluation.get('id'));
        console.log(evaluationAward.getData(true));
        console.log('evaluationAward.id:' + evaluationAward.get('id'));

        site = SiteStore.findRecord('id', evaluation.get('site_id'));
        console.log(site.getData(true));
        console.log('site.id:' + evaluation.get('site_id'));

        address = AddressStore.findRecord('site_id', site.get('id'));
        console.log(address.getData(true));
        console.log('address.id:' + address.get('id'));

        geolocation = GeolocationStore.findRecord('site_id', site.get('id'));
        console.log(geolocation.getData(true));
        console.log('geolocation.id:' + geolocation.get('id'));

        // compute score: TODO: check for null/isInt!
        if (evaluationScorecard.get('visualImpact') !== null
            && evaluationScorecard.get('varietyAndHealth') !== null
            && evaluationScorecard.get('design') !== null
            && evaluationScorecard.get('maintenance') !== null
            && evaluationScorecard.get('environmentalStewardship') !== null) {

            /**
             *
             * Compute sum of scorecard factores
             * @type {Integer}
             */
            score = EvaluateIt.utils.UtilityService.sum_factor_ratings(evaluationScorecard.get('visualImpact'),
                evaluationScorecard.get('varietyAndHealth'),
                evaluationScorecard.get('design'),
                evaluationScorecard.get('maintenance'),
                evaluationScorecard.get('environmentalStewardship'));

            console.log('score: ' + score);
            // get rating for given score
            /**
             * Determine ranking of evaluation
             * calls UtilityService function
             * @type {String}
             */
            rating = EvaluateIt.utils.UtilityService.evaluation_rating(score);

            console.log('rating: ' + rating);
        }
        else {
            score = null;
            rating = null;
        }

        // get award if given
        award = EvaluateIt.utils.UtilityService.evaluation_award(evaluationAward.get('id'));
        console.log('award ' + award.bestof + ' ' + award.nate_seigel);

        if (evaluationScorecard.get('noLongerExists') === 'true' || evaluationScorecard.get('noLongerExists') === true) {
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
                garden_id: site.get('remoteSiteId'),
                eval_type: 1,// null, // change!
                score: score,
                rating: rating,
                rating_year: currentYear,
                bestof: award.bestof,
                special_award_specified: evaluationAward.get('specialAwardSpecified'),
                evaluator_id: sessionStorage.evaluator_id, // would use remoteEvaluatorId, but if ad hoc this will not exist
                nate_siegel_award: award.nate_seigel,
                //date_evaluated: Ext.Date.format(evaluation.get('dateOfEvaluation'), 'm/d/Y'), // formatted as mm/dd/yyyy
                comments: evaluation.get('comments'),
                scoresheet: {
                    color: evaluationScorecard.get('visualImpact'),
                    plant_variety: evaluationScorecard.get('varietyAndHealth'),
                    design: evaluationScorecard.get('design'),
                    maintenance: evaluationScorecard.get('maintenance'),
                    environmental_stewardship: evaluationScorecard.get('environmentalStewardship')
                }
            },
            geolocation: {
                latitude: geolocation.get('latitude'),
                longitude: geolocation.get('longitude'),
                accuracy: geolocation.get('accuracy')
            }

        };

        console.log('Assembled core to push: ' + Ext.encode(core));

        /**
         * Non ad hoc evaluation, minimal data elements
         * @type {{garden: {garden_id: (parseJson.remoteSiteId|*), name: (Docs.data.name|*), no_longer_exists: number, raingarden: number}}}
         */
        existing = {
            garden: {
                garden_id: site.get('remoteSiteId'),
                name:  site.get('name'),
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
                gardener_name: evaluation.get('name'),
                address: address.get('address'),
                city: address.get('city'),
                state: address.get('state'),
                zip: address.get('zipcode'),
                neighborhood: address.get('neighborhood'),
                county: address.get('county')
            },
            garden: {}
        };

        console.log('Assembled ad_hoc to push: ' + Ext.encode(ad_hoc));

        // Assemble json for submission
        // existing site evaluation
        console.log('stuff: ' + site.get('remoteSiteId') + ' ' +  evaluation.get('remoteEvaluationId') + ' ' + evaluation.get('evaluator_id'))
        if (site.get('remoteSiteId') && evaluation.get('remoteEvaluationId') && evaluation.get('evaluator_id')) {
            obj = Ext.Object.merge(core, existing);
            obj.evaluation.evaluation_id = evaluation.get('remoteEvaluationId');
            console.log('existing');
            eval_type = 'existing';
        }
        // new site evaluation
        else {
            obj = Ext.Object.merge(core, ad_hoc);
            obj.evaluation.uuid = site.get('id'); // new uses uuid as linking id
            console.log('new');
            eval_type = 'new';
        }

        console.log('Assembled object to push: ' + Ext.encode(obj));

        post(obj, site, evaluation, eval_type);

        /**
         * Ajax to remote REST service
         *
         * @param obj
         * @param record
         * @param eval_type
         */
        function post(obj, site, evaluation, eval_type) {

            /**
             * Assemble url as per API definition
             *
             */
            var url,
                evalStore = Ext.create('EvaluateIt.store.Evaluations'),
                scoreStore = Ext.create('EvaluateIt.store.EvaluationScorecards'),
                store,
                update_record,
                now = new Date();

            if (eval_type === 'existing') {
                url = EvaluateIt.utils.DataService.url('existing');
            }
            if (eval_type === 'new') {
                url = EvaluateIt.utils.DataService.url('new');
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
                    store = Ext.getStore(evalStore);
                    update_record = store.findRecord('site_id', site.get('id'));
                    update_record.set('datePostedToRemote', now);
                    store.sync();

                    // use to control itmpTpl for list view
                    store = Ext.getStore(scoreStore);
                    update_record = store.findRecord('evaluation_id', evaluation.get('id'));
                    update_record.set('postedToRemote', 1);
                    store.sync();

                },
                fail: function (e, jqxhr, settings, exception) {
                    console.log(e);
                    alert(e);
                }
            });

            console.log('imageUri! ' + evaluation.get('imageUri'));

            // check if image exists in store
            if (evaluation.get('imageUri') !== null && evaluation.get('imageUri') !== '') {
                console.log('file exists!');
                //file_post(site,evaluation);
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
        function file_post(site,evaluation) {

            var uri,
                url,
                evaluation_kvp = {};
                options = new FileUploadOptions(),
                ft = new FileTransfer();

            uri = evaluation.get('imageUri'); // local path to image
            url = EvaluateIt.utils.DataService.url('file');

            console.log('upload uri: ' + uri + 'url: ' + url);

            console.log('evaluation_id, uuid ' + evaluation.get('remoteEvaluationId') + ', ' + site.get('id'));

            // assemble key value pair for use in file transfer object for: existing evaluation
            if (evaluation.get('remoteEvaluationId') !== null) {
                evaluation_kvp.evaluation_id = evaluation.get('remoteEvaluationId');
                console.log('evaluation_id ' + Ext.encode(evaluation_kvp));
            }
            // new nomination/evaluation: use uuid as identifier
            else {
                evaluation_kvp.uuid = site.get('id');
                console.log('uuid ' + Ext.encode(evaluation_kvp));
            }

            options.fileKey = 'userfile';
            options.mimeType = 'image/jpeg';
            options.chunkedMode = false;
            options.params = evaluation_kvp; // attached key value pair to tie image to above json

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
    },

    clear_all: function() {
        var AddressStore = Ext.getStore('Addresses'),
            EvaluationStore = Ext.getStore('Evaluations'),
            EvaluationScorecardStore = Ext.getStore('EvaluationScorecards'),
            EvaluationAwardStore = Ext.getStore('EvaluationAwards'),
            GeolocationStore = Ext.getStore('Geolocations'),
            SiteStore = Ext.getStore('Sites');

        AddressStore.removeAll();
        EvaluationStore.removeAll();
        EvaluationScorecardStore.removeAll();
        EvaluationAwardStore.removeAll();
        GeolocationStore.removeAll();
        SiteStore.removeAll();

        AddressStore.sync();
        EvaluationStore.sync();
        EvaluationScorecardStore.sync();
        EvaluationAwardStore.sync();
        GeolocationStore.sync();
        SiteStore.sync();
    },

    remove_record: function(id) {
        var index,
            address_index,
            evaluation_index,
            evaluation_award_index,
            evaluation_scorecard_index,
            geolocation_index,
            AddressStore = Ext.getStore('Addresses'),
            address,
            EvaluationStore = Ext.getStore('Evaluations'),
            evaluation,
            evaluationModel,
            EvaluationScorecardStore = Ext.getStore('EvaluationScorecards'),
            evaluationScorecard,
            EvaluationAwardStore = Ext.getStore('EvaluationAwards'),
            evaluationAward,
            GeolocationStore = Ext.getStore('Geolocations'),
            geolocation,
            SiteStore = Ext.getStore('Sites'),
            site;

        site = Ext.getStore(SiteStore);
        index = site.findExact('id', id); // get index of record

        address = Ext.getStore(AddressStore);
        address_index = address.findExact('site_id', id);

        geolocation = Ext.getStore(GeolocationStore);
        geolocation_index = geolocation.findExact('site_id', id);

        evaluation = Ext.getStore(EvaluationStore);
        evaluation_index = evaluation.findExact('site_id', id);
        evaluationModel = evaluation.findRecord('site_id', id);

        evaluationAward = Ext.getStore(EvaluationAwardStore);
        evaluation_award_index = evaluationAward.findExact('evaluation_id', evaluationModel.get('id'));

        evaluationScorecard = Ext.getStore(EvaluationScorecardStore);
        evaluation_scorecard_index = evaluationScorecard.findExact('evaluation_id', evaluationModel.get('id'));

        console.log('index: ' + index);
        site.removeAt(index); // remove record by index
        site.sync();
        //alert('site is gone!');

        console.log('address_index: ' + address_index);
        address.removeAt(address_index); // remove record by index
        address.sync();
        //alert('address is gone!');

        console.log('evaluation_index: ' + evaluation_index);
        evaluation.removeAt(evaluation_index); // remove record by index
        evaluation.sync();
        //alert('evaluation is gone!');

        console.log('evaluation_award_index: ' + evaluation_award_index);
        evaluationAward.removeAt(evaluation_award_index); // remove record by index
        evaluationAward.sync();
        //alert('evaluationAward is gone!');

        console.log('evaluation_scorecard_index: ' + evaluation_scorecard_index);
        evaluationScorecard.removeAt(evaluation_scorecard_index); // remove record by index
        evaluationScorecard.sync();
        //alert('evaluationScorecard is gone!');

        console.log('geolocation_index: ' + geolocation_index);
        geolocation.removeAt(geolocation_index); // remove record by index
        geolocation.sync();
        //alert('geolocation is gone!');

        Ext.StoreMgr.get('Sites').load();

    }
})

