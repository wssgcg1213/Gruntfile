module.exports = function(grunt) {
  grunt.initConfig({
  	config: grunt.file.readJSON('grunt.config.json'),

    //js压缩美化
  	uglify: {
  		options: {
  			banner: '/*! <%= config.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
  		},
  		compress: {
  			files: [
          {
            expand: true,
            filter: 'isFile',
            src: '<%= config.js %>',
            dest: 'public/js/',
            rename: function(dest,src){
                return dest + src.slice(src.lastIndexOf('/'));
            }
          }
        ]
  		},
      beatify: {
        options: {
          beautify: true
        },
        files: [
          {
            expand: true,
            filter: 'isFile',
            src: '<%= config.js %>'
          }
        ]
      }
  	},

    //js强制检测
    jshint: {
      files: ['<%= config.js %>'],
        options: {
          globals: {
            jQuery: true,
            console: true,
            module: true
          }
        }
      },

    //css压缩
    cssmin: {
      compress: {
        files: [
          {
            expand: true,
            filter: 'isFile',
            src: '<%= config.css %>',
            dest: 'public/css/',
            rename: function(dest,src){
                return dest + src.slice(src.lastIndexOf('/'));
            }
          }
        ]
      }
    },


    //文件修改监控
    watch: {
       options: {
        spawn: false,
      },
      files: ['<%= config.js %>','<%= config.css %>'],
      tasks: ['uglify','jshint','cssmin']
    },

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['watch']);
  
};