var gulp = require('gulp'),
   watch = require('gulp-watch'),
   sass = require('gulp-sass');
   cssnano = require('gulp-cssnano'),
   rename = require('gulp-rename'),
   browserSync = require('browser-sync'),
   autoprefixer = require('autoprefixer');

var sassFiles = 'app/sass/**/*.scss';

gulp.task('watch', function() {
   browserSync.init({
      server: {
         baseDir: 'app'
      }
   });

   watch('app/index.html', function() {
      browserSync.reload();
   });

   watch('./app/sass/**/*.scss', function() {
      compileSass();
      injectCSS();
   });
});

function compileSass() {
   return gulp.src(sassFiles)
      .pipe(sass().on('error', sass.logError))
      .pipe(rename('style.css'))
      .pipe(gulp.dest('app/css'));
}

function injectCSS() {
   return gulp.src('app/css/style.css')
      .pipe(browserSync.stream());
}