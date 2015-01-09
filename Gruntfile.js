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
        src: 'node_modules/leaflet/dist/leaflet.css',
        dest: 'build/leaflet.less'
      },
      leafletImgs: {
        src: 'node_modules/leaflet/dist/images/**',
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
        },
        node: true
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
            // Pre-processed Handlebars templates
            'build/templates.js',
            // Charts (Backbone views)
            'src/js/charts/staff-costs.js',
            'src/js/charts/turnover-rate.js',
            'src/js/charts/caseloads.js',
            'src/js/charts/total-staff.js',
            // A few misc. standalone modules
            'src/js/call-time.js',
          ]
        }
      }
    },

    // Use Watchify to smartly compile JS
    browserify: {
      options: {
        debug: true
      },
      docs: {
        src: './src/js/docs.js',
        dest: 'public/dist/docs.js'
      },
      storycommon: {
        options: {
          alias: [
            './src/js/bundles/story.js:./bundles/story'
          ],
        },
        src: [],
        dest: 'public/dist/story-common.js'
      },
      storyplain: {
        src: './src/js/bundles/story.js',
        dest: 'public/dist/story-plain.js'
      },
      stories: {
        options: {
          external: [
            './src/js/bundles/story.js:./bundles/story'
          ]
        },
        files: {
          'public/dist/main.js': './src/js/main.js',
          'public/dist/missteps.js': './src/js/missteps.js',
          'public/dist/undercounting.js': './src/js/undercounting.js',
          // Part 2
          'public/dist/no-arrest.js': './src/js/no-arrest.js',
          'public/dist/explorer.js': './src/js/explorer.js',
          // Part 3
          'public/dist/turnover.js': './src/js/turnover.js',
          // Overview
          'public/dist/index.js': './src/js/index.js'
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
        files: ['pages/**/*', 'layouts/*', 'helpers/*', 'partials/*'],
        tasks: ['build:html']
      },
      tpls: {
        files: ['src/templates/**/*.hbs'],
        tasks: ['handlebars']
      },
      js: {
        files: ['src/js/**/*.js'],
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
          livereload: true
        }
      }
    },

    // A tool to run the webserver and livereloader simultaneously
    concurrent: {
      options: {
        logConcurrentOutput: true,
        limit: 12
      },
      dev: [
        'watch',
        'connect'
      ]
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
              subtitle: "Gaps in protection",
              file: "main",
              children: [
                {
                  title: "Statesman analysis",
                  subtitle: "800 fatality reports reviewed",
                  file: "main"
                },
                {
                  title: "Lack of disclosure",
                  subtitle: "Many deaths not publicly reported",
                  file: "undercounting"
                },
                {
                  title: "Abuse repeatedly ruled out",
                  subtitle: "CPS called 23 times before teen's death",
                  file: "brandon-white"
                },
                {
                  title: "Repeated contact",
                  subtitle: "Families already on state's radar",
                  file: "missteps"
                }
              ]
            },
            {
              title: "Part 2",
              subtitle: "Stumbling blocks",
              file: "no-arrest",
              children: [
                {
                  title: "Cases remain open",
                  subtitle: "Some last years; others unsolved",
                  file: "no-arrest"
                },
                {
                  title: "Missing families",
                  subtitle: "Caregivers elude caseworkers",
                  file: "missing-families"
                },
                {
                  title: "Parents' 'paramours'",
                  subtitle: "Unmarried partners are red flags",
                  file: "paramours"
                }
              ]
            },
            {
              title: "Part 3",
              subtitle: "Inside CPS",
              file: "wrongdoing",
              children: [
                {
                  title: "Misconduct",
                  subtitle: "Employees caught lying",
                  file: "wrongdoing"
                },
                {
                  title: "Anticipating tragedies",
                  subtitle: "Using trends, analytics",
                  file: "previous-removals"
                },
                {
                  title: "In harm's way",
                  subtitle: "Caseworkers face violence",
                  file: "caseworker-violence"
                },
                {
                  title: "High turnover",
                  subtitle: "Many leave amid job's stress",
                  file: "turnover"
                },
                {
                  title: "Another overhaul",
                  subtitle: "Focus is on internal issues",
                  file: "overhaul-strategy"
                }
              ]
            },
            {
              title: "Database",
              subtitle: "Database subhed",
              file: "explorer"
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
  grunt.loadNpmTasks('grunt-browserify');

  // Assorted build tasks
  grunt.registerTask('build:html', ['clean:pages', 'generator']);
  grunt.registerTask('build:css', ['clean:css', 'clean:fonts', 'copy', 'less']);
  grunt.registerTask('build:js', ['clean:js', 'handlebars', 'jshint', 'browserify']);
  grunt.registerTask('build', ['build:html', 'build:css', 'build:js']);

  // Publishing tasks
  grunt.registerTask('stage', ['build', 'sync:stage']);

  // A dev task that runs a build then launches a dev server w/ livereload
  grunt.registerTask('default', ['build', 'concurrent']);

};
