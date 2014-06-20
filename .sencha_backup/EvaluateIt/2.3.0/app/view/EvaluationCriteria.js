/**
 * Static list of criteria used to evaluate raingarden BMP.
 */
Ext.define('EvaluateIt.view.EvaluationCriteria', {
    extend: 'Ext.Container',
    requires: [
        'Ext.dataview.NestedList',
        'Ext.navigation.Bar'
    ],

    config: {
        fullscreen: true,

        layout: {
            type: 'card',
            animation: {
                type: 'slide',
                direction: 'left',
                duration: 250
            }
        },

        /**
         * @cfg {html}
         * List evaluation factors
         * with criteria for evaluation
         * with criteria for evaluation
         */
        items: [
            {
                id: 'launchscreen',
                cls : 'card',
                scrollable: true,
                html: '<div><h2>Visual Impact:</h2>' +
                    '<p>Use of color and/or texture, captures the eye, unique features</p></div>' +
                    '<div><h2>Plant variety and health:</h2>' +
                    '<p>Perennials, natives, pollinators, trees, shrubs, seasonal interest, plants well suited to location and thriving</p></div>' +
                    '<div><h2>Design:</h2><p>Composition compliments surroundings, balance, creativity</p>' +
                    '</div><div><h2>Maintenance</h2>' +
                    '<p>Weeded, appropriately deadheaded and mulched, tidy edges, no bare soil, no standing water - unless rain in the last 48 hrs</p></div>' +
                    '<div><h2>Environmental Stewardship:</h2>' +
                    '<p>Turf reduction, plants beneficial to wildlife and conserve inputs, redirected downspouts, concave boulevard, rain barrel, raingarden, permeable pavers, compost bin, etc.</p></div>' +
                    '<footer>evaluate-it.org 2014 - <a href="http://metroblooms.org" target="blank"> Metro Blooms</a></footer>'
			},
            {
                id: 'mainNavigationBar',
                xtype : 'titlebar',
                docked: 'top',
                title : 'EvaluateIt!'
            }
        ]
    }
});
