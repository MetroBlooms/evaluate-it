Ext.data.JsonP.Ext_event_Touch({"tagname":"class","name":"Ext.event.Touch","autodetected":{"aliases":true,"alternateClassNames":true,"extends":true,"mixins":true,"requires":true,"uses":true,"members":true,"code_type":true},"files":[{"filename":"Touch.js","href":"Touch2.html#Ext-event-Touch"}],"private":true,"aliases":{},"alternateClassNames":[],"extends":"Ext.event.Dom","mixins":[],"requires":["Ext.util.Point"],"uses":[],"members":[{"name":"distance","tagname":"property","owner":"Ext.event.Dom","id":"property-distance","meta":{}},{"name":"pageX","tagname":"property","owner":"Ext.event.Dom","id":"property-pageX","meta":{}},{"name":"pageY","tagname":"property","owner":"Ext.event.Dom","id":"property-pageY","meta":{}},{"name":"target","tagname":"property","owner":"Ext.event.Dom","id":"property-target","meta":{}},{"name":"constructor","tagname":"method","owner":"Ext.event.Touch","id":"method-constructor","meta":{}},{"name":"cloneTouches","tagname":"method","owner":"Ext.event.Touch","id":"method-cloneTouches","meta":{"private":true}},{"name":"getPageX","tagname":"method","owner":"Ext.event.Dom","id":"method-getPageX","meta":{"deprecated":{"text":"<p>Please use <a href=\"#!/api/Ext.event.Dom-property-pageX\" rel=\"Ext.event.Dom-property-pageX\" class=\"docClass\">pageX</a> property directly.</p>\n","version":"2.0"}}},{"name":"getPageY","tagname":"method","owner":"Ext.event.Dom","id":"method-getPageY","meta":{"deprecated":{"text":"<p>Please use <a href=\"#!/api/Ext.event.Dom-property-pageX\" rel=\"Ext.event.Dom-property-pageX\" class=\"docClass\">pageX</a> property directly.</p>\n","version":"2.0"}}},{"name":"getTarget","tagname":"method","owner":"Ext.event.Dom","id":"method-getTarget","meta":{}},{"name":"getTime","tagname":"method","owner":"Ext.event.Dom","id":"method-getTime","meta":{}},{"name":"getXY","tagname":"method","owner":"Ext.event.Dom","id":"method-getXY","meta":{"deprecated":{"text":"<p>Please use the <a href=\"#!/api/Ext.event.Dom-property-pageX\" rel=\"Ext.event.Dom-property-pageX\" class=\"docClass\">pageX</a> and <a href=\"#!/api/Ext.event.Dom-property-pageY\" rel=\"Ext.event.Dom-property-pageY\" class=\"docClass\">pageY</a> properties directly.</p>\n","version":"2.0"}}},{"name":"makeUnpreventable","tagname":"method","owner":"Ext.event.Dom","id":"method-makeUnpreventable","meta":{"private":true}},{"name":"preventDefault","tagname":"method","owner":"Ext.event.Dom","id":"method-preventDefault","meta":{}},{"name":"setDelegatedTarget","tagname":"method","owner":"Ext.event.Dom","id":"method-setDelegatedTarget","meta":{"private":true}}],"code_type":"ext_define","id":"class-Ext.event.Touch","component":false,"superclasses":["Ext.event.Dom"],"subclasses":[],"mixedInto":["Ext.event.Event"],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'><a href='#!/api/Ext.event.Dom' rel='Ext.event.Dom' class='docClass'>Ext.event.Dom</a><div class='subclass '><strong>Ext.event.Touch</strong></div></div><h4>Requires</h4><div class='dependency'><a href='#!/api/Ext.util.Point' rel='Ext.util.Point' class='docClass'>Ext.util.Point</a></div><h4>Mixed into</h4><div class='dependency'><a href='#!/api/Ext.event.Event' rel='Ext.event.Event' class='docClass'>Ext.event.Event</a></div><h4>Files</h4><div class='dependency'><a href='source/Touch2.html#Ext-event-Touch' target='_blank'>Touch.js</a></div></pre><div class='doc-contents'><div class='rounded-box private-box'><p><strong>NOTE:</strong> This is a private utility class for internal use by the framework. Don't rely on its existence.</p></div><p>Touch event.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-distance' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.event.Dom' rel='Ext.event.Dom' class='defined-in docClass'>Ext.event.Dom</a><br/><a href='source/Dom.html#Ext-event-Dom-property-distance' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.event.Dom-property-distance' class='name expandable'>distance</a> : Number<span class=\"signature\"></span></div><div class='description'><div class='short'>The distance of the event. ...</div><div class='long'><p>The distance of the event.</p>\n\n<p><strong>This is only available when the event type is <code>swipe</code> and <code>pinch</code>.</strong></p>\n</div></div></div><div id='property-pageX' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.event.Dom' rel='Ext.event.Dom' class='defined-in docClass'>Ext.event.Dom</a><br/><a href='source/Dom.html#Ext-event-Dom-property-pageX' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.event.Dom-property-pageX' class='name expandable'>pageX</a> : Number<span class=\"signature\"></span></div><div class='description'><div class='short'><p>The browsers x coordinate of the event.</p>\n</div><div class='long'><p>The browsers x coordinate of the event.</p>\n</div></div></div><div id='property-pageY' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.event.Dom' rel='Ext.event.Dom' class='defined-in docClass'>Ext.event.Dom</a><br/><a href='source/Dom.html#Ext-event-Dom-property-pageY' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.event.Dom-property-pageY' class='name expandable'>pageY</a> : Number<span class=\"signature\"></span></div><div class='description'><div class='short'><p>The browsers y coordinate of the event.</p>\n</div><div class='long'><p>The browsers y coordinate of the event.</p>\n</div></div></div><div id='property-target' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.event.Dom' rel='Ext.event.Dom' class='defined-in docClass'>Ext.event.Dom</a><br/><a href='source/Dom.html#Ext-event-Dom-property-target' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.event.Dom-property-target' class='name expandable'>target</a> : HTMLElement<span class=\"signature\"></span></div><div class='description'><div class='short'>The target HTMLElement for this event. ...</div><div class='long'><p>The target HTMLElement for this event. For example; if you are listening to a tap event and you tap on a <code>&lt;div&gt;</code> element,\nthis will return that <code>&lt;div&gt;</code> element.</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.event.Touch'>Ext.event.Touch</span><br/><a href='source/Touch2.html#Ext-event-Touch-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/Ext.event.Touch-method-constructor' class='name expandable'>Ext.event.Touch</a>( <span class='pre'>event, info, map, list</span> ) : <a href=\"#!/api/Ext.event.Touch\" rel=\"Ext.event.Touch\" class=\"docClass\">Ext.event.Touch</a><span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>event</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>info</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>map</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>list</span> : Object<div class='sub-desc'></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Ext.event.Touch\" rel=\"Ext.event.Touch\" class=\"docClass\">Ext.event.Touch</a></span><div class='sub-desc'>\n</div></li></ul><p>Overrides: <a href=\"#!/api/Ext.event.Dom-method-constructor\" rel=\"Ext.event.Dom-method-constructor\" class=\"docClass\">Ext.event.Dom.constructor</a></p></div></div></div><div id='method-cloneTouches' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.event.Touch'>Ext.event.Touch</span><br/><a href='source/Touch2.html#Ext-event-Touch-method-cloneTouches' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.event.Touch-method-cloneTouches' class='name expandable'>cloneTouches</a>( <span class='pre'>touches, map</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>touches</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>map</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-getPageX' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.event.Dom' rel='Ext.event.Dom' class='defined-in docClass'>Ext.event.Dom</a><br/><a href='source/Dom.html#Ext-event-Dom-method-getPageX' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.event.Dom-method-getPageX' class='name expandable'>getPageX</a>( <span class='pre'></span> ) : Number<span class=\"signature\"><span class='deprecated' >deprecated</span></span></div><div class='description'><div class='short'>Gets the x coordinate of the event. ...</div><div class='long'><p>Gets the x coordinate of the event.</p>\n        <div class='rounded-box deprecated-box deprecated-tag-box'>\n        <p>This method has been <strong>deprected</strong> since 2.0</p>\n        <p>Please use <a href=\"#!/api/Ext.event.Dom-property-pageX\" rel=\"Ext.event.Dom-property-pageX\" class=\"docClass\">pageX</a> property directly.</p>\n\n        </div>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Number</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getPageY' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.event.Dom' rel='Ext.event.Dom' class='defined-in docClass'>Ext.event.Dom</a><br/><a href='source/Dom.html#Ext-event-Dom-method-getPageY' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.event.Dom-method-getPageY' class='name expandable'>getPageY</a>( <span class='pre'></span> ) : Number<span class=\"signature\"><span class='deprecated' >deprecated</span></span></div><div class='description'><div class='short'>Gets the y coordinate of the event. ...</div><div class='long'><p>Gets the y coordinate of the event.</p>\n        <div class='rounded-box deprecated-box deprecated-tag-box'>\n        <p>This method has been <strong>deprected</strong> since 2.0</p>\n        <p>Please use <a href=\"#!/api/Ext.event.Dom-property-pageX\" rel=\"Ext.event.Dom-property-pageX\" class=\"docClass\">pageX</a> property directly.</p>\n\n        </div>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Number</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getTarget' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.event.Dom' rel='Ext.event.Dom' class='defined-in docClass'>Ext.event.Dom</a><br/><a href='source/Dom.html#Ext-event-Dom-method-getTarget' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.event.Dom-method-getTarget' class='name expandable'>getTarget</a>( <span class='pre'>[selector], [maxDepth], [returnEl]</span> ) : HTMLElement<span class=\"signature\"></span></div><div class='description'><div class='short'>Gets the target for the event. ...</div><div class='long'><p>Gets the target for the event. Unlike <a href=\"#!/api/Ext.event.Dom-property-target\" rel=\"Ext.event.Dom-property-target\" class=\"docClass\">target</a>, this returns the main element for your event. So if you are\nlistening to a tap event on <a href=\"#!/api/Ext.Viewport-property-element\" rel=\"Ext.Viewport-property-element\" class=\"docClass\">Ext.Viewport.element</a>, and you tap on an inner element of <a href=\"#!/api/Ext.Viewport-property-element\" rel=\"Ext.Viewport-property-element\" class=\"docClass\">Ext.Viewport.element</a>, this will\nreturn <a href=\"#!/api/Ext.Viewport-property-element\" rel=\"Ext.Viewport-property-element\" class=\"docClass\">Ext.Viewport.element</a>.</p>\n\n<p>If you want the element you tapped on, then use <a href=\"#!/api/Ext.event.Dom-property-target\" rel=\"Ext.event.Dom-property-target\" class=\"docClass\">target</a>.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>selector</span> : String (optional)<div class='sub-desc'><p>A simple selector to filter the target or look for an ancestor of the target</p>\n</div></li><li><span class='pre'>maxDepth</span> : Number/Mixed (optional)<div class='sub-desc'><p>The max depth to\nsearch as a number or element (defaults to 10 || document.body)</p>\n<p>Defaults to: <code>10||document.body</code></p></div></li><li><span class='pre'>returnEl</span> : Boolean (optional)<div class='sub-desc'><p><code>true</code> to return a <a href=\"#!/api/Ext.dom.Element\" rel=\"Ext.dom.Element\" class=\"docClass\">Ext.Element</a> object instead of DOM node.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>HTMLElement</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getTime' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.event.Dom' rel='Ext.event.Dom' class='defined-in docClass'>Ext.event.Dom</a><br/><a href='source/Dom.html#Ext-event-Dom-method-getTime' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.event.Dom-method-getTime' class='name expandable'>getTime</a>( <span class='pre'></span> ) : Date<span class=\"signature\"></span></div><div class='description'><div class='short'>Returns the time of the event. ...</div><div class='long'><p>Returns the time of the event.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Date</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getXY' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.event.Dom' rel='Ext.event.Dom' class='defined-in docClass'>Ext.event.Dom</a><br/><a href='source/Dom.html#Ext-event-Dom-method-getXY' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.event.Dom-method-getXY' class='name expandable'>getXY</a>( <span class='pre'></span> ) : Array<span class=\"signature\"><span class='deprecated' >deprecated</span></span></div><div class='description'><div class='short'>Gets the X and Y coordinates of the event. ...</div><div class='long'><p>Gets the X and Y coordinates of the event.</p>\n        <div class='rounded-box deprecated-box deprecated-tag-box'>\n        <p>This method has been <strong>deprected</strong> since 2.0</p>\n        <p>Please use the <a href=\"#!/api/Ext.event.Dom-property-pageX\" rel=\"Ext.event.Dom-property-pageX\" class=\"docClass\">pageX</a> and <a href=\"#!/api/Ext.event.Dom-property-pageY\" rel=\"Ext.event.Dom-property-pageY\" class=\"docClass\">pageY</a> properties directly.</p>\n\n        </div>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Array</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-makeUnpreventable' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.event.Dom' rel='Ext.event.Dom' class='defined-in docClass'>Ext.event.Dom</a><br/><a href='source/Dom.html#Ext-event-Dom-method-makeUnpreventable' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.event.Dom-method-makeUnpreventable' class='name expandable'>makeUnpreventable</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-preventDefault' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.event.Dom' rel='Ext.event.Dom' class='defined-in docClass'>Ext.event.Dom</a><br/><a href='source/Dom.html#Ext-event-Dom-method-preventDefault' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.event.Dom-method-preventDefault' class='name expandable'>preventDefault</a>( <span class='pre'></span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Prevents the browsers default handling of the event. ...</div><div class='long'><p>Prevents the browsers default handling of the event.</p>\n</div></div></div><div id='method-setDelegatedTarget' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.event.Dom' rel='Ext.event.Dom' class='defined-in docClass'>Ext.event.Dom</a><br/><a href='source/Dom.html#Ext-event-Dom-method-setDelegatedTarget' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.event.Dom-method-setDelegatedTarget' class='name expandable'>setDelegatedTarget</a>( <span class='pre'>target</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>target</span> : Object<div class='sub-desc'></div></li></ul></div></div></div></div></div></div></div>","meta":{"private":true}});