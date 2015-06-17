/*
 * Plugin to load bsp-templates
 *
 * bsp-templates is generated with 
 * https://github.com/perfectsense/brightspot-js-grunt/
 */
(function(globals, factory) {

    "use strict";

    define(['jquery','bsp-utils','handlebars'], factory);

})(this, function($, bsp_utils, Handlebars, globals) {

    "use strict";

    var module = {
        init: function($el, options) {
            var dataLoaded;
            var templateLoaded;
            if (typeof options.template !== 'string') {
                return;
            }
            templateLoaded = $.get('/render/' + options.template + '.hbs');
            if (typeof options.data === 'object') {
                $.when(templateLoaded).then(function(template) {
                    if ($.isArray(template)) {
                        template = template[0];
                    }
                    $el.html( Handlebars.compile(template)(options.data) );
                });
            } else if (typeof options.dataUrl === 'string') {
                dataLoaded = $.get(options.dataUrl);
                $.when(templateLoaded, dataLoaded).then(function(template, data) {
                    if ($.isArray(template)) {
                        template = template[0];
                    }
                    if ($.isArray(data)) {
                        data = data[0];
                    }
                    $el.html( Handlebars.compile(template)(data) );
                });
            } else {
                $.when(templateLoaded).then(function(template) {
                    $el.html( Handlebars.compile(template)({}) ); 
                });
            }
        }
    };

    return bsp_utils.plugin(globals, 'bsp', 'template', {
        '_each': function(item) {
            var options = this.option(item);
            var moduleInstance = Object.create(module);
            moduleInstance.init($(item), options);
        }
    });

});