var gulp = require('gulp')
var less = require('gulp-less')
var soucemaps = require('gulp-sourcemaps')
var postcss = require('gulp-postcss') // css后处理文件
var broswerSync = require('browser-sync') // 本地和远程调试
var base64 = require('gulp-base64') // 将小图片转为base64
var cssmin = require('gulp-cssmin') // 压缩css文件
var rename = require('gulp-rename') // 重命名文件
var del = require('del') // 删除目录和文件
var babel = require('gulp-babel') // 转换es6
var uglify = require('gulp-uglify') // 压缩js文件
var imagemin = require('gulp-imagemin') // 压缩图片
var watch = require('gulp-watch') // 重新构建时只构建更改过的文件
var changed = require('gulp-changed') // 只传递更改过的文件
var pug = require('gulp-pug')

gulp.task('css', function () {
  return gulp.src(['src/*/css/*.less'])
    .pipe(watch('src/*/css/*.less'))
    .pipe(less().on('error', function (e) {
      console.error(e.message)
      this.emit('end')
      gulp.watch('src/*/css/*.less', ['css'])
    }))
    .pipe(base64({
      extensions: ['png', 'jpg', 'jpeg'],
      maxImageSize: 5 * 1024,
      debug: false
    }))
    .pipe(postcss([require('precss'), require('autoprefixer')(['iOS >= 7', 'Android >= 4.1'])]))
    .pipe(gulp.dest('dist'))
    .pipe(broswerSync.reload({stream: true}))
})
gulp.task('css:min', function () {
  gulp.src(['dist/**/*.css'])
    .pipe(soucemaps.init())
    .pipe(cssmin())
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(soucemaps.write('.'))
    .pipe(gulp.dest('dist'))
})

gulp.task('js', function () {
  return gulp.src(['src/*/js/*.js'])
    .pipe(watch('src/*/js/*.js'))
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
      gulp.watch('src/*/js/*.js', ['js'])
    }))
    .pipe(gulp.dest('dist'))
    .pipe(broswerSync.reload({stream: true}))
})
gulp.task('js:min', function () {
  return gulp.src('dist/**/*.js')
    .pipe(soucemaps.init())
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(soucemaps.write('.'))
    .pipe(gulp.dest('dist'))
})

gulp.task('html', function () {
  return gulp.src('src/*/*.html')
    .pipe(watch('src/*/*.html'))
    .pipe(gulp.dest('dist'))
    .pipe(broswerSync.reload({stream: true}))
})

gulp.task('pug', function () {
  return gulp.src('src/*/*.pug')
    .pipe(watch('src/*/*.pug'))
    .pipe(pug({
      // pretty: true
      cache: true
    })).on('error', function (e) {
      console.log(e.message)
      this.emit('end')
      gulp.watch('src/*/*.pug', ['pug'])
    })
    .pipe(gulp.dest('dist'))
    .pipe(broswerSync.reload({stream: true}))
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
gulp.task('default', ['css', 'html', 'pug', 'js', 'assets'])
gulp.task('server', ['server'])
