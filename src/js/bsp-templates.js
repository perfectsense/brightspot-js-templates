/**
 * bsp-templates utility
 * 
 * Handlebars template management, some convenience functions,
 * maybe some pre-baked partials later
 */
define(function(require) {
	var $ = require('jquery');
	var Handlebars = require('handlebars');

	/** note: single instance per application */
	return Object.create({
		 
		templates: {},
		
		addTemplate: function(name, template) {
			this.templates[name] = Handlebars.compile(template);
		},
		applyTemplate: function(name, data) {
			return this.templates[name](data);
		},
		registerPartial: function(name, partial) {
			Handlebars.registerPartial(name, partial);
		}
	});
});