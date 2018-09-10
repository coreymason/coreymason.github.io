module.exports = function(grunt) {
    // Load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);

    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        compass: {
            options: {
                config: 'config.rb',
                sourcemap: true,
                noLineComments: true,
                force: true
            },
            dev: {
                options: {
                    sassDir: 'sass',
				    cssDir: '.',
				    outputStyle: 'expanded'
                }
            }
        },
        coffee: {
            dev: {

            }
        },
        autoprefixer: {
            dev: {
                options: {
                	browsers: ['> 1%']
                },
                src: 'style.css'
            }
        },
        concat: {

        },
        uglify: {

        },
        cssmin: {

        },
        imagemin: {

        },
        shell: {

        },
        watch: {
            compass: {
                files: 'sass/**/*.scss',
				tasks: ['compass', 'autoprefixer']
            },
            coffee: {
                files: 'coffee/**/*.coffee',
                tasks: ['coffee:dev']
            },
            livereload: {
            	options: {
            		livereload: true
            	},
                files: ['*.css', '*.html', '*.php', 'js/*.js'] //still need js and images
            }
        },
        copy: {

        },
        clean: {

        },
        replace: {
        	style: {
				src: [
					'sass/style.scss',
					'style.css'
				],
				overwrite: true,
				replacements: [ {
					from: /^.*Version:.*$/m,
					to: 'Version: <%= pkg.version %>'
				} ]
			},
			readme: {
				src: [
					'readme.md'
				],
				overwrite: true,
				replacements: [ {
					from: /^### Current Version: .*$/m,
					to: '### Current Version: <%= pkg.version %>'
				} ]
			}
        },
        bump: {
        	options: {
        		files: ['package.json', 'bower.json'],
        		updateConfigs: ['pkg'],
        		commit: false
        	}
        },
        'ftp-deploy': {
        	deploy: {

        	}
        }
    });

    grunt.registerTask('bumpto', function(releaseType) {
        if ('major' !== releaseType && 'minor' !== releaseType && 'patch' !== releaseType) {
            grunt.fail.fatal('Please specify the bump type (e.g., "grunt bumpto:patch")');
        } else {
            grunt.task.run('bump-only:' + releaseType);
            // Update the version numbers
            grunt.task.run('replace' );
        }
    });

    // Default tasks
    grunt.registerTask('default', ['compass', 'autoprefixer', 'watch']);
};
