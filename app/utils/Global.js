/**
 * Global functions
 *
 */
Ext.define('EvaluateIt.utils.Global', {
    singleton : true,
    alias : 'widget.global',
    constructor: function(config) {
        this.initConfig(config);
    },

    /**
     *
     * Rating based on Metro Blooms evaluation form
     * @param score
     * @returns {String}
     */
    evaluation_rating: function(param){
        alert(param);
        var rating;

        if (param >= 18) {
            rating = 'EG';
        } else if (param >= 14 && param < 18) {
            rating = 'GD';
        } else if (param >= 9 && param < 14) {
            rating = 'GM';
        } else if (param >= 5 && param < 9) {
            rating = 'CA';
        } else {
            rating = ''; //'';
        }

        return rating;

    },

    /**
     * Compute sum of scorecard factors
     * @return {Integer}
     *
     * TODO: variable list of parameters as per design pattern:
     *
     * obj = {
			var: withValue
		};
     *
     * obj = {
			var: null
		};
     *
     *
     */
    sum_factor_ratings: function(visualImpact,varietyAndHealth,design,maintenance,environmentalStewardship) {

        var sum;
        /**
         * Ensure all values are integers first before summing
         * over them
         */

        sum = parseInt(visualImpact) +
            parseInt(varietyAndHealth) +
            parseInt(design) +
            parseInt(maintenance) +
            parseInt(environmentalStewardship);

        return sum;
    },

    /**
     *
     * awards based on Metro Blooms evaluation form
     *
     * @param param
     * @returns {{bestof: string, nate_seigel: number}}
     *
     * TODO: implement as enumeration object
     */
    evaluation_award: function (param) {

        var nate_siegel = 0,
            bestof;

        switch (param) {
            case 1:
                bestof = 'Boulevard Garden';
                break;
            case 2:
                bestof = 'Business Garden or Raingarden';
                break;
            case 3:
                bestof = 'Container/WindowBox Garden';
                break;
            case 4:
                bestof = 'Congregation Garden or Raingarden';
                break;
            case 5:
                bestof = 'Residential Garden or Raingarden';
                break;
            case 6:
                bestof = 'Alley Garden';
                break;
            case 7:
                bestof = 'Public & Schoolyard Garden or Raingarden';
                break;
            case 8:
                bestof = 'NateSiegel';
                nate_siegel = 1;
                break;
            case 9:
                bestof = 'Special';
                break;
            default:
                bestof = null;
                break;
        }

        return {
            'bestof': bestof,
            'nate_seigel': nate_siegel
        };
    },

    /**
     * Phonegap GPS API hook, fired on start location watch
     * @return {Object} Callback options
     */
     get_position: function() {

        var options = { frequency: 10000, enableHighAccuracy: true };
        watchID = navigator.geolocation.watchPosition(geo_success, geo_error, options);

    },

    /**
     * Phonegap API hook, fired on stop location watch
     */
    clear_watch: function() {

        if (watchID != null) {
            navigator.geolocation.clearWatch(watchID);
            watchID = null;
            alert('GPS stopped!');
        }
    },

    /**
     * onSuccess Callback receives PositionSuccess object and writes to sessionStorage
     * @return {Object} Position coordinates
     *
     * TODO: User selected accuracy
     */
    geo_success: function (position) {
        var coordinates = position.coords,
            location = 'Longitude ' + coordinates.longitude + ' Latitude ' + coordinates.latitude + ' Accuracy ' + coordinates.accuracy,
            timeStamp = new Date(position.timestamp),
            latitude = coordinates.latitude,
            longitude =  coordinates.longitude,
            accuracy = coordinates.accuracy;

        alert('watching position...' + ' accuracy is ' + accuracy);
        console.log(' accuracy ' + accuracy);

        // Success achieved when desired accuracy reached
        if (accuracy <= 10) {
            alert('success! geoLocation is ready to use!' + ' accuracy ' + accuracy);

            // Write to sessionStorage for update to Geolocation model
            sessionStorage.latitude = latitude;
            sessionStorage.longitude = longitude;
            sessionStorage.accuracy = accuracy;
            sessionStorage.timeStamp = timeStamp;

            clearWatch(watchID);
        }

    },

    /**
     * onError Callback receives a PositionError object
     * @return {Alert}
     */
    geo_error: function(error) {
        alert('Geoposition error!' );
    }


})


