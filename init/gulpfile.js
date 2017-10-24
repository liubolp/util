var browserSync = require('browser-sync').create();
var gulp = require('gulp')
gulp.task('browser-sync',function () {
	var files = [
			'**/*.html',
			'**/*.css',
			'**/*.js'
	];
	browserSync.init(files,{
		proxy:'http://localhost:63342/init/src/index.html?_ijt=leivgq5hscb50ck3s3c83t04gt'
	})
})