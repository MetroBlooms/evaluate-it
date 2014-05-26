/**
 * Form panel view for selecting collecting evaluation attributes (See EvaluateIt.view.EvaluationCriteria for criteria)
 * Binds to model and store in EvaluateIt.controller.Evaluation
 *
 *
 * TODO: set height/width for tablet, rename alias, etc. to fit normalized model: EvaluateIt.model.Site and EvaluateIt.model.Address
 */
Ext.define('EvaluateIt.view.SiteForm', {
    extend: 'Ext.form.Panel',
    alias : 'widget.siteForm',
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

        // Make it modal so you can click the mask to hide the overlay
        modal: true,
        hideOnMaskTap: true,

        // Set the width and height of the panel
        width: Ext.os.deviceType == 'Phone' ?  screen.width : screen.width,
        height: Ext.os.deviceType == 'Phone' ?  screen.height : screen.height,
        scrollable: true,
        layout: {
            type: 'vbox'
        },
        defaults: {
            margin: '0 0 5 0',
            labelWidth: '45%',
            labelWrap: true
        },

        /**
         * @cfg
         *
         * General controls for Site, Address model entry
         *
         * TODO: create enumeration
         */
        items: [
            {
                xtype: 'textfield',
                name: 'address',
                label: 'Address',
                itemId: 'address'
            },
            {
                xtype: 'textfield',
                name: 'city',
                label: 'City',
                itemId: 'city'
            },
            {
                xtype: 'textfield',
                name: 'state',
                label: 'State',
                itemId: 'state'
            },
            {
                xtype: 'textfield',
                name: 'zipcode',
                label: 'Zipcode',
                itemId: 'zipcode'
            },
            {
                xtype: 'textfield',
                name: 'neighborhood',
                label: 'Neighborhood',
                itemId: 'neighborhood'
            },
            {
                xtype: 'textfield',
                name: 'county',
                label: 'County',
                itemId: 'county'
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
