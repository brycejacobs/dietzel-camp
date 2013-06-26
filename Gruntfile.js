'use strict';

var path = require('path');

module.exports = function(grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['ngmin', 'uglify', 'concat', 'compass']);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' * <%= pkg.homepage %>\n' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>; */\n'
    },
    ngmin: {
      app: {
        src: ['app/public/js/source/app.js'],
        dest: 'app/public/js/dist/app.js'
      },
      controllers: {
        expand: true,
        cwd: 'app/public/js/source/controllers',
        src: ['**/*.js'],
        dest: 'app/public/js/dist/controllers'
      },
      directives: {
        expand: true,
        cwd: 'app/public/js/source/directives',
        src: ['**/*.js'],
        dest: 'app/public/js/dist/directives'
      },
      services: {
        expand: true,
        cwd: 'app/public/js/source/services',
        src: ['**/*.js'],
        dest: 'app/public/js/dist/services'
      }
    },
    compass: {
      dist: {
        options: {
          config: 'app/public/config.rb',
          sassDir: 'app/public/sass',
          cssDir: 'app/public/css',
          environment: 'production',
          debugInfo: true
        }
      }
    },
    uglify: {
      dist: {
        options: {
          //banner: '<%= meta.banner %>',
          sourceMap: 'app/public/js/scripts.sourcemap.js',
          sourceMapPrefix: 3,
          sourceMappingURL: '/js/scripts.sourcemap.js'
        },
        files: {
          'app/public/js/scripts.min.js': [
            'app/public/js/dist/app.js',
            'app/public/js/dist/controllers/*.js',
            'app/public/js/dist/services/*.js',
            'app/public/js/dist/directives/*.js'
          ]
        }
      }
    },
    concat: {
      libs: {
        src: [
          'app/public/js/vendor/lodash.min.js',
          'app/public/js/vendor/highcharts.js',
          'app/public/js/vendor/foundation.min.js',
          'app/public/js/vendor/foundation.tooltips.js',
          'app/public/js/vendor/select2.js',
          'app/public/js/vendor/select2-angularui.js',
          'app/public/js/scripts.min.js'
        ],
        dest: 'app/public/js/csa.min.js'
      }
    },
    watch: {
      libs: {
        files: ['app/public/js/vendor/**/*.js'],
        tasks: ['concat'],
        options: {
          nospawn: true
        }
      },
      scripts: {
        files: ['app/public/js/source/**/*.js'],
        tasks: ['ngmin', 'uglify', 'concat'],
        options: {
          nospawn: true
        }
      },
      css: {
        files: ['app/public/sass/**/*.scss'],
        tasks: ['compass'],
        options: {
          nospawn: true
        }
      }
    }
  });
};