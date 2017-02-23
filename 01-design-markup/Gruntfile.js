'use strict';
module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            options: {
                event: ['changed', 'added', 'deleted']
            },

            css: {
                files: 'scss/**/*.scss',
                tasks: ['sass:dist']
            }

        },

        // Compiles Sass to CSS and generates necessary files if requested
        sass: {
            dist: {
                options: {
                    sourceMap: true,
                    outputStyle: 'expanded'
                },
                files: {
                    'css/global.css': 'scss/global.scss' // 'destination': 'source'
                }
            }
        },

        // Minify CSS
        cssmin: {
            dist: {
                expand: true,
                cwd: 'css/',
                src: ['global.css', '!*.min.css'],
                dest: 'css/',
                ext: '.min.css'
            }
        },

        uglify:{
            dist: {
                files: {
                    'js/misc.min.js': ['js/misc.js']
                }
            }
        },

    });


    grunt.registerTask('build', [
        'uglify',
        'cssmin'
    ]);

    grunt.registerTask('default', [
        'watch'
    ]);


};
