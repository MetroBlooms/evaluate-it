Ext.define('EvaluateIt.view.tablet.Main', {
    extend: 'Ext.Container',
    xtype: 'mainview',

    requires: [
        'Ext.dataview.NestedList',
        'Ext.navigation.Bar'
    ],

    config: {
        fullscreen: true,

        layout: {
            type: 'card',
            animation: {
                type: 'slide',
                direction: 'left',
                duration: 250
            }
        },

        items: [
            {
                id: 'launchscreen',
                cls : 'card',
                scrollable: true,
           		html: '<div><h2>Welcome to the wonderful EvaluateIt!</h2></div>'
			},
            {
                id: 'mainNestedList',
                xtype : 'nestedlist',
                useTitleAsBackText: false,
                docked: 'left',
                width : 250,
                store: 'Options'
            },
            {
                id: 'mainNavigationBar',
                xtype : 'titlebar',
                docked: 'top',
                title : 'EvaluateIt!'
            }
        ]
    }
});
