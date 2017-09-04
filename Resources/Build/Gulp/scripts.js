const gulp = require('gulp');
const browserify = require('browserify');

// eslint-disable-next-line no-unused-consts
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const packageJson = require('../package.json');
const rename = require('gulp-rename');
const eslint = require('gulp-eslint');
const concat = require('gulp-concat');
const rjs = require('gulp-requirejs');

gulp.task('javascript:lint', function () {
    'use strict';
    return gulp.src([packageJson.config.path.src + '/JavaScript/**/*.js', '!node_modules/**', '!'])
        .pipe(eslint({
            configFile: '.eslintrc.json'
        }))
        .pipe(eslint.format());
});

gulp.task('javascript:copy-json', function() {
    'use strict';
    return gulp.src(packageJson.config.path.src + '/JavaScript/**/*.json').pipe(gulp.dest(packageJson.config.path.dest + '/JavaScript'));
});

gulp.task('javascript:compile', function () {
    const bundler = browserify({
        entries: packageJson.config.path.src + '/JavaScript/main.js'
    }).transform('babelify', {presets: ['es2015']});

    const bundle = function () {
        return bundler
            .bundle()
            .pipe(source('main.js'))
            .pipe(buffer())
            .pipe(gulp.dest(packageJson.config.path.dest + '/JavaScript'))
            // .pipe(sourcemaps.init({loadMaps: true})) // Debug
            // Add transformation tasks to the pipeline here.
            .pipe(uglify())
            // .pipe(sourcemaps.write()) // Debug
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest(packageJson.config.path.dest + '/JavaScript'))
    };

    return bundle();
});

/**
 * Uglify javascript and copy to destination
 */
gulp.task('javascript', gulp.series('javascript:lint', 'javascript:compile', 'javascript:copy-json'));
