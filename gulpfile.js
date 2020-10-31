const { series, src, dest, watch, parallel } = require('gulp');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const babel = require("gulp-babel");
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require("gulp-cssnano");
const browsersync = require('browser-sync').create();


function copyVendorJS() {
  return src(['./node_modules/jquery/dist/jquery.min.js'])
    .pipe(concat('vendors.min.js'))
    .pipe(dest('./dist/vendors-js'));
}

function copyVendorCss() {
  return src('./src/common/css/*.css')
    .pipe(concat('vendors.css'))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
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

function server(cb) {
  browsersync.init({
    server: {
      baseDir: './dist',
    },
  });

  watch('./src/**/*.html', series(copyHtml, reloadBrowser));
  watch('./src/**/*.js', series(copyJS, reloadBrowser));
  watch('./src/**/*.css', series(copyCss, reloadBrowser));
  cb();
}

function reloadBrowser(cb) {
  browsersync.reload();
  cb();
}

module.exports = {
  build: parallel(copyHtml, copyCss, copyJS, copyVendorJS, copyVendorCss),
  serve: series(copyHtml, copyCss, copyJS, copyVendorJS, copyVendorCss, server),
};