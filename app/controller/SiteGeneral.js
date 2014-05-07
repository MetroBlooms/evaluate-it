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

       // console.log('data: ' + record.setFlattenedData(values));

        console.log(record.getData(true)); // to see the record before
        record.setFlattenedData(values);  // persist the form data back to the record
        console.log(record.getData(true)); // to see the record after


        //console.log('setFlattenedData( form.getValues())' +  record.setFlattenedData( values ));

        //var myAddress = EvaluateIt.model.Address;
        //var address = new myAddress();

        //this.setAddress( { 'address':'1100 block, north side on Cedar Lake Road' } );

        //var mySite = EvaluateIt.model.Site;
        //var site = new mySite();
        //console.log('site.id' + site.id);
        //site.getAddress({reload:true});

        /*var address = record.getAddress({
            reload:true,
            success: function (record,operation) {
                console.log('SUCCESS');
            },

            failure: function(record,operation) {
                console.log('FAILURE');
            }
        });*/


         // can either use just callback config (called on fail or success) or success/failure configs



        //site.setAddress({reload:true});

        //site.save();

        //address.setSite(site.id);

        //console.log('site.id ' + site.id + ' ' + site.address);

        //address.save();
        //address.setFlattenedData( values )


        //console.log('setFlattenedData( form.getValues()) !!' +  this.getAddress());

        if(!record){

            //console.log('setFlattenedData( form.getValues())' +  model.setFlattenedData( form.getValues(false, false, false, true)) );

        }
        //existing siteEvaluation
        else {
           // add relevant code here
        }
        form.hide();



    },

    onSelectSiteGeneral: function(view, index, target, record, event) {
        console.log('Selected a Site from the list');
        var siteForm = Ext.widget('siteForm');

        siteForm.setRecord(record);

        record.getAddress();  // This will instantiate a missing Address hasOne if not already in the data or do nothing if there is one
        siteForm.setValues(record.getFlattenedData(true));
        siteForm.showBy(target);




    }

});


