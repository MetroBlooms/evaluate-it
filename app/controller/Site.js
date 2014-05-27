Ext.define('EvaluateIt.controller.Site', {
    extend : 'Ext.app.Controller',

    config: {
        profile: Ext.os.deviceType.toLowerCase(),
        stores : ['Addresses', 'Sites'],
        models : ['Address', 'Site'],
        refs: {
            mySiteList: 'siteList'
        },
        control: {
            'siteList': {
                activate: 'onActivate',
                itemtap: 'onSelectSite'
            },
            'container button[itemId=addSite]' : {
                tap : 'onAddSite'
            },
            'siteForm button[itemId=save]' : {
                tap : 'onSaveSite'
            },
            'siteForm button[itemId=cancel]' : {
                tap : 'onCancelSite'
            }
        }
    },

    onActivate: function() {
        console.log('Main container is active');
    },

    onAddSite: function(button) {
        console.log('Button Click');
        var siteForm = Ext.Viewport.down('siteForm');
        //create the siteEvaluation edit window if it doesn't exists
        if(!siteForm){
            siteForm = Ext.widget('siteForm');
        }
        siteForm.reset();
        siteForm.setValues('[]');
        siteForm.showBy(button);
    },

    onCancelSite: function(button) {
        console.log('Button Click for Cancel');
        var form = button.up('panel');
        form.hide();
        form.destroy();
    },

    onSaveSite: function(button) {

        console.log('Button Click for Save');
        //console.log(this.$className);
        var form = button.up('panel'),
            //get the model
            record = form.getRecord(),
            //get the form values
            values = form.getValues( false, false, false, true );

        if(!record){

            //TODO: instantiate  blank Site, Evaluation, EvaluationAward, EvaluationAward models,
            // with associations per utils.DataService Pull method along with new Address record from SiteForm
            EvaluateIt.utils.DataService.newEvaluation(values);

            Ext.StoreMgr.get('Sites').load();
            Ext.StoreMgr.get('Evaluations').load();
            Ext.StoreMgr.get('Addresses').load();
            Ext.StoreMgr.get('EvaluationAwards').load();
            Ext.StoreMgr.get('EvaluationScorecards').load();
            Ext.StoreMgr.get('Geolocations').load();
        }
        //existing site evaluation
        else {
            console.log(record.getData(true)); // to see the record
            record.setFlattenedData(values);  // persist the form data back to the record
            console.log(record.getAssociatedData(true)); // to see the record associations
            record.save();
        }
        form.hide();

    },

    onSelectSite: function(view, index, target, record, event) {
        console.log('Selected a Site from the list');
        var siteForm = Ext.widget('siteForm');

        siteForm.setRecord(record);
        console.log(record.$className + ' ' + record.getId());

        record.get();  // This will instantiate a missing Address hasOne if not already in the data or do nothing if there is one
        siteForm.setValues(record.getFlattenedData(true));
        console.log('Site hasOne hierarchy: ' +  Ext.encode(record.getFlattenedData( true )));

        siteForm.showBy(target);

    }

});


