/*
 * Plugin to load bsp-templates
 */
import $ from 'jquery';
import { bsp_utils } from 'bsp-utils';
import Handlebars from './handlebars';

export default bsp_utils.plugin(false, 'bsp', 'template', {
    '_each': function(item) {
        var options = this.option(item);
        var moduleInstance = Object.create({
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
        });
        moduleInstance.init($(item), options);
    }
});