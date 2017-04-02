var gulp = require('gulp'),
  minifyHTML = require('gulp-minify-html');


gulp.task('default', function() {
  // place code for your default task here

  var opts = {
    comments: true,
    spare: true
  };

  gulp.src('src/**/*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('./'))
});