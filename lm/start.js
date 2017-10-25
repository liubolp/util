var browserSync = require('browser-sync').create();
var files = [
	'src/**/*.html',
	'src/**/*.css',
	'src/**/*.js'
];
browserSync.init({
	files:files,
	server:{
		baseDir: 'src'
	}
})