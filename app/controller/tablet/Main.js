/**
 * @class EvaluateIt.controller.tablet.Main
 * @extends EvaluateIt.controller.Main
 *
 * This is the Main controller subclass for the 'tablet' profile. Almost all of the functionality is implemented in the
 * superclass, here we just define showView, which is the function that is called whenever any view is navigated to via
 * the navigation NestedList or a url change.
 */
Ext.define('EvaluateIt.controller.tablet.Main', {
    extend: 'EvaluateIt.controller.Main',

    /**
     * This is called whenever the user taps on an item in the main navigation NestedList
     */
    onNavTap: function(nestedList, list, index) {
        // Note: does not get store isntance, but instead gets model instance for hash change routing
		var record = list.getStore().getAt(index);

        if (record.isLeaf()) {
			
			// append category parameter for use in selection of proper view to render in route through use of filter 
			console.log('url to route: ' + ' ' + record.toUrl() + '\/' + record.get('category'));
            record =  record.toUrl() + '\/' + record.get('category'); 			
			
			// call route with model instance name and parameters
			this.redirectTo(record);
        }
    },

    /**
     * For a given Option model instance, shows the appropriate view. This is the endpoint for all routes matching
     * 'option/:id', so is called automatically whenever the user navigates back or forward between options.
     * @param {EvaluateIt.model.Option} item The Option model instance for which we want to show a view
     */
    showView: function(item) {
        var nav  = this.getNav(),
            view = this.createView(item),
            main = this.getMain(),
            anim = item.get('animation'),
            layout  = main.getLayout(),
            initialAnim = layout.getAnimation(),
            newAnim;

        if (anim) {
            layout.setAnimation(anim);
            newAnim = layout.getAnimation();
        }

        nav.setDetailContainer(main);
        nav.setDetailCard(view);
        nav.goToNode(item.parentNode);
        nav.goToLeaf(item);
        nav.getActiveItem().select(item);

        if (newAnim) {
            newAnim.on('animationend', function() {
                layout.setAnimation(initialAnim);
            }, this, { single: true });
        }

		console.log('title: ' + item.get('text'));

        this.getToolbar().setTitle(item.get('text'));
        // this.getSourceButton().setHidden(false); commented out
//        nav.goToNode(item.parentNode);
//        nav.goToLeaf(item);
//    },
//
//    /**
//     * This is how the view above should look once the animation is fixed
//     */
//    XshowView: function(item) {
//        var nav  = this.getNav(),
//            view = this.createView(this.getViewName(item));
//
//        nav.setDetailCard(view);
//        nav.goToNode(item.parentNode);
//        nav.goToLeaf(item);
//        nav.getCurrentList().select(item);
//
//        this.getToolbar().setTitle(item.get('text'));
//        this.getSourceButton().setHidden(false);
//    },
//
//    /**
//     * Ideally, even that could be reduced to this by implementing an ensureVisible function onto List
//     * and NestedList
//     */
//    XshowView: function(item) {
//        var nav = this.getNav();
//
//        nav.ensureVisible(item);
//        nav.setDetailCard(this.createOptionView(item));
//
//        this.getToolbar().setTitle(item.get('text'));
//        this.getSourceButton().setHidden(false);
    },

    showMenuById: Ext.emptyFn
});
