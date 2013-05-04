Ext.define('EvaluateIt.profile.Phone', {
    extend: 'EvaluateIt.profile.Base',
	requires: ['EvaluateIt.controller.GeolocationMaster'],

    config: {
        controllers: ['Main'],
        views: ['Main', 'TouchEvents']
    },

    isActive: function() {
        return Ext.os.is.Phone; // || Ext.os.is.Desktop;
    },

    launch: function() {

		//Wait for PhoneGap to load
		//document.addEventListener("deviceready", onDeviceReady, false);
	
		// wait till Phonegap has loaded
		//function onDeviceReady() {

		//	alert('Device hath phyred!'); 
		//	get_location();

		//}

        Ext.create('EvaluateIt.view.phone.Main');

        this.callParent();
    }
});
