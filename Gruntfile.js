module.exports = function(grunt) {
	
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('default', ['compile']);
	grunt.registerTask('test', ['jshint:all']);
	
	grunt.registerTask('compile', ['compilejs']);
	grunt.registerTask('compilejs', ['requirejs:dist','copy:dist','uglify:dist']);

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
		copy: {
			dist: {
				src: ['src/js/bsp-template-plugin.js'],
				dest: 'dist/',
				expand: true,
				flatten: true
			}
		},
		uglify: {
			dist: {
				files: {
					'dist/bsp-templates.min.js' : ['dist/bsp-templates.js'],
					'dist/bsp-template-plugin.min.js' : ['dist/bsp-template-plugin.js']
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