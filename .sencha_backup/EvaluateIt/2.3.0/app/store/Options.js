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
                text: 'Manage Evaluations',
                id: 'ui',
                cls: 'launchscreen',
                items: [
					{
                        text: 'SiteGeneral',
                        leaf: true,
                        id: 'siteGeneral',
            			category: 'evaluations'
                    }, 
                    {
                        text: 'Evaluation',
                        leaf: true,
                        id: 'evaluation',
            			category: 'evaluations'
                    },
					{
                        text: 'EvaluationAward',
                        leaf: true,
                        id: 'evaluationAward',
            			category: 'evaluations'
                    },  
					{
                        text: 'Geoposition',
                        leaf: true,
                        id: 'geoposition'
                    },
                    {
                        text: 'SiteGeolocation',
                        leaf: true,
                        id: 'siteGeolocation',
            			category: 'evaluations'
                    },
                    {
                        text: 'EvaluationCriteria',
                        leaf: true,
                        id: 'evaluationCriteria'
                    }
		
                ]
            }
        ]
    };
 
    root.items.push({ 
        text: 'Manage Data',
        id: 'data',
		card: false,
        items: [
			// GET remote
			{
                text: 'Pull',
                leaf: true,
                id: 'pull'
            },
			// POST data to remote
		 	{
                text: 'Push',
                leaf: true,
                id: 'push',
				category: 'push'
            },
			// clear data store
			{
                text: 'ClearAll',
                leaf: true,
                id: 'clearAll'
            },
			{
                text: 'RemoveRecord',
                leaf: true,
                id: 'removeRecord'
            }
        ]
    });

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
