module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ';'
      },
      dist: {
        // the files to concatenate
        src: ['js/*.js'],
        // the location of the resulting JS file
        dest: 'assets/js/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        // the banner is inserted at the top of the output
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'assets/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    jshint: {
      // define the files to lint
      files: ['gruntfile.js', 'js/jquery.konami.js', 'js/jquery.scrollover.js', 'js/main.js'],
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
          style: 'compressed'
        },                                // Target
        files: {                         // Dictionary of files
          'assets/css/main.css': 'sass/main.scss'       // 'destination': 'source'
        }
      },
      dev: {                             // Another target
        options: {                       // Target options
          style: 'compressed'
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