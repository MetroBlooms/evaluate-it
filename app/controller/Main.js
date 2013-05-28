/**
 * @class EvaluateIt.controller.Main
 * @extends Ext.app.Controller
 *
 * This is an abstract base class that is extended by both the phone and tablet versions. This controller is
 * never directly instantiated, it just provides a set of common functionality that the phone and tablet
 * subclasses both extend.
 */
Ext.define('EvaluateIt.controller.Main', {
    extend: 'Ext.app.Controller',

    config: {
        /**
         * @private
         */
        viewCache: [],

        refs: {
            nav: '#mainNestedList',
            main: 'mainview',
            toolbar: '#mainNavigationBar',
        },

        control: {
            sourceButton: {
                tap: 'onSourceTap'
            },
            nav: {
                itemtap: 'onNavTap'
            }
		},

        routes: {
            'option/:id/:category': 'showViewById',
            'menu/:id': 'showMenuById'
        },


        /**
         * @cfg {Ext.data.Model} currentOption The Option that is currently loaded. This is set whenever showViewById
         * is called and used by functions like onSourceTap to fetch the source code for the current option.
         */
        currentOption: undefined
    },

    /**
     * Finds a given view by ID and shows it. End-point of the "option/:id" route (viz., leaf in tree store)
     */
    showViewById: function (id, category) {
        var nav = this.getNav(),
			type,
            view = nav.getStore().getNodeById(id),
			name;

		console.log('category: ' + category);
		console.log('view ' + id);

		// if exists: get evaluator name for display
/*		var evaluators = Ext.create('EvaluateIt.store.Evaluators');

		evaluators.queryBy(function(record,id){
			evaluators = Ext.getStore(evaluators);

			name = record.get('firstName') + ' ' + record.get('lastName');
			console.log('WhoamI: ' +  name +  EvaluateIt.config.name);
		});
*/
		// control view selection based on category passed from routing call
		if (category === 'evaluations' || category === 'push') {

			console.log('what it is: ' + category);

			// create filter based on filtered use case	
			var listStore = Ext.data.StoreManager.lookup('SiteEvaluations'); 
			listStore.clearFilter();
		
			if (category === 'push') {
				console.log('we are in: ' + category);
				var pushFilter = new Ext.util.Filter({
						property: 'zipcode', // replace with actual filter when ready
						value: '55405', 
						anyMatch: false,
						caseSensitive: true,
						root: 'data'
				});
				listStore.filter(pushFilter);
			}
			if (category === 'evaluations') { 
				console.log('we are in: ' + category);
				var	evaluationFilter = new Ext.util.Filter({ 
						property: 'zipcode',  // replace with actual filter when ready
						value: '55405', 
						anyMatch: false,
						caseSensitive: true,
						root: 'data'
				});
				listStore.filter(evaluationFilter);
			}

		}
	
        console.log('view ' + id);

		this.showView(view);
        this.setCurrentOption(view);
        this.hideSheets();

    },

    /**
     * @private
     * In the kitchen sink we have a large number of dynamic views. If we were to keep all of them rendered
     * we'd risk causing the browser to run out of memory, especially on older devices. If we destroy them as
     * soon as we're done with them, the app can appear sluggish. Instead, we keep a small number of rendered
     * views in a viewCache so that we can easily reuse recently used views while destroying those we haven't
     * used in a while.
     * @param {String} name The full class name of the view to create (e.g. "EvaluateIt.view.Forms")
     * @return {Ext.Component} The component, which may be from the cache
     */
    createView: function (item) {
        var name = this.getViewName(item),
            cache = this.getViewCache(),
            ln = cache.length,
            limit = item.get('limit') || 20,
            view, i = 0, j, oldView;

        for (; i < ln; i++) {
            if (cache[i].viewName === name) {
                return cache[i];
            }
        }

        if (ln >= limit) {
            for (i = 0, j = 0; i < ln; i++) {
                oldView = cache[i];
                if (!oldView.isPainted()) {
                    oldView.destroy();
                } else {
                    cache[j++] = oldView;
                }
            }
            cache.length = j;
        }

        view = Ext.create(name);
        view.viewName = name;
        cache.push(view);
        this.setViewCache(cache);

        return view;
    },

    /**
     * @private
     * Returns the full class name of the view to construct for a given Option
     * @param {EvaluateIt.model.Option item The option
     * @return {String} The full class name of the view
     */
    getViewName: function (item) {
        var name = item.get('view') || item.get('text'),
            ns = 'EvaluateIt.view.';

        if (name == 'TouchEvents') {
            if (this.getApplication().getCurrentProfile().getName() === 'Tablet') {
                return ns + 'tablet.' + name;
            } else {
                return ns + 'phone.' + name;
            }
        } else {
            return ns + name;
        }
    },

    /**
     * we iterate over all of the floating sheet components and make sure they're hidden when we
     * navigate to a new view. This stops things like Picker overlays staying visible when you hit
     * the browser's back button
     */
    hideSheets: function () {
        Ext.each(Ext.ComponentQuery.query('sheet'), function (sheet) {
            sheet.setHidden(true);
        });
    }
});
