Ext.define('EvaluateIt.profile.Phone', {
    extend: 'EvaluateIt.profile.Base',

    config: {
        controllers: ['Main'],
        views: ['Main', 'TouchEvents']
    },

    isActive: function() {
        return Ext.os.is.Phone; // || Ext.os.is.Desktop;
    },

    launch: function() {
        Ext.create('EvaluateIt.view.phone.Main');

        this.callParent();
    }
});
