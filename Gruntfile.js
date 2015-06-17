module.exports = function(grunt) {
	
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('default', ['compile']);
	grunt.registerTask('test', ['jshint:all']);
	
	grunt.registerTask('compile', ['compilejs']);
	grunt.registerTask('compilejs', ['copy:dist','uglify:dist']);

	grunt.initConfig({
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