const compodoc = require('@compodoc/gulp-compodoc'),
      gulp = require('gulp');

gulp.task('doc-serve', function(){
  return gulp.src('src/app/**/*.ts/')
    .pipe(compodoc({
      output: './../docs',
      tsconfig: 'src/tsconfig.json',
      serve: true,
      name: 'Smart Campus',
      theme: 'postmark'
    }));
});

gulp.task('doc', function(){
  return gulp.src('src/app/**/*.ts')
    .pipe(compodoc({
      output: './../docs',
      tsconfig: 'src/tsconfig.json',
      serve: false,
      name: 'Smart Campus',
      theme: 'postmark'
    }));
});
