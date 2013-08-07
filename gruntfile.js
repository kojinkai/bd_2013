  module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ''
      },
      dist: {
        options: {
          process: function(src, filepath) {
            grunt.log.writeln("shitsnax: ", src.length, filepath);
            grunt.log.writeln("shitsnax: ", '// Source: ' + filepath + '\n');
          }
        }
      },
      // the files to concatenate
      basic: {
        src: ['scripts/jquery.simplefade.js', 'scripts/jquery.backfill.js', 'scripts/jquery.dropmenu.js'],
        // the location of the resulting JS file
        dest: 'assets/js/basic.js'
      },
      no_touch: {
        src: ['scripts/vendor/jquery.dataAttr.min.js', 'scripts/vendor/jquery.scrollTo.js', 'scripts/jquery.scrollover.js'],
        dest: 'assets/js/no-touch.js'
      },

      stripBanners: {
        options: {
          block: true,
          line: true
        }
      }
    },
    uglify: {
      options: {
        // the banner is inserted at the top of the output
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
      },
      basic: {
        files: {
          'assets/js/<%= pkg.name %>.min.js': 'scripts/main.js'
        }
      },
      async: {
        files: {
          'assets/js/basic.min.js': ['<%= concat.basic.dest %>'],
          'assets/js/no-touch.min.js': ['<%= concat.no_touch.dest %>']
        }
      }    
    },
    jshint: {
      // define the files to lint
      files: ['gruntfile.js', 'scripts/**.js', '!scripts/vendor'],
      options: {
          // more options here if you want to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      }
    },
    sass: {                              // Task
      dist: {
        options: {                       // Target options
          style: 'expanded'
        },                                // Target
        files: {                         // Dictionary of files
          'assets/css/main.css': 'sass/main.scss'       // 'destination': 'source'
        }
      },
      dev: {                             // Another target
        options: {                       // Target options
          style: 'expanded'
        },
        files: {
          'assets/css/main.css': 'sass/main.scss'
        }
      }
    },    
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }               
  });
  
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('test', ['jshint']);

  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'sass']);

};