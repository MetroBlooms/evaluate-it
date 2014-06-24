/**
 * Controls assignment of coordinates to location
 * uses Google Maps API
 *
 */
Ext.define('EvaluateIt.controller.SiteGeolocation', {
	extend : 'Ext.app.Controller',
	requires: ['Ext.Toolbar'],

	config: {
		profile: Ext.os.deviceType.toLowerCase(),
  		stores : ['Sites','Addresses','Geolocations'],
  		models : ['Site','Address','Geolocation'],
  		refs: {
   			mySiteGeolocationList: 'siteGeolocationList'
  		},
		control: {
			'siteGeolocationList': {
				activate: 'onActivate',
				itemtap: 'onSelectSiteGeolocation'
			}
		}	  

 	},

	onActivate: function() {
  		console.log('Main container is active');
 	},


	// spawns a new form panel with Google map centered on current location 
	onSelectSiteGeolocation: function(view, index, target, record, event) {

        sessionStorage.latitude = 44;
        sessionStorage.longitude = -93;

        console.log('Selected a Geolocation from the list');

        // set cooordinates to current position
        EvaluateIt.utils.UtilityService.get_position(record);

        // initialize geo_panel components
        var panelOption = 1;
        EvaluateIt.utils.UtilityService.map_panel(record,panelOption);

	}


});





