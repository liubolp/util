var browserSync = require('browser-sync').create()
var files = [
  'dist/**/*.html',
  'dist/**/*.css',
  'dist/**/*.js'
]
browserSync.init({
  files: files,
  server: {
    baseDir: 'dist'
  }
})
