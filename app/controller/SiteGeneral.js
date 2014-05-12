Ext.define('EvaluateIt.controller.SiteGeneral', {
    extend : 'Ext.app.Controller',

    config: {
        profile: Ext.os.deviceType.toLowerCase(),
        stores : ['Addresses', 'Sites'],
        models : ['Address', 'Site'],
        refs: {
            mySiteGeneralList: 'siteList'
        },
        control: {
            'siteList': {
                activate: 'onActivate',
                itemtap: 'onSelectSiteGeneral'
            },
            'container button[itemId=addSiteGeneral]' : {
                tap : 'onAddSiteGeneral'
            },
            'siteForm button[itemId=save]' : {
                tap : 'onSaveSiteGeneral'
            }
        }
    },

    onActivate: function() {
        console.log('Main container is active');
    },

    onAddSiteGeneral: function(button) {
        console.log('Button Click');
        var siteGeneralForm = Ext.Viewport.down('siteGeneralForm');
        //create the siteEvaluation edit window if it doesn't exists
        if(!siteGeneralForm){
            siteGeneralForm = Ext.widget('siteGeneralForm');
        }
        siteGeneralForm.reset();
        siteGeneralForm.showBy(button);
    },

    onSaveSiteGeneral: function(button) {

        console.log('Button Click for Save');

        //console.log(this.$className);
        console.log('Button Click for Save');
        var form = button.up('panel'),
            //get the model
            record = form.getRecord(),
            //get the form values
            values = form.getValues( false, false, false, true );

        console.log(record.getData(true)); // to see the record
        record.setFlattenedData(values);  // persist the form data back to the record
        console.log(record.getAssociatedData(true)); // to see the record associations

        if(!record){

            //TODO: instantiate new Site and Address models, and create new blank Evaluation associations per utils.DataService Pull method
        }
        //existing siteEvaluation
        else {

            //TODO: console.log('setFlattenedData( form.getValues())' +  model.setFlattenedData( form.getValues(false, false, false, true)) );
            // update record using setFlattenedData method in BaseModel
        }
        form.hide();

    },

    onSelectSiteGeneral: function(view, index, target, record, event) {
        console.log('Selected a Site from the list');
        var siteForm = Ext.widget('siteForm');

        siteForm.setRecord(record);
        console.log(record.$className + ' ' + record.getId())

        record.getAddress();  // This will instantiate a missing Address hasOne if not already in the data or do nothing if there is one
        siteForm.setValues(record.getFlattenedData(true));
        console.log('Site hasOne hierarchy: ' +  Ext.encode(record.getFlattenedData( true )));

        siteForm.showBy(target);

    }

});


