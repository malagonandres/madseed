var gulp            = require('gulp');                          //http://gulpjs.com/
var uglify          = require('gulp-uglify');                   //https://www.npmjs.com/package/gulp-uglify
var plumber         = require('gulp-plumber');                  //https://www.npmjs.com/package/gulp-plumber
var csswring        = require('csswring');                      //https://github.com/ben-eb/cssnano
var postcss         = require('gulp-postcss');                  //https://github.com/postcss/postcss
var stylus          = require('gulp-stylus');                   //http://stylus-lang.com/
var autoprefixer    = require('autoprefixer');                  //https://github.com/postcss/autoprefixer
var lost            = require('lost');                          //https://github.com/peterramsing/lost
var nib             = require('nib');                           //http://tj.github.io/nib/
var rupture         = require('rupture');                       //https://github.com/jenius/rupture
var browserSync     = require('browser-sync').create();         //https://www.browsersync.io
var typescript      = require('gulp-typescript');               //http://www.typescriptlang.org/
var sourcemaps      = require('gulp-sourcemaps');
var fallback        = require('connect-history-api-fallback');  //https://github.com/bripkens/connect-history-api-fallback


//**********************************************//
//  INIT VARIABLE
//**********************************************//

//  INIT DIRECTORIES
var source = 'src/';
var develop = 'dev/';

//  INIT POSTCSS PROCESSORS
var processors = [
    lost,
    autoprefixer
];

//  INIT STYLUS OPTIONS
var stylus_options = {
    use : [
        nib(),
        rupture()
    ]
};

//  INIT TSCONFIG
var tsProject = typescript.createProject(source + 'tsconfig.json');

//**********************************************//
//  STYLE TASK
//**********************************************//

gulp.task('styles', function () {
    gulp.src(source + 'styles/style.styl')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(stylus(stylus_options))
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('.', { sourceRoot: develop + 'css' }))
        .pipe(gulp.dest(develop + 'css'))
        .pipe(browserSync.stream());
});

//**********************************************//
//  SCRIPT TASK
//**********************************************//

gulp.task('scripts', function () {
    return gulp.src(source + 'app/**/*.ts')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(typescript(tsProject))
        .pipe(sourcemaps.write('.', { sourceRoot: develop + 'js' }))
        .pipe(gulp.dest(develop + 'js'))
        .pipe(browserSync.stream());
});

gulp.task('scripts-node', function () {
    return gulp.src(source + 'node_modules/**/*.js')
        .pipe(gulp.dest(develop + 'node_modules'));
});

gulp.task('scripts-config', function () {
    return gulp.src(source + 'systemjs.config.js')
        .pipe(gulp.dest(develop))
});
//**********************************************//
//  HTML TASK
//**********************************************//

gulp.task('build-html', function () {
    return gulp.src(source + 'index.html')
        .pipe(gulp.dest(develop));
});
gulp.task('build-html-views', function () {
    return gulp.src(source + 'views/**/*.html')
        .pipe(gulp.dest(develop + 'views'));
});

//**********************************************//
//  FONTS TASK
//**********************************************//

gulp.task('build-fonts',function(){
    return gulp.src(source + 'fonts/**/*.ttf')
        .pipe(gulp.dest(develop + 'fonts'));
});

//**********************************************//
//  IMAGES TASK
//**********************************************//

gulp.task('build-img',function(){
    return gulp.src(source + 'img/**/')
        .pipe(gulp.dest(develop + 'img'));
});

//**********************************************//
//  SOUNDS TASK
//**********************************************//

gulp.task('build-sounds',function(){
    return gulp.src(source + 'sounds/**/')
        .pipe(gulp.dest(develop + 'sounds'));
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
//  WATCH
//**********************************************//

gulp.task('watch', function () {
    gulp.watch(source + 'app/**/*.ts',      ['scripts']);
    gulp.watch(source + 'styles/**/*.styl', ['styles']);
    gulp.watch(source + 'index.html',       ['build-html']);
    gulp.watch(source + 'views/**/*.html',  ['build-html-views']);
});

//**********************************************//
//  TASKS NAMES
//**********************************************//

gulp.task('init', ['build-html', 'build-html-views', 'build-fonts', 'build-img', 'build-sounds', 'scripts-node', 'scripts', 'scripts-config', 'styles']);
gulp.task('default', [ 'watch', 'browser-sync']);
