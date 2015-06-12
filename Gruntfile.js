module.exports = function(grunt) {
	
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['compile']);
	grunt.registerTask('test', ['jshint:all']);
	
	grunt.registerTask('compile', ['compilejs']);
	grunt.registerTask('compilejs', ['requirejs:dist','uglify:dist']);

	grunt.initConfig({
		requirejs: {
			dist: {
				options: {
					baseUrl: 'src/js',
					include: ['bsp-templates'],
					paths: {
						'handlebars': '../../bower_components/handlebars/handlebars'
					},
					optimize: 'none',
					out: 'dist/bsp-templates.js',
					wrap: true
				}
			}
		},
		uglify: {
			dist: {
				files: {
					'dist/bsp-templates.min.js' : ['dist/bsp-templates.js'],
				}
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