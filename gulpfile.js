'use strict';

var gulp = require('gulp')
  , gutil = require('gulp-util')
  , stylus = require('gulp-stylus')
  , nib = require('nib')
  , prefixer = require('gulp-autoprefixer')
  , imagemin = require('gulp-imagemin')
  , csso = require('gulp-csso')
  , concat = require('gulp-concat')
  , webpack = require('webpack')
  , webpackConfig = require('./static/webpack.config')
  , uglify = require('gulp-uglify');

gulp.task('default', ['stylus', 'webpack', 'imagemin'], function () {
  gulp.watch('./static/stylus/**/*.styl', ['stylus']);
  gulp.watch('./static/js/**/*.js', ['webpack']);
  gulp.watch('./static/img/**/*', ['imagemin']);
});

gulp.task('stylus', function(){
  gulp.src('./static/stylus/*.styl')
    .pipe(stylus({
      use: nib()
    }))
    .on('error', gutil.log)
    .pipe(prefixer([
      'Chrome >= 34',
      'Firefox >= 28',
      'Explorer >= 9']))
    .pipe(csso())
    .pipe(gulp.dest('./public/css'));
});

gulp.task('webpack', function(){
  webpackConfig.plugins = webpackConfig.plugins.concat();

  webpack(webpackConfig, function (err, stats) {
    if (err) throw new gutil.PluginError('webpack', err);

    gutil.log('webpack', stats.toString({ colors: true }));
  });
});

gulp.task('imagemin', function(){
  gulp.src(['./static/img/**/*'])
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('./public/img'));
});