'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var mainBowerFiles = require('main-bower-files');
var del = require('del');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('styles', function() {
	return gulp.src(['dev/styles/*.less', '!variables.less'])
	.pipe(plugins.order([
		'fontface.less',
		'style.less',
		'responsive.less'
	]))
    .pipe(plugins.less())
    .pipe(plugins.autoprefixer('last 5 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(plugins.concatCss('main.css'))
    .pipe(gulp.dest('dev/.tmp'))
	.pipe(reload({stream:true}));
});

gulp.task('scripts', function() {
	return gulp.src('dev/scripts/*.js')
	.pipe(plugins.order([
		'plugins.js',
		'main.js'
	]))
	.pipe(plugins.jshint())
	.pipe(plugins.jshint.reporter('jshint-stylish'))
	.pipe(plugins.jshint.reporter('fail'))
	.pipe(plugins.concat('main.js'))
	.pipe(gulp.dest('dev/.tmp'));
});

gulp.task('clear_cache', function (done) {
    return plugins.cache.clearAll(done);
});

gulp.task('images', ['clear_cache'], function() {
	return gulp.src('dev/images/*')
	.pipe(plugins.cache(plugins.imagemin({
        optimizationLevel: 3,
        progressive: true,
        interlaced: true
    })))
	.pipe(gulp.dest('public/images'));
});

gulp.task('fonts', function() {
	return gulp.src(['dev/**/fonts/*.eot', 'dev/**/fonts/*.woff', 'dev/**/fonts/*.svg', 'dev/**/fonts/*.ttf'])
	.pipe(plugins.flatten())
	.pipe(gulp.dest('public/fonts'));
});

gulp.task('extra', function() {
	return gulp.src(['dev/**/*.*', '!dev/*.html', '!dev/bower_components/**', '!dev/scripts/**', '!dev/styles/**', '!dev/images/**', '!dev/.tmp/**', '!dev/.tmp'], { dot: true })
	.pipe(gulp.dest('public'));
});

gulp.task('inject', function () {
    return gulp.src('dev/*.html')
    .pipe(plugins.inject(gulp.src(mainBowerFiles(), {read: false}), {name: 'bower', relative: true}))
    .pipe(plugins.inject(gulp.src('dev/bower_components/**/modernizr.js', {read: false}), {name: 'modernizr', relative: true}))
    .pipe(gulp.dest('dev'));
});

gulp.task('start', function() {
    gulp.start('styles', 'scripts', 'inject');
});

gulp.task('clean', function(cb) {
    del(['public', 'dev/.tmp'], cb);
});

gulp.task('deploy', ['inject'], function () {
	var gulpif = require('gulp-if');
    var assets = plugins.useref.assets();
    return gulp.src('dev/*.html')
    .pipe(assets)
    .pipe(gulpif('*.js', plugins.uglify()))
    .pipe(gulpif('*.css', plugins.csso()))
    .pipe(assets.restore())
    .pipe(plugins.useref())
    .pipe(gulp.dest('public'));
});

gulp.task('build', ['start'], function() {
    gulp.start('deploy', 'images', 'fonts', 'extra');
});

gulp.task('watch', function() {
	gulp.watch('dev/styles/**/*.less', ['styles']);
	gulp.watch('dev/scripts/**/*.js', ['scripts']);
});

gulp.task('serve', ['watch'], function() {
	browserSync({
	server: {
	  baseDir: 'dev'
	}
	});
	gulp.watch(['*.html', '.tmp/*.css', '.tmp/*.js'], {cwd: 'dev'}, reload);
});

gulp.task('default', ['clean'], function() {
	gulp.start('start', 'serve');
});