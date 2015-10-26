/**
 * UtilityService functions
 *
 */
Ext.define('EvaluateIt.utils.UtilityService', {
    singleton : true,
    alias : 'widget.UtilityService',
    constructor: function(config) {
        this.initConfig(config);
    },

    /**
     *
     * Assemble base url for API usage
     *
     */
    url: function(param){
        // define API endpoints
        // set via {EvaluateIt.config} in app.js

        var url =  EvaluateIt.config.protocol;

        url += EvaluateIt.config.host;

        //url += EvaluateIt.config.token;
        if (EvaluateIt.config.mode === 'test') {
            console.log('url: ' + url);
        }

        if (EvaluateIt.config.mode === 'test') {
            console.log('Service test:' + param);
        }

        if (param === 'clinical') {
            url += EvaluateIt.config.apiClinical;
        }
        if (param === 'phi') {
            url += EvaluateIt.config.apiPhi;
        }
        if (param === 'aggregate') {
            url += EvaluateIt.config.apiAggregate;
        }
        if (param === 'resource') {
            url += EvaluateIt.config.apiResource;
        }
        if (param === 'login') {
            url += EvaluateIt.config.apiLogin;
        }

        return url;
    },

    template: function(panel, store) {
        var tpl;

        // bind store to form panel
        panel.setData(store);

        // define template
        tpl = new Ext.XTemplate(
            '<tpl for=".">',
                '<div class="clinical_phi" style="padding: 0 0 10px 20px;">',
                    '<tpl if="data.lft == 1">',
                        '<p>PATIENT: {data.sid}</p>',
                        '<p>___________________</p>',
                    '</tpl>',
                    '<div class="data" style="padding: 0 0 10px 20px;">',
                        '<tpl if="data.source == \'clinical\' || data.source == \'phi\'">',
                            '<li>{data.attribute.attribute_value}: {data.value} </li>',
                        '</tpl>',
                    '</div>',
                '</div>',

                '<div class="aggregate" style="padding: 0 0 10px 20px;">',
                    '<tpl if="data.source == \'aggregate\'">',
                        '<li> sid: {data.sid} </li>',
                    '</tpl>',
                '</div>',
            '</tpl>'
        );

        // render template with store data to panel using HTML and remove mask from parent object
        panel.setHtml(tpl.apply(store));
        panel.getParent().unmask();

    }
})

