Ext.define('EvaluateIt.profile.Tablet', {
    extend: 'EvaluateIt.profile.Base',

    config: {
        controllers: ['Main'],
        views: ['Main', 'TouchEvents']
    },

    isActive: function() {
        return Ext.os.is.Tablet || Ext.os.is.Desktop;
    },

    launch: function() {

        Ext.create('EvaluateIt.view.tablet.Main');

        this.callParent();
    }
});
