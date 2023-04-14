var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    header = require('gulp-header'),
    pkg = require('./package.json'),
    cleanCSS = require('gulp-clean-css');
    watch = require('gulp-watch'),
    runSequence = require('run-sequence');;

gulp.task('js-vendor', function(done) {
    gulp.src([
    //   'raw_js_vendor/shopify-money.js',
    //   'raw_js_vendor/popper.min.js',
       'raw_js_vendor/jquery-3.6.3.min.js'
    //   'raw_js_vendor/bootstrap.js',
    //  'raw_js_vendor/slick.js'
    // 'raw_js_vendor/modernizr.custom.js',
    //   'raw_js_vendor/ml-pushmenu.js'
    ])
        .pipe(concat('theme-vendor.js'))
        //.pipe(uglify())
        .pipe(rename({suffix: '.min'})) // renaming file to myproject.min.css
        .pipe(gulp.dest('assets')) // saving file myproject.min.css to this directory
    done();
});

gulp.task('js', function(done) {
    gulp.src([
      'raw_js/global.js'
    //  'raw_js/section-*.js',
    //  'raw_js/cart.js',
    //  'raw_js/cart-drawer.js',
    //  'raw_js/theme-editor.js'
    ])
        .pipe(concat('theme-scripts.js'))
        //.pipe(uglify()) // uglifying this file
        .pipe(rename({suffix: '.min'})) // renaming file to myproject.min.js
        .pipe(gulp.dest('assets')) // save file to destination directory
    done();
});

gulp.task('css-components-sections', function(done) {
    gulp.src([
      //'raw_css/component-*.css',
      'raw_css/section-*.css'
    ])
        .pipe(concat('theme-css-components.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({suffix: '.min'})) // renaming file to myproject.min.css
        .pipe(gulp.dest('assets')) // saving file myproject.min.css to this directory
    done();
});

gulp.task('css-vendor', function(done) {
    gulp.src([
    //   'raw_css_vendor/bootstrap.css',
      'raw_css_vendor/slick.css',
      'raw_css_vendor/slick-theme.css'
    //   'raw_css_vendor/all.min.css'
    ])
        .pipe(concat('theme-css-vendors.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({suffix: '.min'})) // renaming file to myproject.min.css
        .pipe(gulp.dest('assets')) // saving file myproject.min.css to this directory
    done();
});

gulp.task('css', function(done) {
    gulp.src([
      'raw_css/base.css'
    ])
        .pipe(concat('theme.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({suffix: '.min'})) // renaming file to myproject.min.css
        .pipe(gulp.dest('assets')) // saving file myproject.min.css to this directory
    done();
});

var tasks = [
  'js',
  'js-vendor',
  'css-components-sections',
  'css-vendor',
  'css'
];

gulp.task('default', gulp.series(tasks, function (done) {
    done();
}));

gulp.task('watch', function(done) {

    gulp.watch("raw_css/!(*.min)*.css", gulp.series(['css-components-sections', 'css']));

    gulp.watch("raw_css_vendor/!(*.min)*.css", gulp.series(['css-vendor']));

    gulp.watch("raw_js/!(*.min)*.js", gulp.series(['js']));

    gulp.watch("raw_js_vendor/!(*.min)*.js", gulp.series(['js-vendor']));

    done();
});
