/**
 * Self firing function with menu structure of app using tree store data structure
 * Roots are defined by function; leaves are end points for navigating to specified views
 *
**/
(function () {

    var root = {
        id: 'root',
        text: 'EvaluateIt!',
        items: [
            {
                text: 'REST Management',
                id: 'ui',
                cls: 'launchscreen',
                items: [
                    {
                        text: 'TestRest',
                        leaf: true,
                        id: 'pull'
                    },
                    {
                        text: 'SetEnvironment',
                        leaf: true,
                        id: 'setEnvironment'
                    }
                ]
            }
        ]
    };
 
    Ext.define('EvaluateIt.store.Options', {
        alias: 'store.Options',
        extend: 'Ext.data.TreeStore',
        requires: ['EvaluateIt.model.Option'],

        config: {
            model: 'EvaluateIt.model.Option',
            root: root,
            defaultRootProperty: 'items'
        }
    });
})();
