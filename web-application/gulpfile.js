const compodoc = require('@compodoc/gulp-compodoc');
const gulp = require('gulp');
const responsive = require('gulp-responsive');

gulp.task("doc-serve", function(){
  return gulp
    .src("src/app/**/*.ts")
    .pipe(compodoc({
      output: "./../docs",
      tsconfig: "src/tsconfig.json",
      serve: true,
      name: "Smart Campus",
      theme: "postmark"
    }))
});

gulp.task("doc", function(){
  return gulp
    .src("src/app/**/*.ts")
    .pipe(compodoc({
      output: "./../docs",
      tsconfig: "src/tsconfig.json",
      serve: false,
      name: "Smart Campus",
      theme: "postmark"
    }))
});

gulp.task('images', function () {
  return gulp.src('src/assets/imgs/**')
    .pipe(responsive({
      '**': [
        {
        width: 375,
        rename: {
          suffix: '-sm',
          extname: '.png',
        }
      }, {
        width: 375 * 2,
        rename: {
          suffix: '-sm@2x',
          extname: '.png'
        }
      }, {
        width: 480,
        rename: {
          suffix: '-md',
          extname: '.png',
        }
      }, {
        width: 480 * 2,
        rename: {
          suffix: '-md@2x',
          extname: '.png',
        }
      }, {
        width: 768,
        rename: {
          suffix: '-lg',
          extname: '.png',
        }
      }, {
        width: 768 * 2,
        rename: {
          suffix: '-lg@2x',
          extname: '.png',
        }
      }, {
        width: 1900,
        rename: {
          suffix: '-xl',
          extname: '.png',
        },
        withoutEnlargement: true,
      }, {
        width: 1900 * 2,
        rename: {
          suffix: '-xl@2x',
          extname: '.png',
        },
        withoutEnlargement: true,
      },
    ]}, {
      quality: 80,
      progressive: true,
      withMetadata: false,
      errorOnEnlargement: false,
    }))
    .pipe(gulp.dest('./src/assets/imgs'));
});
