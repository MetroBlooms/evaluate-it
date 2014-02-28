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

        if (score >= 18) {
            rating = 'EG';
        } else if (score >= 14 && score < 18) {
            rating = 'GD';
        } else if (score >= 9 && score < 14) {
            rating = 'GM';
        } else if (score >= 5 && score < 9) {
            rating = 'CA';
        } else {
            rating = ''; //'';
        }

        return rating;

    },

    /**
     * Compute sum of scorecard factors
     * @return {Integer}
     */
    sum_factor_ratings: function (visualImpact,varietyAndHealth,design,maintenance,environmentalStewardship) {

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

        alert('Sum' + sum);

        return sum;
    }
})