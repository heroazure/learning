module.exports = function (grunt) {
    // 项目配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        less: {
            expanded: {
                files:[
                    {
                        expand:true,
                        cwd:"html/www/less/",
                        src:["**/*.less","!{mixin,variables}.less"],
                        dest:"html/www/css/pages/"
                    }]
            },
            minified: {
                options: {
                    cleancss: true
                },
                files: [{
                    expand:true,
                    cwd:"html/www/less/",
                    src:["**/*.less","!{mixin,variables}.less"],
                    dest:"html/www/css/pages/",
                    ext:".min.css"
                }]
            }
        },
        cssmin: {
            bootstrap: {
                options: {
                    shorthandCompacting: false,
                    roundingPrecision: -1
                },
                files: {
                    'html/www/css/bootstrap.min.css': 'html/www/css/bootstrap.css'
                }
            }
        },
        watch: {
            /*scripts: {
                files: ['js/<%= pkg.name %>.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false
                }
            },*/
            less: {
                files: ['html/www/less/**/*.less'],
                tasks: ['less'],
                options: {
                    spawn: false
                }
            }
        }
    });
    //grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    //grunt.loadNpmTasks('grunt-banner');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // 默认任务
    grunt.registerTask('default',
        [
            'less',
            'cssmin:bootstrap'
        ]
    );
}