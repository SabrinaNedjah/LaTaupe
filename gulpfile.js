var gulp = require('gulp'); // Call of Gulp
var plugins = require('gulp-load-plugins')(); // Loading plugins from package.json

// Order the scss
gulp.task('scss', function() {
  return gulp.src('app/scss/**/*.scss')
		.pipe(plugins.csscomb())
    .pipe(gulp.dest('app/scss/'));
});

// Compile and autoprefix the css
gulp.task('css', function() {
  return gulp.src('app/scss/**/*.scss')
    .pipe(plugins.sass())
    .pipe(plugins.autoprefixer())
		.pipe(plugins.csscomb())
    .pipe(gulp.dest('app/css/'));
});

// Minifying css
gulp.task('minCss', function() {
  return gulp.src('app/css/**/*.css')
    .pipe(plugins.rename({
      suffix: '.min'
    }))
    .pipe(plugins.cleanCss())
    .pipe(gulp.dest('dist/css/'));
});

// Minifying images
gulp.task('minImages', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(plugins.imagemin({
      interlaced: true
    }))
  .pipe(gulp.dest('dist/images'))
});

//JS
gulp.task('html', function() {
  return gulp.src('app/*.html')
  .pipe(gulp.dest('dist/'))
})

// Apply the "css" task to each change
gulp.task('watch', function () {
  gulp.watch('app/scss/**/*.scss', ['css']);
});