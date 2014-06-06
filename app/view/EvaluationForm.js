/**
 * Form panel view for selecting evaluation scorecard (See EvaluateIt.view.EvaluationCriteria for criteria)
 * Binds to model and store in EvaluateIt.controller.Evaluation
 *
 * TODO: set height/width for tablet, rename alias, etc. to fit normalized model: EvaluateIt.model.EvaluationScorecard
 */

Ext.define('EvaluateIt.view.EvaluationForm', {
//var formPanel = Ext.define('EvaluateIt.view.EvaluationForm', {
// TODO: Not sure why this was implemented like this?
// Need to determine (may have something to do with a destroy issued later)
	extend: 'Ext.form.Panel',
	alias : 'widget.evaluationForm',
	requires: [
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Number',
        'Ext.field.Select',
        'Ext.field.Hidden'
    ],
	config: {


        // We give it a left and top property to make it floating by default

		left: 0,
		top: 0,

        /**
         * Make it modal so you can click the mask to hide the overlay
         */
		modal: true,
		hideOnMaskTap: true,

        /**
         * Set the width and height of the panel
         */
		width: Ext.os.deviceType == 'Phone' ?  screen.width : 350,
		height: Ext.os.deviceType == 'Phone' ?  screen.height : 500,
		scrollable: true,
	 	layout: {
			type: 'vbox'
		},
		defaults: {
			margin: '0 0 5 0',
			labelWidth: '50%',
			labelWrap: true
		},

        /**
         * @cfg
         *
         * BMP evaluation items as per evaluation rules on instrument
         *
         * TODO: create enumeration
         */
		items: [
			{
                xtype: 'datepickerfield',
                destroyPickerOnHide: true,
                //name : 'dateOfEvaluation',
                itemId : 'dateOfEvaluation',
                label: 'Date of evaluation',
                placeHolder: 'mm/dd/yyyy',
                //dateFormat: 'm/d/Y',
                value: new Date(),
                //picker: {
                //    yearFrom: 2014
                //}
                picker: {
                    useTitles: true,
                    slotOrder: [
                        'day',
                        'month',
                        'year'
                    ]
                }
            },
            {
                xtype: 'textfield',
                name: 'comments',
                label: 'Comments',
                itemId: 'comments'
            },
            {
                xtype: 'checkboxfield',
                name: 'noLongerExists',
                label: 'NoLongerExists',
                itemId: 'noLongerExists'
            },
            {
                xtype: 'hiddenfield',
                name: 'imageUri',
                itemId: 'imageId'
            },
            {
                xtype: 'button',
                itemId: 'siteImage',
                text: 'Select Photo'
            },
            {
                html: 'Selected image:<img style="display:none;" id="selectedImage" src="" />'
            },
           	{
				xtype: 'button',
				itemId: 'save',
				text: 'Save'
			},
            {
                xtype: 'button',
                itemId: 'cancel',
                text: 'Cancel'
            }

        ]
    }

});
