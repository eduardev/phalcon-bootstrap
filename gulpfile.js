/* 
 * The MIT License
 *
 * Copyright 2015 Eduardo Pereira <mail@edu.ardo.pt>.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * Some initial configurations
 */

// Define default destination folder
var dest			= 'public/';
// Define our local application JS file(s)
var jsFiles			= ['assets/js/*'];
// Define our local application SCSS file(s) 
// (differet vars, because we need to watch all, but we might only use one with imports for task)
var cssFiles		= ['assets/scss/main.scss'];
var cssFilesWatch	= ['assets/scss/**/*.scss'];



/**
 * Start gulp code
 */

// Include Gulp
var gulp = require('gulp');

// Include plugins
var plugins = require("gulp-load-plugins")({
	pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
	replaceString: /\bgulp[\-.]/
});

/**
 * Javascript task
 */
gulp.task('js', function() {
	// Vendor files - from main bower files
	gulp.src(plugins.mainBowerFiles())
		.pipe(plugins.filter('*.js'))
		.pipe(plugins.sourcemaps.init())
		// Set a custom order, if necessary
		//.pipe(plugins.order([
		//	'YOUR-FILE.js',
		//	'*'
		//]))
		.pipe(plugins.uglify())
		.pipe(plugins.concat('vendor.js'))
		.pipe(plugins.sourcemaps.write('.'))
		.pipe(gulp.dest(dest + 'js'));
	
	// Main application files
	gulp.src(jsFiles)
		.pipe(plugins.filter('*.js'))
		.pipe(plugins.jshint())
		.pipe(plugins.jshint.reporter('jshint-stylish'))
		.pipe(plugins.sourcemaps.init())
		// Set a custom order, if necessary
		//.pipe(plugins.order([
		//	'YOUR-FILE.js',
		//	'*'
		//]))
		.pipe(plugins.uglify())
		.pipe(plugins.concat('main.js'))
		.pipe(plugins.sourcemaps.write('.'))
		.pipe(gulp.dest(dest + 'js'));
});


/**
 * CSS task
 */
gulp.task('css', function() {
	// Set options for sass compilation
	var sassOptions = {
		errLogToConsole: true,
		outputStyle: 'compressed'
	};
	// Vendor files - from main bower files
	gulp.src(plugins.mainBowerFiles())
		.pipe(plugins.filter('*.scss'))
		// Set a custom order, if necessary
		//.pipe(plugins.order([
		//	'_bootstrap.scss',
		//	'*'
		//]))
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.concat('vendor.css'))
		.pipe(plugins.sass(sassOptions).on('error', plugins.sass.logError))
		.pipe(plugins.autoprefixer())
		.pipe(plugins.sourcemaps.write('.'))
		.pipe(gulp.dest(dest + 'css'));
		
	// Application files
	gulp.src(cssFiles)
		.pipe(plugins.filter('*.scss'))
		// Set a custom order, if necessary
		//.pipe(plugins.order([
		//	'YOUR_FILE.scss',
		//	'*'
		//]))
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.concat('main.css'))
		.pipe(plugins.sass(sassOptions).on('error', plugins.sass.logError))
		.pipe(plugins.autoprefixer())
		.pipe(plugins.sourcemaps.write('.'))
		.pipe(gulp.dest(dest + 'css'));
});



// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
	gulp.watch(jsFiles,			['js']);
	gulp.watch(cssFilesWatch,	['css']);
});