require.config({
	paths: {
		'jquery': '../bower_components/jquery/dist/jquery',
		'bsp-templates': '../dist/bsp-templates',
		'bsp-template-plugin': '../dist/bsp-template-plugin',
		'bsp-utils': '../bower_components/bsp-utils/bsp-utils'
	}
});
require(['jquery', 'bsp-templates', 'bsp-template-plugin'], function($, bspTemplates) {
	bspTemplates.registerPartial( 'testPartial', $('#testPartial').html() );
	bspTemplates.addTemplate( 'testTemplate', $('#testTemplate').html() );
});