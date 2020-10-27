const { series, src, dest, watch } = require('gulp');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const babel = require("gulp-babel");
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require("gulp-cssnano");


function copyVendorJS() {
  return src(['./node_modules/jquery/dist/jquery.min.js',
    './src/fancybox/jquery.fancybox.min.js'])
    .pipe(concat('vendors.min.js'))
    .pipe(dest('./dist/vendors-js'));
}

function copyVendorCss() {
  return src('./src/fancybox/jquery.fancybox.min.css')
    .pipe(concat('vendors.min.css'))
    .pipe(dest('./dist/vendors-css'));
}

function copyHtml() {
  return src('./src/index.html')
    .pipe(dest('./dist'));
}

function copyJS() {
  return src('./src/**/*.js')
    .pipe(babel({
      presets: ["@babel/preset-env"]
    }))
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('./dist/js'));
}

function copyCss() {
  return src('./src/styles/*.css')
    .pipe(concat('style.css'))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('./dist/styles'));
}

function cleanDist() {
  return src('./dist', { read: false })
    .pipe(clean());
}

function watchFiles() {
  watch('./src/**/*.js', function rebuild() {
    return copyJS();
  });
  watch('./src/**/*.css', function rebuild() {
    return copyCss();
  });
}

module.exports = {
  build: series(cleanDist, copyHtml, copyCss, copyJS, copyVendorJS, copyVendorCss),
  serve: series(cleanDist, copyHtml, copyCss, copyJS, copyVendorJS, copyVendorCss, watchFiles),
};