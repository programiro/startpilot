/**
 * Gulp
 */
const gulp = require('gulp');
const packageJson = require('./package.json');
require('./Gulp/styles');
require('./Gulp/images');
require('./Gulp/scripts');
require('./Gulp/fonts');
require('./Gulp/clean');
require('./Gulp/misc');

/**
 * Task
 */
gulp.task('watch', function () {
    gulp.watch(packageJson.config.path.src + '/Scss/**/*.scss', gulp.series('css'));
    gulp.watch(packageJson.config.path.src + '/Images/**/*', gulp.series('image'));
    gulp.watch(packageJson.config.path.src + '/Fonts/**/*', gulp.series('fonts'));
    gulp.watch(packageJson.config.path.src + '/Misc/**/*', gulp.series('misc'));
    gulp.watch([packageJson.config.path.src + '/JavaScript/**/*.js', packageJson.config.path.src + '/JavaScript/**/*.json'], gulp.series('javascript'));
});
gulp.task('build', gulp.parallel('clean', 'css', 'fonts', 'misc', 'image', 'javascript'));
gulp.task('ci', gulp.parallel('css-lint', 'build'));
gulp.task('default', gulp.series('build', gulp.parallel('watch')));
