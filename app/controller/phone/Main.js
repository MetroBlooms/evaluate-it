/**
 * @class EvaluateIt.controller.phone.Main
 * @extends EvaluateIt.controller.Main
 *
 * This is the Main controller subclass for the 'phone' profile. Most of the functionality required for this controller
 * is provided by the EvaluateIt.controller.Main superclass, but we do need to add a couple of refs and control
 * statements to provide a slightly different behavior for the phone.
 *
 * The Main superclass provides a couple of capabilities that we use here. Firstly it sets up a listener on the main
 * navigation NestedList and redirects to the appropriate url for each view. For example, tapping on the 'Forms' item
 * in the list will redirect to the url 'options/forms'.
 *
 * Secondly, it sets up a route that listens for urls in the form above and calls the controller's showView function
 * whenever one is detected. The showView function then just shows the appropriate view on the screen.
 *
 */
Ext.define('EvaluateIt.controller.phone.Main', {
    extend: 'EvaluateIt.controller.Main',

    config: {
        refs: {
            touchEvents: 'touchevents',
            consoleButton: 'button[action=showConsole]'
        },

        control: {
            nav: {
                back: 'onBackTap'
            },
            consoleButton: {
                tap: 'showTouchEventConsole'
            }
        }
    },

    /**
     * This is called whenever the user taps on an item in the main navigation NestedList
     */
    onNavTap: function(nestedList, list, index) {
        var record = list.getStore().getAt(index);

		console.log('bbb ' + record);

        if (record.isLeaf()) {
			// append category parameter for use in selection of proper view to render in route through use of filter 
			console.log('url to route: ' + ' ' + record.toUrl() + '\/' + record.get('category'));
            record =  record.toUrl() + '\/' + record.get('category'); 			
            this.redirectTo(record);

        } else {
            this.getApplication().getHistory().add(Ext.create('Ext.app.Action', {
                url: 'menu/' + record.get('id')
            }));
        }
    },

    /**
     * In the Phone Profile only we support routing through to a menu page (urls like "menu/ui"). This function
     * just sets everything up to show that menu
     */
    showMenuById: function(id) {
        var nav  = this.getNav(),
            store = nav.getStore(),
            item = id == 'root' ? store.getRoot() : store.getNodeById(id);

        if (item) {
            nav.goToNode(item);
            this.getToolbar().setTitle(item.get('text'));

            //this.getSourceOverlay().setHidden(true); commented out!!
            this.hideSheets();
        }
    },

    /**
     * For a given Option model instance, shows the appropriate view. This is the endpoint for all routes matching
     * 'option/:id', so is called automatically whenever the user navigates back or forward between options.
     * @param {EvaluateIt.model.Option} item The Option model instance for which we want to show a view
     */
    showView: function(item) {
        var nav    = this.getNav(),
            title  = item.get('text'),
            view   = this.createView(item),
            layout = nav.getLayout(),
            anim   = item.get('animation'),
            initialAnim = layout.getAnimation(),
            newAnim;

		// if exists: get evaluator name for display
		/*var evaluators = Ext.create('EvaluateIt.store.Evaluators');

		evaluators.queryBy(function(record,id){
			evaluators = Ext.getStore(evaluators);

			if (evaluators.getCount() > 0) {
				name = record.get('firstName') + ' ' + record.get('lastName');

				//title = title + ' - ' + name
				//alert('WhoamI: '  + title);
			}
		});*/
		
		

		console.log('title: ' + title);

        if (anim) {
            layout.setAnimation(anim);
            newAnim = layout.getAnimation();
        }

        nav.setDetailCard(view);
        nav.goToNode(item.parentNode);
        nav.goToLeaf(item);

        if (newAnim) {
            newAnim.on('animationend', function() {
                layout.setAnimation(initialAnim);
            }, this, { single: true });
        }

        this.getToolbar().setTitle(title);
        //this.getSourceButton().setHidden(false);
    },

    /**
     * This is called whenever the user hits the Back button on the main navigation NestedList. It hides the
     * "View Source" button as we do no want to see that when we are in the NestedList itself
     */
    onBackTap: function(nestedList, node) {

		console.log('We are back tappin!');
        //this means we just hit back out of a detail card
        //if (node.isLeaf()) {
            //this.getSourceButton().setHidden(true);
        //}

        this.getApplication().getHistory().add(Ext.create('Ext.app.Action', {
            url: 'menu/' + node.parentNode.get('id')
        }), true);
    },

    /**
     * This is called whenever the user hits the 'Console' button on the TouchEvents view. It just makes sure
     * that the view is showing the console card.
     */
    showTouchEventConsole: function(button) {
        this.getTouchEvents().showConsole();
    }
});
