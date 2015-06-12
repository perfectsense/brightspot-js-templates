/**
 * bsp-templates utility
 * 
 * Handlebars template management, some convenience functions,
 * maybe some pre-baked partials later
 */
define(function(require) {
	var Handlebars = require('handlebars');

	/** note: single instance per application */
	return Object.create({

		errorTemplateNotFound: 'Error: template not found',
		templates: {},
		templateChecks: 20,
		templateCheckInterval: 100,
		
		addTemplate: function(name, template) {
			this.templates[name] = Handlebars.compile(template);
		},
		applyTemplate: function(name, data) {
			if (typeof this.templates[name] === 'function') {
				return this.templates[name](data);
			} else {
				return this.errorTemplateNotFound;
			}
		},
		registerPartial: function(name, partial) {
			Handlebars.registerPartial(name, partial);
		},
		templateExists: function(name) {
			var deferred = new $.Deferred();
			var checks = 0;
			var checkInterval;
			var self = this;
			var error;
			if (typeof name !== 'string') {
				return;
			}

			/**
			 * If template already compiled, check that any needed
			 * partials are registered and that there are no other
			 * errors when attempting to apply with an empty object.
			 */
			if (typeof self.templates[name] === 'function') {
				try {
					self.applyTemplate(name, {});
					deferred.resolve();
					return deferred.promise();
				} catch(e) {
					error = e;
				}
			}

			/**
			 * If template not yet compiled, set interval to check x times
			 * for the template function to exist, then run a similar check
			 * when it does.
			 */
			checkInterval = setInterval(function() {
				if (checks < self.templateChecks) {
					if (typeof self.templates[name] === 'function') {
						try {
							self.applyTemplate(name, {});
							deferred.resolve();
							clearInterval(checkInterval);
						} catch(e) {
							error = e;
						}
					}
				} else {
					deferred.reject(error);
					clearInterval(checkInterval);
				}
				checks++;
			}, self.templateCheckInterval);
			
			return deferred.promise();
		}
	});
});