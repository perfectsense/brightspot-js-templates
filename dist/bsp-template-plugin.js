/*
 * Template test js
 *
 */
(function(globals, factory) {

    "use strict";

    define(['jquery','bsp-utils','bsp-templates'], factory);

})(this, function($, bsp_utils, bsp_templates, globals) {

    "use strict";

    var module = {
        init: function($el, options) {
            var self = this;
            var templateExists;
            self.options = options;
            self.$el = $el;
            if (typeof options.template !== 'string') {
                return;
            }
            templateExists = bsp_templates.templateExists(options.template);
            if (typeof options.data === 'object') {
                $.when( templateExists )
                    .done(function() {
                        self.applyTemplate(options.data); 
                    });
            } else if (typeof options.dataUrl === 'string') {
                $.when( $.get(options.dataUrl), templateExists )
                    .then(function(data) {
                        self.applyTemplate(data); 
                    });
            }
        },
        applyTemplate: function(data) {
            this.$el.html( bsp_templates.applyTemplate( this.options.template, data) );
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
