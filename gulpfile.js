'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const copy = require('gulp-copy');

gulp.task('sass', function () {
    return gulp.src('./src/assets/global.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./src/assets'));
    }
);
