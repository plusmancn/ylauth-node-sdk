'use strict';
var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();

// 生成项目文档
gulp.task('jsdoc',plugins.shell.task(['./node_modules/.bin/jsdoc -c jsdoc.conf.json']));

// 开启文档监听 
gulp.task('watch-doc',function(){
  gulp.watch(['lib/*.js','README.md'], ['jsdoc']);
});