import gulp from 'gulp';
import babel from 'gulp-babel';
import babelify from 'babelify';
import browserify from 'browserify';
import source from 'vinyl-source-stream';

gulp.task('default', () => {
  return gulp.src('./src/js/script.js')
    .pipe(babel())
    .pipe(gulp.dest('./'));
});
