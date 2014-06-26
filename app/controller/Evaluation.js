/**
 * Controller for EvaluateIt.view.Evaluation
 *
 * TODO: figure out why I needed to clone the record;
 * it may have something to do with grabbing the image from the gallery
 *
 */
Ext.define('EvaluateIt.controller.Evaluation', {
    extend : 'Ext.app.Controller',

    config: {
        profile: Ext.os.deviceType.toLowerCase(),
        stores : ['Addresses', 'Evaluations', 'Sites'],
        models : ['Address', 'Evaluation', 'Site'],
        refs: {
            myEvaluationList: 'evaluationList'
        },
        control: {
            'evaluationList': {
                activate: 'onActivate',
                itemtap: 'onSelectEvaluation'
            },
            'evaluationForm button[itemId=save]' : {
                tap : 'onSaveEvaluation'
            },
            'evaluationForm button[itemId=cancel]' : {
                tap : 'onCancelEvaluation'
            }
        }
    },

    onActivate: function() {
        console.log('Main container is active');
    },

    onCancelEvaluation: function(button) {
        console.log('Button Click for Cancel');
        var form = button.up('panel');
        form.hide();
        form.destroy();
    },

    onSaveEvaluation: function(button) {
        //console.log(this.$className);
        console.log('Button Click for Save');
        var form = button.up('panel'),
            now = new Date(),
        //get the model
            record = form.getRecord(),
        //get the form values
            values = form.getValues( false, false, false, true);

        if(!record){
            // something went horribly wrong, since a new Evaluation association hierarchy should have been created
            // when entering a new Site/Address as per controller.SiteGeneral onSaveSiteGeneral method
        }
        //existing siteEvaluation
        else {

            // get image uri
            var images = Ext.create('EvaluateIt.store.ImageQueue'),
                now = new Date();


            images.queryBy(function(imageRecord,id){
                images = Ext.getStore(images);

                if (images.getCount() > 0) {
                    var uri  = imageRecord.get('src');

                    console.log('URI: ' +  uri + ' ' + now);

                    // update form with URI
                    form.setValues({
                        imageUri: uri
                        // test update date:
                        //dateOfEvaluation: Ext.Date.format(now, 'n/j/Y')
                    })

                    // reset values with newly added data
                    values = form.getValues(false, false, false, true);
                    record = form.getRecord();
                }
            });

            console.log(record.getData(true)); // to see the record
            record.setFlattenedData(values);  // persist the form data back to the record
            console.log(record.getAssociatedData(true)); // to see the record associations
            record.save();

        }
        form.hide();
        Ext.getStore('Evaluations').sync();
    },

    onSelectEvaluation: function(view, index, target, record, event) {

        // clear content from image queue store to initialize
        var lostor = Ext.getStore('theImageQueue');
        lostor.getProxy().clear();

        console.log('Selected a Site from the list');
        var siteEvaluationForm = Ext.widget('evaluationForm');

        siteEvaluationForm.setRecord(record);

        // bind flattened record to form
        var flatData = record.getFlattenedData(true);
        var datePicker = siteEvaluationForm.down('#dateOfEvaluationPicker');
        var dateVal = flatData['dateOfEvaluation'];
        if(dateVal !== null){
            var evalDate = new Date(dateVal);
            datePicker.setValue(evalDate)
        }

        // This does not work as hoped.  Attempting to display the image when he form is opened.
        var selectedImage = siteEvaluationForm.down('#selectedImage');
//        selectedImage.sethtml('<img style="display:block;" id="selectedImage" src="'+ flatData.imageUri + '" />');
//        selectedImage.setValue('<img style="display:block;" id="selectedImage" src="'+ flatData.imageUri + '" />');
        selectedImage.src = flatData.imageUri ;

        siteEvaluationForm.setValues(flatData);
        console.log('Evaluation belongsTo hierarchy:: ' + Ext.encode(flatData));

        console.log('evaluation.id:' +  ' ' + record.id);

        console.log(record.getData(true));
        console.log(record.getAssociatedData(true));
        console.log(record.$className + ' ' + record.getId())

        // open form
        siteEvaluationForm.showBy(target);


    }

});


