module.exports = (grunt) ->

	# Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				# src: 'js/<%= pkg.name %>.js',
				# dest: 'js/<%= pkg.name %>.min.js'
				src: 'javascripts/*.js',
				dest: 'javascripts/operaciones.min.js'
			}
		}

		coffee: {
			# compile: {
				# files: {
					# # 'js/.js': 'path/to/source.coffee', # 1:1 compile
					# 'js/pedidos/index_an.js': 'coffeescript/pedidos/index_an.coffee' # 1:1 compile
					# #'path/to/another.js': ['path/to/sources/*.coffee', 'path/to/more/*.coffee'] # compile and concat into single file
				# }
			# }
			libs: {
				files: {
					# 'js/.js': 'path/to/source.coffee', # 1:1 compile
					'../libs/websockets.js': '../libs/websockets.coffee' # 1:1 compile
					#'path/to/another.js': ['path/to/sources/*.coffee', 'path/to/more/*.coffee'] # compile and concat into single file
				}
			}
			glob_to_multiple: {
				expand: true,
				cwd: 'coffeescript/',
				src: ['**/*.coffee'],
				dest: 'javascripts/',
				ext: '.js'
			}
		}

		compass: {
			dev: {
				options: {
					config: 'config.rb'
				}
			}
		}

		watch: {
			options: {
				livereload: true,
			},
			css: {
				files: ['sass/**/*.sass'],
				tasks: ['compass'],
			}
			js: {
				files: ['coffeescript/**/*.coffee'],
				tasks: ['coffee'],
			}
			libs: {
				files: ['../libs/**/*.coffee'],
				tasks: ['coffee:libs'],
			}
		}
	})

	# Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify')
	
	grunt.loadNpmTasks('grunt-contrib-coffee')
	grunt.loadNpmTasks('grunt-contrib-compass')
	grunt.loadNpmTasks('grunt-contrib-watch')

	# Default task(s).
	# grunt.registerTask('default', ['uglify'])
	grunt.registerTask('default', ['watch'])
	grunt.registerTask('libs', ['coffee:libs'])