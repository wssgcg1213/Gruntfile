module.exports = function(grunt) {
  grunt.initConfig({
  	pkg: grunt.file.readJSON('package.json'),

    //js压缩美化
  	uglify: {
  		options: {
  			banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
  		},
  		compress: {
  			files: [
          {
            expand: true,
            filter: 'isFile',
            src: 'app/views/**/*.js',
            dest: 'public/js/',
            rename: function(dest,src){
                var sIndex = src.lastIndexOf('/'),
                    fIndex = src.lastIndexOf('.')
                return dest + src.slice(sIndex,fIndex) + '.min.js';
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
            src: "app/views/**/*.js"
          }
        ]
      }
  	},

    //js强制检测
    jshint: {
      files: ['app/views/**/*.js'],
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
            src: 'app/views/**/*.css',
            dest: 'public/css/',
            rename: function(dest,src){
                var sIndex = src.lastIndexOf('/'),
                    fIndex = src.lastIndexOf('.')
                return dest + src.slice(sIndex,fIndex) + '.min.css';
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
      files: ['app/views/**/*.js'],
      tasks: ['uglify','jshint','cssmin']
    },

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['watch']);
  
};