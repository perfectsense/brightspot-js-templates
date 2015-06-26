module.exports = function(grunt) {
	
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('default', ['copy:dist']);
	grunt.registerTask('test', ['jshint:all']);

	grunt.initConfig({
		copy: {
			dist: {
				src: [
					'bower_components/handlebars/handlebars.js',
					'src/js/bsp-template-plugin.js'
				],
				dest: 'dist/',
				expand: true,
				flatten: true
			}
		},
		jshint: {
			all: ['Gruntfile.js', 'src/js/**/*.js']
  		},
		watch: {
			src: {
				files: ['src/**/*'],
				tasks: ['default']
			}
		}
	});

};