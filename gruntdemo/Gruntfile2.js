module.exports = function (grunt) {
  // 项目配置
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/zepto.js', 'src/Underscore-1.8.2.js', 'src/Backbone-1.1.2.js'],
        dest: 'dest/libs.js'
      }
    },

uglify: {
      build: {
        src: 'dest/libs.js',
        dest: 'dest/libs.min.js'
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
  // 默认任务
grunt.registerTask('default', ['concat', 'uglify']);
}