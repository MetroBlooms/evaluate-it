/**
 * Global functions
 *
 */
Ext.define('EvaluateIt.utils.UtilityService', {
    singleton : true,
    alias : 'widget.utility',
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
        console.log(param);
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
     * Phonegap GPS API, fired on start location watch
     * @return {Object} Callback options
     */
    get_position: function (record) {

        var options = {frequency: 10000, enableHighAccuracy: true};
        watchID = navigator.geolocation.watchPosition(geo_success, geo_error, options);

        /**
         * onSuccess Callback receives PositionSuccess object and writes to sessionStorage/localStorage
         * @return {Object} Position coordinates
         *
         */

        function geo_success (position) {

            var coordinates = position.coords,
                timeStamp = new Date(position.timestamp),
                latitude = coordinates.latitude,
                longitude =  coordinates.longitude,
                accuracy = coordinates.accuracy;

            alert('Position accuracy is ' + accuracy);
            console.log(' accuracy ' + accuracy);

            // Success achieved when desired accuracy reached
            if (accuracy <= EvaluateIt.config.accuracy) {

                // Write to sessionStorage for use in Google maps
                sessionStorage.latitude = latitude;
                sessionStorage.longitude = longitude;
                sessionStorage.accuracy = accuracy;
                sessionStorage.timeStamp = timeStamp;

                navigator.geolocation.clearWatch(watchID);

                record.set('latitude',latitude);
                record.set('longitude',longitude);
                record.set('accuracy',accuracy);
                record.set('timeStamp',timeStamp);
                Ext.getStore('Geolocations').sync();
                alert('Success! Location has been set with an accuracy of:' + accuracy);
            }
        }

        /**
         * onError Callback receives a PositionError object
         * @return {Alert}
         */
        function geo_error (error) {
            alert('Geoposition error!' );
        }

    },

    /**
     * Phonegap API, fired on stop location watch
     */
    clear_watch: function  () {

        if (watchID != null) {
            navigator.geolocation.clearWatch(watchID);
            watchID = null;
            alert('GPS stopped!');
        }
    }

})


