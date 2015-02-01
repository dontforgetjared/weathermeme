// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    jasmine = require('gulp-jasmine')
    source      = require('vinyl-source-stream'), // makes browserify bundle compatible with gulp
    streamify   = require('gulp-streamify'),
    browserify  = require('browserify'),
    karma = require('karma').server;

// Styles
gulp.task('styles', function() {
  return gulp.src('src/styles/main.scss')
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('assets/styles'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('assets/styles'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Test JS
gulp.task('test', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});

// Concatenate, Browserify & Minify JS
gulp.task('scripts', function() {
    return browserify('./src/js/app.js').bundle()
        .pipe(source('main.min.js'))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest('./assets/js'));
});

// gulp.task('lib', function() {
//   console.log(mainBowerFiles({
//             filter: /.js/i,
//             paths: {
//                 bowerDirectory: 'bower_components',
//                 bowerJson: 'bower.json'
//             }
//         }));
//     return gulp.src(mainBowerFiles({
//             filter: /.js/i,
//             paths: {
//                 bowerDirectory: 'bower_components',
//                 bowerJson: 'bower.json'
//             }
//         }))
//         .pipe(concat('lib.js'))
//         .pipe(gulp.dest('assets/scripts/lib'))
//         .pipe(rename({suffix: '.min'}))
//         //.pipe(uglify())
//         .pipe(gulp.dest('assets/scripts/lib'))
//         .pipe(notify({ message: 'Libs task complete' }));
// });

// Images
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('assets/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Clean
gulp.task('clean', function() {
  return gulp.src(['assets/styles', 'assets/images'], {read: false})
    .pipe(clean());
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'images');
});

// Watch
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('src/styles/**/*.scss', ['styles']);

  // Watch .js files
  //gulp.watch('src/scripts/**/*.js', ['scripts']);

  // Watch image files
  gulp.watch('src/images/**/*', ['images']);

  // Create LiveReload server
  var server = livereload();
  console.log('RELOADED');
  livereload.listen();

  // Watch any files in assets/, reload on change
  gulp.watch(['assets/**']).on('change', function(file) {
    server.changed(file.path);
  });

});