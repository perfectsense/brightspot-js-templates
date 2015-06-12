require.config({
	paths: {
		'jquery': '../bower_components/jquery/dist/jquery',
		'bsp-templates': '../dist/bsp-templates'
	}
});
require(['jquery', 'bsp-templates'], function($, bspTemplates) {
	bspTemplates.registerPartial( 'testPartial', $('#testPartial').html() );
	bspTemplates.addTemplate( 'testTemplate', $('#testTemplate').html() );
	$('#testOutput').html( bspTemplates.applyTemplate('testTemplate', {
		testVar: 'testVarValue'
	}) );
});