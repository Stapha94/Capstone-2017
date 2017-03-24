'use strict';
// Based on:
// https://gist.github.com/schmuli/6422753589261e097a83

//=============================================
//            PLUGIN REFERENCES
//=============================================
var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var utils = require('gulp-util');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pkg = require('./package.json');
var runSequence = require('run-sequence');


//=============================================
//            DECLARE PATHS
//=============================================

var paths = {
  /**
   * The 'gulpfile' file is where our run tasks are hold.
   */
  gulpfile: 'gulpfile.js',
  /**
   * This is a collection of file patterns that refer to our app code (the
   * stuff in `src/`). These file paths are used in the configuration of
   * build tasks.
   *
   * - 'styles'       contains all project css styles
   * - 'images'       contains all project images
   * - 'fonts'        contains all project fonts
   * - 'scripts'      contains all project javascript except config-env.js and unit test files
   * - 'html'         contains main html files
   * - 'templates'    contains all project html templates
   * - 'config'       contains Angular app config files
   */
  app: {
    basePath: 'JUDGE/src/',
    fonts: 'node_modules/**/*.{eot,svg,ttf,woff,woff2}',
    styles: 'JUDGE/assets/styles.css',
    images: 'JUDGE/assets/img/*.{png,gif,jpg,jpeg}',
    scripts: [ // Must be in order of dependency
    'JUDGE/src/app.js',
    'JUDGE/src/app-states.js',
    'JUDGE/src/config/**/*.js',
    'JUDGE/src/directives/**/*.js',
    'JUDGE/src/pages/**/*.js',
    'JUDGE/src/services/**/base-api-service.js',
    'JUDGE/src/services/**/*.js',
    '!JUDGE/src/directives/**/base-api-service.js'
    ],
    html: 'app.html',
    templates: 'JUDGE/src/**/*.html'
  },
  /**
   * The 'views' folder is where our html templates reside
   */
  views: {
    basePath: 'views/',
  },
  /**
   * The 'build' folder is where our app resides once it's
   * completely built.
   *
   * - 'dist'         application distribution source code
   */
  build: {
    basePath: 'build/',
    dist: {
      basePath: 'build/dist/',
      fonts: 'build/dist/fonts/',
      images: 'build/dist/img/'
    }
  }
};

gulp.task('compileApp', function() {
    return gulp.src("JUDGE/src/app.js")
                .pipe(gulp.dest(paths.build.dist.basePath));
});

gulp.task('compileStates', function() {
    return gulp.src("JUDGE/src/app-states.js")
                .pipe(gulp.dest(paths.build.dist.basePath));
});

gulp.task('compileScripts', function() {
    return gulp.src(paths.app.scripts)
                .pipe(concat('judge.js'))
                .pipe(gulp.dest(paths.build.dist.basePath));
});

gulp.task('compileFonts', function() {
    return gulp.src(paths.app.fonts)
                .pipe(gulp.dest(paths.build.dist.fonts));
});

gulp.task('compileImages', function() {
    return gulp.src(paths.app.images)
                .pipe(gulp.dest(paths.build.dist.images));
});

gulp.task('compileStyles', function() {
    return gulp.src(paths.app.styles)
                .pipe(gulp.dest(paths.build.dist.basePath));
});

gulp.task('build', function() {
    runSequence(['compileApp', 'compileStates', 'compileScripts', 'compileFonts', 'compileImages', 'compileStyles']);
});