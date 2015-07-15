/*
 * Plugin to load bsp-templates
 */
import $ from 'jquery';
import bsp_utils from 'bsp-utils';
import bsp_template from 'bsp-template';

export default bsp_utils.plugin(false, 'bsp', 'template', {
    '_each': function(item) {
        var options = this.option(item);
        var moduleInstance = Object.create(thePlugin);
        moduleInstance.init($(item), options).fetch().then(() => {
            moduleInstance.render();
        });
    }
});