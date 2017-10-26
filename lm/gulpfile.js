var gulp = require('gulp')
var less = require('gulp-less')
var soucemaps = require('gulp-sourcemaps')
var postcss = require('gulp-postcss')
var broswerSync = require('browser-sync')
gulp.task('css', function () {
  return gulp.src(['src/**/*.less', '!src/common/*.less'])
    //.pipe(soucemaps.init())
    .pipe(less().on('error', function(e) {
      console.error(e.message);
      this.emit('end');
    }))
    .pipe(postcss([require('precss'), require('autoprefixer')(['iOS >= 7', 'Android >= 4.1'])]))
    //.pipe(soucemaps.write('.'))
    .pipe(gulp.dest('src'))
    .pipe(broswerSync.reload({stream: true}))
})
gulp.task('server', function () {
  broswerSync.init({
    files: ['src/**/*.html', 'src/**/*.js'],
    server: {
      baseDir: 'src'
    }
  })
})
gulp.task('watch', function () {
  gulp.watch(['src/**/*.less'], ['css'])
})
gulp.task('default', ['css'], function () {
  gulp.start('watch')
  gulp.start('server')
})
