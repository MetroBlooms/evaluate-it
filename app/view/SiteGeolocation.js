/**
 *
 * Start, stop and store location
 * Uses Phonegap API: uses device's native GPS; select  accuracy for stop condition
 *
 * Create a list of sites for which to tie a geolocation to an address.
 * First create a SiteEvaluation model with defined fields, then create a store to contain
 * the data, finally create the list of addressesitself, which gets its filtered data (on category = 'evaluations' by regex for existing address in Main.js) from the store; when an address is selected, Google maps will show the saved geolocation in sessionstorage and then the option to write the coordinates to the record asssociated with the address is given to the user
 *
 */
Ext.define('EvaluateIt.view.SiteGeolocation', {
    extend: 'Ext.Container',
    fullscreen: true,
    alias: 'widget.siteGeolocationForm',
    config: {
        layout: 'vbox',
        items: [
            {
                flex: 1,
                xtype: 'siteGeolocationList'
            }
        ]
    }

});








