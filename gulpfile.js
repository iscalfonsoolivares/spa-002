
var env               = process.env.NODE_ENV || 'development';

var fs                = require('fs');
var gulp              = require("gulp");
var plugins           = require('gulp-load-plugins')({camelize: true});

/**
 * 
 * Files
 * 
 */

var files = {};

files.vendorFonts = [
                      'bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.eot',
                      'bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.svg',
                      'bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf',
                      'bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff',
                      'bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2'
                    ];

files.vendorCss = [
                    'bower_components/bootstrap/dist/css/bootstrap.min.css',
                    // 'bower_components/bootstrap/dist/css/bootstrap-theme.min.css',
                    // 'bower_components/bootstrap-additions/dist/bootstrap-additions.min.css',
                    // 'bower_components/angular-motion/dist/angular-motion.min.css',
                  ];

files.vendorJs = [    
                    // 'bower_components/lodash/dist/lodash.min.js',  
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'bower_components/angular/angular.min.js',
                    'bower_components/angular-route/angular-route.min.js',
                    // 'bower_components/angular-animate/angular-animate.min.js',
                    // 'bower_components/angular-strap/dist/angular-strap.min.js',
                    // 'bower_components/angular-strap/dist/angular-strap.tpl.min.js',
                    // 'bower_components/restangular/dist/restangular.min.js',
                    'bower_components/angular-smart-table/dist/smart-table.min.js'
                  ];

files.appJs = ['scripts/**/*module.js', 'scripts/**/*.js','scripts/*.js'];

files.appCss = [];

files.appJson = 'scripts/**/*.json';

files.appHtml = 'scripts/**/*.html';

files.appSass = 'styles/**/*.scss';

/**
 * 
 * Development
 * 
 */

gulp.task("html", function() {
  var stream = gulp.src('dist/*.html')
  .pipe(plugins.connect.reload()); 
  return stream;
});


gulp.task('vendor-copy-fonts', function() {
    
  var stream = gulp.src( files.vendorFonts )
   .pipe(gulp.dest('dist/fonts/'))
  return stream;
  
});

gulp.task("vendor-concat-css", function() {
  
  var stream = gulp.src(files.vendorCss)
    .pipe(plugins.sourcemaps.init({ loadMaps: true }))
    .pipe(plugins.concat('vendor.css'))  
    .pipe(plugins.sourcemaps.write('./')) 
    .pipe(gulp.dest('dist/css/'))
    .pipe(plugins.connect.reload());    
  
  return stream;
  
});

gulp.task("vendor-concat-js", function() {
  
  var stream = gulp.src(files.vendorJs)
    .pipe(plugins.sourcemaps.init({ loadMaps: true }))
    .pipe(plugins.concat('vendor.js'))  
    .pipe(plugins.sourcemaps.write('./')) 
    .pipe(gulp.dest('dist/js/'))
    .pipe(plugins.connect.reload());    
  
  return stream;
  
});

gulp.task('app-minify-js', ['minify-templates','copy-json'], function (){
  var stream = gulp.src(files.appJs)
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.ngAnnotate())
    .pipe(plugins.uglify())
    .pipe(plugins.concat('app.js'))
    .pipe(plugins.header(getCopyright(), {version: getVersion()}))
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest('dist/js/'))
    .pipe(plugins.connect.reload());    
  return stream;
});

gulp.task('minify-html', function () {
  
  var stream = gulp.src(files.appHtml)
    .pipe(plugins.htmlmin({collapseWhitespace: true, empty: true, removeComments: true}))
    .pipe(gulp.dest('dist/js/'))
    .pipe(plugins.connect.reload());
  return stream;  
  
});

gulp.task('minify-templates', function () {
  
  function fileNameOnly(url){
    return url.replace(/^.*[\\\/]/, '');
  };
    
  var stream = gulp.src(files.appHtml)
    .pipe(plugins.angularTemplatecache('app_templates_module.js', { transformUrl: fileNameOnly, moduleSystem: 'IIFE', standalone:true, module:'app.templates'}))
    .pipe(gulp.dest('scripts/app/templates'))
    .pipe(plugins.connect.reload());
  return stream;  
  
});


gulp.task('copy-json', function() {
  var stream = gulp.src(files.appJson)
   .pipe(gulp.dest('dist/js/'))
   .pipe(plugins.connect.reload());
  return stream;
});

gulp.task('compile-sass', function () {
  var stream = gulp.src(files.appSass)
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    .pipe(plugins.autoprefixer()) 
    .pipe(plugins.cleanCss())    
    .pipe(plugins.header(getCopyright(), {version: getVersion()}))
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest('dist/css/'))
    .pipe(plugins.connect.reload());
  return stream;  
});

gulp.task('minify-css', function () {
  
  
  var stream = gulp.src( files.appCss )
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.concat('styles.css'))
    .pipe(plugins.autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		})) 
    .pipe(plugins.cleanCss())    
    .pipe(plugins.header(getCopyright(), {version: getVersion()}))
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest('dist/css/'))
    .pipe(plugins.connect.reload());
  return stream;  
});

gulp.task('watch', function() { 
    gulp.watch('styles/**/*.scss', ['compile-sass']);
    gulp.watch('styles/**/*.css', ['minify-css']);
    gulp.watch('scripts/**/*.js', ['app-minify-js']);
    //gulp.watch('resources/images/**/*.{jpg,png,gif}');
    gulp.watch('scripts/**/*.html', ['minify-templates']);
    gulp.watch('scripts/**/*.json', ['copy-json']);
    gulp.watch('dist/*.html', ['html']); 
});

gulp.task('connect', function() { 
  plugins.connect.server({
    root: './dist/', 
    port: 8000, 
    livereload: true 
  });
});

gulp.task('default', ['vendor-copy-fonts', 'vendor-concat-css', 'vendor-concat-js', 'app-minify-js', 'compile-sass', 'watch', 'connect'], function() {
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

gulp.task('jshint', function () {
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
 
function getCopyright() {
    return fs.readFileSync('Copyright');
};
