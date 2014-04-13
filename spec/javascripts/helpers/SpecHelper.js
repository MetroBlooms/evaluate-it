Ext.require('Ext.data.Model');

afterEach(function() {
	Ext.data.Model.cache = {};		// Clear any cached models
});

var domE1;
beforeEach(function() {			// Reset the div with a new one
	domE1 = document.createElement('div');
	domE1.setAttribute('id', 'jasmine_content');
	var oldE1 = document.getElementById('jasmine_content');
	oldE1.parentNode.replaceChild(domE1, oldE1);
});

afterEach(function() {			// Make the test runner look pretty
	domE1.setAttribute('style', 'display:none;');
});