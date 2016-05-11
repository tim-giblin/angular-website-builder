var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	stylish = require('jshint-stylish'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	sass = require('gulp-sass'),
	templateCache = require('gulp-angular-templatecache'),
	connect = require('gulp-connect'),
	addStream = require('add-stream'),
	ngAnnotate = require('gulp-ng-annotate'),
	ghPages = require('gulp-gh-pages');

var config = {
	appFolder : './app/',
	sassFolder : 'sass',
	cssFolder : 'css',
	jsFolder : 'js',
	vendorFolder : '/lib',
	outputFolder : './dist/',
	angularFolder: function() { return this.appFolder+this.jsFolder+'/app'},
	appJs : function() { return this.appFolder+this.jsFolder},
	appSass : function() { return this.appFolder+this.sassFolder },
	outputJs : function() { return this.outputFolder+this.jsFolder},
	outputSass : function() { return this.outputFolder+this.cssFolder },
};



//lint angular build
gulp.task('lint', function() {
	return gulp.src(config.angularFolder()+'/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter(stylish));
});

//move JS bower files to vendor folder
gulp.task('vendor_js_setup', function() {
	//angular
	return gulp.src([
		'./bower_components/angular/angular.min.js',
		
		'./bower_components/angular-ui-router/release/angular-ui-router.min.js',
		'./bower_components/angular-animate/angular-animate.min.js'
	]).pipe(gulp.dest(config.appJs()+config.vendorFolder));

});

//move Sass bower files to vendor folder
gulp.task('vendor_css_setup', function() {
	//skeleton framework
	return gulp.src([
		'./bower_components/skeleton-sass/skeleton/**/*.scss',
		'./bower_components/skeleton-sass/skeleton_template.scss'
	]).pipe(gulp.dest(config.appSass()+config.vendorFolder));

});

gulp.task('create_bundle',function() {
	//concat files into bundle.js
	return gulp.src([config.appJs()+config.vendorFolder+'/angular.min.js', config.appJs()+config.vendorFolder+'/*','!'+config.appJs()+config.vendorFolder+'/template.js'])
		.pipe(concat('bundle.js'))
		.pipe(gulp.dest(config.outputJs()));
});

//sass files
gulp.task('sass', function() {
	return gulp.src(config.appSass()+'/app.scss')
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(gulp.dest(config.outputSass()))
		.pipe(connect.reload());
});

//minify scripts
gulp.task('scripts', function() {
	return gulp.src([config.appJs()+config.vendorFolder+'/template.js', config.angularFolder()+'/app.module.js',config.angularFolder()+'/app.config.js',config.angularFolder()+'/app.run.js',config.angularFolder()+'/app.routes.js',config.angularFolder()+'/**/*.js'])
		.pipe(addStream.obj(angularTemplates()))
		.pipe(concat('all.js'))
		.pipe(ngAnnotate({add: true}))
		.pipe(uglify())
		.pipe(gulp.dest(config.outputJs()))
		.pipe(connect.reload());
});

function angularTemplates() {
	return gulp.src(config.angularFolder()+'/**/*.html')
		.pipe(templateCache('template.js', { module:'templates', standalone:true }))
		.pipe(gulp.dest(config.appJs()+config.vendorFolder))
}

gulp.task('html', function() {
	gulp.src(config.appFolder+'index.html')
		.pipe(gulp.dest(config.outputFolder))
		.pipe(connect.reload());
});


//create server
gulp.task('connect', function() {
	connect.server({
		root: config.outputFolder,
		livereload: true
	});
});

//deploy to Git Hub Pages
gulp.task('deploy', function() {
  return gulp.src(config.outputFolder+'**/*')
    .pipe(ghPages());
});

//watch
gulp.task('watch', function() {
	gulp.watch([config.appSass()+'/**/*.scss',config.appSass()+'/*.scss'], ['sass']);
	gulp.watch([config.angularFolder()+'/**/*.js',config.angularFolder()+'/*.js'], ['lint', 'scripts']);
	gulp.watch([config.appFolder+'index.html',config.angularFolder()+'/**/*.html'], ['scripts', 'html']);
});



//build task
gulp.task('build', ['vendor_js_setup','vendor_css_setup', 'create_bundle']);

//default task
gulp.task('default', ['lint', 'sass', 'scripts','html', 'connect', 'watch']);