var gulp = require('gulp')
var less = require('gulp-less')
var soucemaps = require('gulp-sourcemaps')
var postcss = require('gulp-postcss')
var broswerSync = require('browser-sync')
var base64 = require('gulp-base64')
var cssmin = require('gulp-cssmin')
var rename = require('gulp-rename')
var del = require('del')
var babel = require('gulp-babel')
var uglify = require('gulp-uglify')
var imagemin = require('gulp-imagemin')
var watch = require('gulp-watch')

gulp.task('css', function () {
  return gulp.src(['src/**/*.less'])
    // .pipe(soucemaps.init())
    .pipe(watch('src/**/*.less'))
    .pipe(less().on('error', function (e) {
      console.error(e.message)
      this.emit('end')
    }))
    .pipe(base64({
      extensions: ['png', 'jpg', 'jpeg'],
      maxImageSize: 5 * 1024,
      debug: false
    }))
    .pipe(postcss([require('precss'), require('autoprefixer')(['iOS >= 7', 'Android >= 4.1'])]))
    // .pipe(soucemaps.write('.'))
    .pipe(gulp.dest('dist'))
})
gulp.task('css:min', function () {
  gulp.src(['dist/**/*.css'])
    .pipe(cssmin())
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest('dist'))
})

gulp.task('js', function () {
  return gulp.src(['src/**/*.js'])
    .pipe(watch('src/**/*.js'))
    .pipe(babel({
      presets: [
        ['env', {
          targets: {
            browsers: ['iOS >= 7', 'Android >= 4.1']
          }
        }]
      ],
      plugins: ['transform-runtime']
    }).on('error', function (e) {
      console.error(e.message)
      this.emit('end')
    }))
    .pipe(gulp.dest('dist'))
})
gulp.task('js:min', function () {
  return gulp.src('dist/**/*.js')
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest('dist'))
})

gulp.task('html', function () {
  return gulp.src('src/*/*.html')
    .pipe(watch('src/*/*.htm'))
    .pipe(gulp.dest('dist'))
})

gulp.task('assets', function () {
  return gulp.src('src/*/images/*')
    .pipe(watch('src/*/images/*'))
    .pipe(imagemin())
    .pipe(gulp.dest('dist'))
    .pipe(broswerSync.reload({stream: true}))
})

gulp.task('server', function () {
  broswerSync.init({
    files: ['dist/**/*.@(html|js|css)'],
    server: {
      baseDir: 'dist'
    }
  })
})

gulp.task('clean', function () {
  return del([
    'dist/**/*'
  ])
})

gulp.task('build', ['css:min', 'js:min'])
gulp.task('default', ['css', 'html', 'js', 'assets', 'server'])
