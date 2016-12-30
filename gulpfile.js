var gulp                = require('gulp');                          //http://gulpjs.com/
var uglify              = require('gulp-uglify');                   //https://www.npmjs.com/package/gulp-uglify
var plumber             = require('gulp-plumber');                  //https://www.npmjs.com/package/gulp-plumber
var csswring            = require('csswring');                      //https://github.com/ben-eb/cssnano
var postcss             = require('gulp-postcss');                  //https://github.com/postcss/postcss
var stylus              = require('gulp-stylus');                   //http://stylus-lang.com/
var autoprefixer        = require('autoprefixer');                  //https://github.com/postcss/autoprefixer
var lost                = require('lost');                          //https://github.com/peterramsing/lost
var nib                 = require('nib');                           //http://tj.github.io/nib/
var rupture             = require('rupture');                       //https://github.com/jenius/rupture
var browserSync         = require('browser-sync').create();         //https://www.browsersync.io
var fallback            = require('connect-history-api-fallback');  //https://github.com/bripkens/connect-history-api-fallback
var webpack             = require('webpack-stream');                //https://github.com/shama/webpack-stream
var replace             = require('gulp-replace');                  //https://www.npmjs.com/package/gulp-replace
var imagemin            = require('gulp-imagemin');
var htmlmin             = require('gulp-htmlmin');
var gulpSequence        = require('gulp-sequence');

//**********************************************//
//  INIT VARIABLE
//**********************************************//

//  INIT DIRECTORIES
var source = 'src/';
var develop = 'dev/';
var distribution = 'dist/';


//**********************************************//
//  STYLE TASK
//**********************************************//

gulp.task('style:dist', function () {
    return gulp.src(source + 'styles/style.styl')
        .pipe(plumber())
        .pipe(stylus({
            use : [
                nib(),
                rupture()
            ]
        }))
        .pipe(postcss([
            lost,
            autoprefixer,
            csswring
        ]))
        .pipe(gulp.dest(distribution + 'css'));
});

gulp.task('style:dev', function () {
    return gulp.src(source + 'styles/style.styl')
        .pipe(plumber())
        .pipe(stylus({
            use : [
                nib(),
                rupture()
            ]
        }))
        .pipe(postcss([
            lost,
            autoprefixer
        ]))
        .pipe(gulp.dest(develop + 'css'))
        .pipe(browserSync.stream());
});

//**********************************************//
//  SCRIPT TASK
//**********************************************//

gulp.task('webpack:dist', function() {
    return gulp.src(source + 'app/main.ts')
        .pipe(plumber())
        .pipe(webpack( require('./webpack.dist.js') ))
        .pipe(gulp.dest( distribution + 'js' ));
});

gulp.task('webpack:dev', function() {
    return gulp.src(source + 'app/main.ts')
        .pipe(plumber())
        .pipe(webpack( require('./webpack.config.js')))
        .pipe(gulp.dest( develop + 'js'))
        .pipe(browserSync.stream());
});


//**********************************************//
//  HTML TASK
//**********************************************//

gulp.task('index:dist', function(){
    gulp.src([source + 'index.html'])
        .pipe(replace('<script></script>','<script type="text/javascript" src="js/polyfills.js"></script> <script type="text/javascript" src="js/vendor.js"></script> <script type="text/javascript" src="js/app.js"></script>'))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest( distribution ));
});

gulp.task('index:dev', function(){
    gulp.src([source + 'index.html'])
        .pipe(replace('<script></script>','<script type="text/javascript" src="js/polyfills.js"></script> <script type="text/javascript" src="js/vendor.js"></script> <script type="text/javascript" src="js/app.js"></script>' ))
        .pipe(gulp.dest( develop ))
        .pipe(browserSync.stream());
});

gulp.task('views:dist', function () {
    return gulp.src(source + 'views/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(distribution + 'views'));
});

gulp.task('views:dev', function () {
    return gulp.src(source + 'views/**/*.html')
        .pipe(gulp.dest(develop + 'views'));
});

//**********************************************//
//  FONTS TASK
//**********************************************//

gulp.task('font:dist',function(){
    return gulp.src(source + 'fonts/**/')
        .pipe(gulp.dest(distribution + 'fonts'));
});
gulp.task('font:dev',function(){
    return gulp.src(source + 'fonts/**/')
        .pipe(gulp.dest(develop + 'fonts'));
});
gulp.task('favicon:dist',function(){
    return gulp.src(source + 'favicon.ico')
        .pipe(gulp.dest(distribution));
});
gulp.task('favicon:dev',function(){
    return gulp.src(source + 'favicon.ico')
        .pipe(gulp.dest(develop));
});

//**********************************************//
//  IMAGES TASK
//**********************************************//

gulp.task('img:dist',function(){
    return gulp.src(source + 'img/**/')
        .pipe(imagemin())
        .pipe(gulp.dest(distribution + 'img'));
});
gulp.task('img:dev',function(){
    return gulp.src(source + 'img/**/')
        .pipe(imagemin())
        .pipe(gulp.dest(develop + 'img'));
});

//**********************************************//
//  SOUNDS TASK
//**********************************************//

gulp.task('media:dist',function(){
    return gulp.src(source + 'media/**/')
        .pipe(gulp.dest(distribution + 'media'));
});
gulp.task('media:dev',function(){
    return gulp.src(source + 'media/**/')
        .pipe(gulp.dest(develop + 'media'));
});

//**********************************************//
//  LOCAL SERVER
//**********************************************//

gulp.task('browser-sync', function () {
    browserSync.init({
        server:{
            baseDir: develop,
            middleware: [ fallback() ]
        },
        open:true
    });
});

//**********************************************//
//  UTILITY
//**********************************************//


//**********************************************//
//  WATCH
//**********************************************//

gulp.task('watch', function () {
    gulp.watch(source + 'app/**/*.ts',      ['webpack:dev']);
    gulp.watch(source + 'styles/**/*.styl', ['style:dev']);
    gulp.watch(source + 'index.html',       ['index:dev']);
    gulp.watch(source + 'views/**/*.html',  ['views:dev']);
    gulp.watch(source + 'img/**/',          ['img:dev']);
    gulp.watch(source + 'media/**/',        ['media:dev']);
    gulp.watch(source + 'fonts/**/',        ['font:dev']);
});


gulp.task('test',    [ 'style:dev', 'webpack:dev', 'index:dev', 'views:dev', 'font:dev', 'img:dev', 'favicon:dev', 'media:dev']);
gulp.task('dev',    gulpSequence([ 'style:dev', 'webpack:dev', 'index:dev', 'views:dev', 'font:dev', 'img:dev', 'favicon:dev', 'media:dev'],'init'));
gulp.task('dist',   [ 'style:dist', 'webpack:dist', 'index:dist', 'views:dist', 'font:dist', 'img:dist', 'favicon:dist', 'media:dist']);
gulp.task('init',   [ 'watch', 'browser-sync'] );

