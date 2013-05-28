Ext.define('EvaluateIt.view.phone.Main', {
    extend: 'Ext.dataview.NestedList',
    requires: ['Ext.TitleBar'],

    id: 'mainNestedList',

    config: {
        fullscreen: true,
        title: 'EvaluateIt!',
        useTitleAsBackText: false,
        layout: {
            animation: {
                duration: 250,
                easing: 'ease-in-out'
            }
        },

        store: 'Options',

        toolbar: {
            id: 'mainNavigationBar',
            xtype : 'titlebar',
            docked: 'top',
            title : 'EvaluateIt!',

        }
    }
});
