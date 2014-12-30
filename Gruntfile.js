var ENV_STAGE = process.env.ENV_STAGE || 's:/projects/';

module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({

    // Clean files from dist/ before build
    clean: {
      css: ["public/dist/*.css", "public/dist/*.css.map"],
      js: ["public/dist/*.js", "public/dist/*.js.map", "build/*.js"],
      fonts: ["public/fonts/**"],
      pages: ["public/**.html"]
    },

    // Copy FontAwesome files to the fonts/ directory
    copy: {
      fonts: {
        src: 'bower_components/font-awesome/fonts/**',
        dest: 'public/fonts/',
        flatten: true,
        expand: true
      },
      leafletCss: {
        src: 'bower_components/leaflet/dist/leaflet.css',
        dest: 'build/leaflet.less'
      },
      leafletImgs: {
        src: 'bower_components/leaflet/dist/images/**',
        dest: 'public/assets/images/',
        flatten: true,
        expand: true
      }
    },

    // Transpile LESS
    less: {
      options: {
        sourceMap: true,
        sourceMapFilename: 'public/dist/style.css.map',
        sourceMapURL: 'style.css.map',
        sourceMapRootpath: '../',
        paths: ['bower_components/bootstrap/less']
      },
      prod: {
        options: {
          compress: true,
          yuicompress: true
        },
        files: {
          "public/dist/style.css": "src/css/style.less"
        }
      }
    },

    // Run our JavaScript through JSHint
    jshint: {
      js: {
        src: ['src/js/**.js']
      }
    },

    // Pre-render Handlebars templates
    handlebars: {
      options: {
        // Returns the filename, with its parent directory if
        // it's in a subdirectory of the src/templates folder
        processName: function(filePath) {
          var path = filePath.toLowerCase(),
              pieces = path.split("/"),
              name = '';
          if(pieces[pieces.length - 2] !== 'templates') {
            name = name + pieces[pieces.length - 2];
          }
          name = name + pieces[pieces.length - 1];
          return name.split(".")[0];
        }
      },
      compile: {
        files: {
          'build/templates.js': ['src/templates/**/*.hbs']
        }
      }
    },

    // Use Uglify to bundle up a pym file for the home page
    uglify: {
      options: {
        sourceMap: true
      },
      prod: {
        files: {
          'public/dist/scripts.js': [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/bootstrap/js/tooltip.js',
            'bower_components/bootstrap/js/popover.js',
            'bower_components/underscore/underscore.js',
            'bower_components/backbone/backbone.js',
            'bower_components/imagesloaded/imagesloaded.pkgd.js',
            'bower_components/Slides/source/jquery.slides.js',
            'bower_components/highcharts/highcharts.js',
            'bower_components/leaflet/dist/leaflet.js',
            'bower_components/handlebars/handlebars.runtime.js',
            'bower_components/moment/moment.js',
            'bower_components/chroma-js/chroma.js',
            'bower_components/numeral/numeral.js',
            'build/templates.js',
            'src/js/models/child.js',
            'src/js/collections/children.js',
            'src/js/views/child-popup.js',
            'src/js/chloromap.js',
            'src/js/call-time.js',
            'src/js/charts.js',
            'src/js/slider.js',
            'src/js/main.js'
          ]
        }
      }
    },

    // Watch for changes in LESS and JavaScript files,
    // relint/retranspile when a file changes
    watch: {
      options: {
        livereload: true,
      },
      templates: {
        files: ['pages/**/*', 'layouts/*', 'helpers/**', 'partials/*'],
        tasks: ['build:html']
      },
      scripts: {
        files: ['src/js/**/*.js', 'src/templates/**/*.hbs'],
        tasks: ['build:js']
      },
      styles: {
        files: ['src/css/**.less', 'src/css/**/**.less'],
        tasks: ['build:css']
      }
    },

    // A simple little development server
    connect: {
      server: {
        options: {
          hostname: 'localhost',
          base: 'public',
          keepalive: true,
          livereload: true,
          open: true
        }
      }
    },

    // A tool to run the webserver and livereloader simultaneously
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      dev: ['connect', 'watch']
    },

    // Bake out static HTML of our pages
    generator: {
      prod: {
        files: [{
          cwd: 'pages',
          src: ['**/*'],
          dest: 'public'
        }],
        options: {
          partialsGlob: 'partials/*.hbs',
          templates: 'layouts',
          templateExt: 'hbs',
          helpers: require('./helpers'),
          base: 'http://projects.statesman.com/templates/immersive/',
          nav: [
            {
              title: "Overview",
              subtitle: "Explaining it",
              file: "index",
            },
            {
              title: "Part 1",
              subtitle: "Explaining story 1",
              file: "main",
              children: [
                {
                  title: "CPS main",
                  subtitle: "Explaining story 1",
                  file: "main"
                },
                {
                  title: "Missteps",
                  subtitle: "Explaining story 1",
                  file: "missteps"
                },
                {
                  title: "Undercounting",
                  subtitle: "Explaining story 1",
                  file: "undercounting"
                },
                {
                  title: "Brandon White",
                  subtitle: "Explaining story 1",
                  file: "brandon-white"
                }
              ]
            },
            {
              title: "Part 2",
              subtitle: "Part 2 description",
              file: "no-arrest",
              children: [
                {
                  title: "No arrest",
                  subtitle: "Explaining story 1",
                  file: "no-arrest"
                },
                {
                  title: "Paramours",
                  subtitle: "Explaining story 1",
                  file: "paramours"
                },
                {
                  title: "Missing families",
                  subtitle: "Explaining story 1",
                  file: "missing-families"
                }
              ]
            },
            {
              title: "Part 3",
              subtitle: "And this is story 3",
              file: "wrongdoing",
              children: [
                {
                  title: "Wrongdoing",
                  subtitle: "Explaining story 1",
                  file: "wrongdoing"
                },
                {
                  title: "Caseworker violence",
                  subtitle: "Explaining story 1",
                  file: "caseworker-violence"
                },
                {
                  title: "Turnover",
                  subtitle: "Explaining story 1",
                  file: "turnover"
                },
                {
                  title: "Overhaul strategy",
                  subtitle: "Explaining story 1",
                  file: "overhaul-strategy"
                },
                {
                  title: "Previous removals",
                  subtitle: "Explaining story 1",
                  file: "previous-removals"
                },
              ]
            }
          ]
        }
      }
    },

    // A multi-task to publish static files from public/ to the staging
    // environment
    sync: {
      stage: {
        files: [{
          cwd: 'public',
          src: [
            '**'
          ],
          dest: ENV_STAGE + 'news/child-fatalities',
        }],
        ignoreInDest: '.htaccess',
        verbose: true,
        updateAndDelete: true
      }
    }

  });

  // Load the task plugins
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-generator');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-sync');

  // Assorted build tasks
  grunt.registerTask('build:html', ['clean:pages', 'generator']);
  grunt.registerTask('build:css', ['clean:css', 'clean:fonts', 'copy', 'less']);
  grunt.registerTask('build:js', ['clean:js', 'handlebars', 'jshint', 'uglify']);
  grunt.registerTask('build', ['build:html', 'build:css', 'build:js']);

  // Publishing tasks
  grunt.registerTask('stage', ['build', 'sync:stage']);

  // A dev task that runs a build then launches a dev server w/ livereload
  grunt.registerTask('default', ['build', 'concurrent']);

};
