module.exports = function (grunt) {
    grunt.initConfig({
        jade: {
            compile: {
                files: [
                    {
                        expand: true,
                        src: ['frontend/**.jade'],
                        ext: '.html'
                    }
                ]
            }
        },
        less: {
            compile: {
                options: {
                    sourceMap: true,
                    sourceMapFilename: 'frontend/main.css.map',
                    sourceMapBasepath: './'
                },
                files: {
                    'frontend/main.css': 'frontend/main.less'
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: 'frontend'
                }
            }
        },

        watch: {
            jade: {
                files: ['frontend/**.jade'],
                tasks: ['jade']
            },
            less: {
                files: ['frontend/**.less'],
                tasks: ['less']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', ['jade', 'less', 'connect', 'watch']);
};