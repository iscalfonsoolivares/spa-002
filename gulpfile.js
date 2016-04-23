
var env               = process.env.NODE_ENV || 'development';

var fs                = require('fs');
var gulp              = require("gulp");
var plugins           = require('gulp-load-plugins')({camelize: true});

/**
 * 
 * Development flow
 * 
 */

gulp.task("html", function() {
  var stream = gulp.src('public/*.html')
  .pipe(plugins.connect.reload()); 
  return stream;
});

gulp.task('minify-js', ['minify-templates','copy-json'], function (){
  var stream = gulp.src('scripts/**/*.js')
    .pipe(plugins.sourcemaps.init({ loadMaps: true }))
    .pipe(plugins.ngAnnotate())
    .pipe(plugins.uglify())
    .pipe(plugins.concat('app.js'))
    .pipe(plugins.header(getCopyrightVersion(), {version: getVersion()}))
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest('public/assets/js/'))
    .pipe(plugins.connect.reload());    
  return stream;
});

gulp.task('minify-templates', function () {
  var stream = gulp.src('scripts/**/*.html')
    .pipe(plugins.htmlmin())
    .pipe(gulp.dest('public/assets/js/'))    
  return stream;  
});

gulp.task('copy-json', function() {
  var stream = gulp.src('scripts/**/*.json')
   .pipe(gulp.dest('public/assets/js/'))
  return stream;
});

gulp.task('compile-sass', function () {
  var stream = gulp.src('styles/**/*.scss')
    .pipe(plugins.sourcemaps.init({ loadMaps: true }))
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    .pipe(plugins.autoprefixer()) 
    .pipe(plugins.cleanCss())    
    .pipe(plugins.header(getCopyrightVersion(), {version: getVersion()}))
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest('public/assets/css/'))
    .pipe(plugins.connect.reload());
  return stream;  
});

gulp.task('watch', function() { 
    gulp.watch('styles/**/*.scss', ['compile-sass']);
    gulp.watch('scripts/**/*.js', ['minify-js']);
    //gulp.watch('resources/images/**/*.{jpg,png,gif}');
    gulp.watch('scripts/**/*.html', ['minify-templates']);
    gulp.watch('scripts/**/*.json', ['copy-json']);
    gulp.watch('public/*.html', ['html']); 
});

gulp.task('connect', function() { 
  plugins.connect.server({
    root: './public/', 
    port: 8000, 
    livereload: true 
  });
});

gulp.task('default', ['minify-js', 'compile-sass', 'watch', 'connect'], function() {
  //Now open in browser 
  var stream = gulp.src("") 
  .pipe(plugins.open({ 
    app: "google chrome", 
    uri: "http://localhost:8000"
  })); 
  return stream; 
});


/**
 * 
 * QA related tasks
 * 
 */

gulp.task('jslint', function () {
    gulp.src('scripts/**/*.js')
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter());
});


/**
 * 
 * Auxiliary functions
 * 
 */

function getVersion() {
    return fs.readFileSync('Version');
};
 
function getCopyrightVersion() {
    return fs.readFileSync('Copyright');
};
