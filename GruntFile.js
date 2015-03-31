/*global module:false*//*jshint unused:false*/
'use strict';

var path = require('path');

module.exports = function(grunt) {
  grunt.config.init({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      dist: [
      'dist/js',
      'dist/*.html'
      ]
    },

    connect: {
      server: {
        options: {
          port: 3030,
          base: './dist'
        }
      }
    },

    less: {
      debug: {
        options: {
          paths: ['src/less'],
          'dumpLineNumbers': 'all'
        },
        files: [{
          expand: true,
          cwd: 'src/less/demo',
          src: ['demo.less'],
          dest: './dist/css/',
          ext: '.css',
          nonull: true
        }]
      }
    },

    watch: {
      options: {
        livereload: true,
      },
      all: {
        files: ['src/js/**/*.js', 'src/demo/**/*.html', 'src/index.html', 'src/**/*.ejs', 'src/less/**/*.less'],
        tasks: [
          'less:debug',
          'render:demo',
          'render:lng',
          'render:downstream',
          'render:pipeline',
          'render:reinjection',
          'copy:dist'],
        options: {
          interrupt: true
        }
      }
    },

    // Render EJS templates.
    render: {
      demo: {
        files: [{
          expand: true,
          cwd: 'src/ejs/',
          src: [
            '*.ejs'
          ],
          dest: 'dist/',
          ext: '.html',
          filter: 'isFile'
        }]
      },
      lng: {
        files: [{
          expand: true,
          cwd: 'src/ejs-lng/',
          src: [
            '*.ejs'
          ],
          dest: 'dist/',
          ext: '.html',
          filter: 'isFile'
        }]
      },
      downstream: {
        files: [{
          expand: true,
          cwd: 'src/ejs-downstream/',
          src: [
            '*.ejs'
          ],
          dest: 'dist/',
          ext: '.html',
          filter: 'isFile'
        }]
      },
      pipeline: {
        files: [{
          expand: true,
          cwd: 'src/ejs-pipeline/',
          src: [
            '*.ejs'
          ],
          dest: 'dist/',
          ext: '.html',
          filter: 'isFile'
        }]
      },
      reinjection: {
        files: [{
          expand: true,
          cwd: 'src/ejs-reinjection/',
          src: [
            '*.ejs'
          ],
          dest: 'dist/',
          ext: '.html',
          filter: 'isFile'
        }]
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          cwd: './src/',
          src: [
            'js/**/*.js'
          ],
          dest: 'dist/'
        }]
      }
    },

  });

  // Load all grunt tasks that start with 'grunt-*'
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', 'Build and render all LESS for development.', [
      'clean',
      'less:debug',
      'render:demo',
      'render:lng',
      'render:downstream',
      'render:pipeline',
      'render:reinjection',
      'copy:dist',
      'connect:server',
      'watch:all'
  ]);

  grunt.registerTask('build', 'Build and render all LESS', [
      'clean',
      'less:debug',
      'render:demo',
      'render:lng',
      'render:downstream',
      'render:pipeline',
      'render:reinjection',
      'copy:dist'
  ]);

};