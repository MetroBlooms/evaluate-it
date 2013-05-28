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

		//get_location();
	//	getCurrentPosition();
		
	//	function watchPosition() {
	//        // Update every 3 seconds
    //	    var options = { frequency: 3000 };
    //    	watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);            
	//	}

		/*Ext.device.Geolocation.watchPosition({
			//frequency: 3000,
			scope: this,
			callback: function(position) {
				get_location();

			//	Ext.device.Notification.show({
			//		title: 'Geolocation',
			//		message: 'GPS found.'
			//	});
			},
			failure: function() {
				Ext.device.Notification.show({
					title: 'Geolocation',
					message: 'Something went wrong.'
				});
			}
    	});*/




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
